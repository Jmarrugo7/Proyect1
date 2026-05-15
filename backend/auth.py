from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from database import supabase

bearer_scheme = HTTPBearer()
 
 
async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
) -> dict:
    """
    Valida el JWT de Supabase y retorna el usuario autenticado.
    Se usa como dependencia en endpoints protegidos.
    """
    token = credentials.credentials
    try:
        response = supabase.auth.get_user(token)
        if not response.user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token inválido o expirado",
            )
        return {"user": response.user, "token": token}
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No autenticado",
        )