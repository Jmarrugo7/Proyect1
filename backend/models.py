from pydantic import BaseModel, EmailStr
from uuid import UUID
from datetime import datetime
from typing import Optional


# ── Requests ──────────────────────────────────────────────

class RegisterRequest(BaseModel):
    nombre: str
    email: EmailStr
    password: str

    model_config = {
        "json_schema_extra": {
            "example": {
                "nombre": "Juan Pérez",
                "email": "juan@email.com",
                "password": "contraseña_segura_123",
            }
        }
    }


class LoginRequest(BaseModel):
    email: EmailStr
    password: str

    model_config = {
        "json_schema_extra": {
            "example": {
                "email": "juan@email.com",
                "password": "contraseña_segura_123",
            }
        }
    }


# ── Responses ─────────────────────────────────────────────

class UsuarioPerfil(BaseModel):
    id: UUID
    nombre: str
    email: str
    created_at: Optional[datetime] = None


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    usuario: UsuarioPerfil


class MessageResponse(BaseModel):
    message: str