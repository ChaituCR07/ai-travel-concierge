# 🚀 AI Travel Concierge - Backend Service

The backend service for **AI Travel Concierge** is an asynchronous, high-performance REST API built with **FastAPI**, **SQLAlchemy 2.0**, and **Pydantic v2**. It handles core travel concierge logic, database persistence, session management, and external service integrations.

> [!NOTE]
> **Phase 1 Baseline Status**:
> Currently implements the foundational micro-architecture: application factory (`create_app`), CORS middleware, structured logging, system routes (`/api/v1/health` and `/api/v1/version`), centralized `AppException` error handling, and baseline Alembic migration (`0001_baseline.py`). Domain-specific travel AI orchestration and external booking provider services are planned for future phases.

---

## 🏗️ Architecture & Folder Structure

```text
backend/
├── app/
│   ├── main.py              # Application factory create_app(), CORS & exception handlers
│   ├── version.py           # Single source of truth for backend version
│   ├── core/
│   │   ├── config.py        # Pydantic SettingsConfigDict reading environment variables
│   │   ├── errors.py        # Centralized AppException and error definitions
│   │   └── logging.py       # Structured logging configuration
│   ├── api/routes/
│   │   ├── health.py        # GET /api/v1/health status endpoint
│   │   └── version.py       # GET /api/v1/version versioning endpoint
│   ├── schemas/
│   │   ├── health.py        # Pydantic models for HealthResponse
│   │   ├── version.py       # Pydantic models for VersionResponse
│   │   └── errors.py        # Pydantic models for ErrorResponse
│   └── db/
│       ├── base.py          # SQLAlchemy DeclarativeBase
│       └── session.py       # Engine initialization and get_db() session provider
├── alembic/                 # Alembic database migration environment and version files
├── alembic.ini              # Alembic configuration
├── tests/                   # Pytest automated test suites
├── Dockerfile               # Production container image configuration
├── requirements.txt         # Production dependencies
├── requirements-dev.txt     # Development and testing tools
└── pyproject.toml           # Project metadata and test tool configs
```

---

## ⚙️ Environment Configuration

Create a `.env` file in `backend/` or copy from `.env.example`:

```bash
cp .env.example .env
```

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `ENVIRONMENT` | `development` | Deployment environment (`development`, `staging`, `production`) |
| `DATABASE_URL` | `postgresql://postgres:postgres@localhost:5432/ai_travel_concierge` | PostgreSQL connection string |

---

## 🛠️ Local Development Setup

### 1. Create and Activate Virtual Environment
```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt -r requirements-dev.txt
```

### 3. Run the Development Server
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

- **Interactive API Docs (Swagger UI)**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **Alternative Docs (ReDoc)**: [http://localhost:8000/redoc](http://localhost:8000/redoc)
- **OpenAPI Schema**: [http://localhost:8000/api/v1/openapi.json](http://localhost:8000/api/v1/openapi.json)

---

## 🗄️ Database Migrations (Alembic)

Database schema migrations are managed via Alembic:

- Apply all pending migrations:
  ```bash
  alembic upgrade head
  ```
- Generate a new migration revision:
  ```bash
  alembic revision --autogenerate -m "describe_changes"
  ```
- Roll back previous migration:
  ```bash
  alembic downgrade -1
  ```

---

## 🧪 Running Tests & Quality Checks

### Pytest
Run the test suite:
```bash
pytest
```

Run with coverage:
```bash
pytest --cov=app tests/
```

### Formatting & Linting
```bash
black app tests
isort app tests
flake8 app tests
mypy app
```

---

## 🐳 Docker Deployment

Build and run using Docker:
```bash
docker build -t ai-travel-concierge-backend .
docker run -p 8000:8000 --env-file .env ai-travel-concierge-backend
```
