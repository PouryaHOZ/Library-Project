from typing import Optional
from pydantic import BaseModel


class LoginRequest(BaseModel):
    username: str
    password: str

class FetchRequest(BaseModel):
    username: Optional[str] = None
    type: str
    req: Optional[str] = None
    book_id: Optional[int] = None
    loan_id: Optional[int] = None
    data: Optional[str] = None