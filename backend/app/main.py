from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from app.api.routes import health, version
from app.core.config import settings
from app.core.errors import AppException
from app.core.logging import setup_logging
from app.schemas.errors import ErrorResponse

from fastapi.middleware.cors import CORSMiddleware

def create_app() -> FastAPI:
    setup_logging()
    app = FastAPI(
        title=settings.PROJECT_NAME,
        version=settings.VERSION,
        openapi_url="/api/v1/openapi.json"
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.exception_handler(AppException)
    async def app_exception_handler(request: Request, exc: AppException):
        return JSONResponse(
            status_code=exc.status_code,
            content=ErrorResponse(
                error=exc.detail,
                code=exc.code
            ).model_dump()
        )

    app.include_router(health.router, prefix="/api/v1", tags=["health"])
    app.include_router(version.router, prefix="/api/v1", tags=["version"])
    return app

app = create_app()
