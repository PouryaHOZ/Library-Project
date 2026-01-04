from typing import Optional
from pydantic import BaseModel


class LoginRequest(BaseModel):
    username: str
    password: str

class FetchRequest(BaseModel):
    username: Optional[str] = None
    type: str
    req: Optional[str] = None
    book_id: Optional[str] = None
    loan_id: Optional[str] = None
    data: Optional[str] = None
    details: Optional[object] = None