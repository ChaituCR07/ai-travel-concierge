from pydantic import BaseModel
from typing import Optional

class ErrorResponse(BaseModel):
    error: str
    code: str
    details: Optional[str] = None
