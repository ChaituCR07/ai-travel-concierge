from fastapi import APIRouter
from app.schemas.version import VersionResponse
from app.version import APP_VERSION

router = APIRouter()

@router.get("/version", response_model=VersionResponse)
def get_version():
    return VersionResponse(version=APP_VERSION)
