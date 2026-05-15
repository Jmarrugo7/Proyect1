from fastapi import FastAPI,HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from models import RegisterRequest, LoginRequest, AuthResponse, UsuarioPerfil
from database import supabase, supabase_admin
from gotrue.errors import AuthApiError
from auth import get_current_user

app = FastAPI (
    title="Backend API",
    description="API for the backend of the application",
    version="1.0.0",
    )

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post(
    "/registro",
    response_model=AuthResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Registrar nuevo usuario",
)
async def registro(body: RegisterRequest):
    """
    Crea un usuario en **auth.users** y su perfil en **public.usuarios**.
    El trigger de Supabase inserta automáticamente el nombre en la tabla de perfiles.
    """
    try:
        response = supabase.auth.sign_up(
            {
                "email": body.email,
                "password": body.password,
                "options": {
                    "data": {"nombre": body.nombre}
                },
            }
        )
    except AuthApiError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )
 
    if not response.user or not response.session:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No se pudo completar el registro. Verifica el email.",
        )
 
    return AuthResponse(
        access_token=response.session.access_token,
        usuario=UsuarioPerfil(
            id=response.user.id,
            nombre=body.nombre,
            email=response.user.email,
            created_at=response.user.created_at,
        ),
    )
 
 
# ── POST /auth/login ───────────────────────────────────────
 
@app.post(
    "/login",
    response_model=AuthResponse,
    summary="Iniciar sesión",
)
async def login(body: LoginRequest):
    """
    Autentica al usuario y retorna un **JWT** de Supabase.
    Usa el `access_token` en el header `Authorization: Bearer <token>` para endpoints protegidos.
    """
    try:
        response = supabase.auth.sign_in_with_password(
            {"email": body.email, "password": body.password}
        )
    except AuthApiError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales incorrectas",
        )
 
    if not response.user or not response.session:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales incorrectas",
        )
 
    # Obtener nombre desde el perfil en public.usuarios
    perfil = (
        supabase_admin
        .table("usuarios")
        .select("nombre, created_at")
        .eq("id", str(response.user.id))
        .single()
        .execute()
    )
 
    nombre = perfil.data.get("nombre", "") if perfil.data else ""
    created_at = perfil.data.get("created_at") if perfil.data else None
 
    return AuthResponse(
        access_token=response.session.access_token,
        usuario=UsuarioPerfil(
            id=response.user.id,
            nombre=nombre,
            email=response.user.email,
            created_at=created_at,
        ),
    )
 
 
# ── GET /auth/perfil ───────────────────────────────────────
 
@app.get(
    "/perfil",
    response_model=UsuarioPerfil,
    summary="Obtener perfil del usuario autenticado",
)
async def get_perfil(current: dict = Depends(get_current_user)):
    """
    Retorna el perfil del usuario autenticado.
    Requiere header: `Authorization: Bearer <access_token>`
    """
    user = current["user"]
 
    perfil = (
        supabase_admin
        .table("usuarios")
        .select("nombre, created_at")
        .eq("id", str(user.id))
        .single()
        .execute()
    )
 
    if not perfil.data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Perfil no encontrado",
        )
 
    return UsuarioPerfil(
        id=user.id,
        nombre=perfil.data["nombre"],
        email=user.email,
        created_at=perfil.data.get("created_at"),
    )