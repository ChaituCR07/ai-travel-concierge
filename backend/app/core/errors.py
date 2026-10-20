from fastapi import HTTPException, Request
from fastapi.responses import JSONResponse

class AppException(HTTPException):
    def __init__(self, status_code: int, detail: str, code: str = "APP_ERROR"):
        super().__init__(status_code=status_code, detail=detail)
        self.code = code
