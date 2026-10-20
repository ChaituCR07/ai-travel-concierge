from fastapi.testclient import TestClient
from app.main import app
from app.version import APP_VERSION

client = TestClient(app)

def test_version_check():
    response = client.get("/api/v1/version")
    assert response.status_code == 200
    data = response.json()
    assert data["version"] == APP_VERSION
