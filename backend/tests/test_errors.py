from fastapi.testclient import TestClient
from fastapi import APIRouter
from app.main import app
from app.core.errors import AppException

test_router = APIRouter()

@test_router.get("/test-error")
def trigger_error():
    raise AppException(status_code=400, detail="Invalid test input", code="INVALID_INPUT")

app.include_router(test_router)
client = TestClient(app)

def test_app_exception_handling():
    response = client.get("/test-error")
    assert response.status_code == 400
    data = response.json()
    assert data["error"] == "Invalid test input"
    assert data["code"] == "INVALID_INPUT"
