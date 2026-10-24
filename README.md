# 🌍 AI Travel Concierge

[![CI Pipeline](https://github.com/ChaituCR07/ai-travel-concierge/actions/workflows/ci.yml/badge.svg)](https://github.com/ChaituCR07/ai-travel-concierge/actions)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688.svg?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js%2014-black.svg?logo=next.js&logoColor=white)](https://nextjs.org)
[![Python](https://img.shields.io/badge/Python-3.11%2B-blue.svg?logo=python&logoColor=white)](https://python.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org)

An intelligent travel concierge and planning platform designed to deliver personalized travel experiences.

> [!IMPORTANT]
> **Phase 1 Project Status — Foundation & Baseline Architecture**:
> The project is currently in **Phase 1 (Baseline Foundation)**. The repository establishes the decoupled micro-architecture, type-safe API client contracts, automated testing suites, database baseline migrations, and CI workflows.
> **AI travel planning, autonomous itinerary generation, live travel provider APIs (flights, hotels), and booking integrations are scheduled for subsequent phases and are not yet implemented.**

---

## 📌 Table of Contents
- [Overview](#-overview)
- [Phase 1 Implementation Status](#-phase-1-implementation-status)
- [Technology Stack](#-technology-stack)
- [Project Architecture](#-project-architecture)
- [Repository Structure](#-repository-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Database Service](#1-database-service)
  - [2. Backend Setup](#2-backend-setup)
  - [3. Frontend Setup](#3-frontend-setup)
  - [4. Cross-Service Smoke Test](#4-cross-service-smoke-test)
- [Testing & Quality Assurance](#-testing--quality-assurance)
- [Architectural Rules & Principles](#-architectural-rules--principles)
- [Documentation](#-documentation)

---

## 🧭 Overview

**AI Travel Concierge** will combine autonomous LLM capabilities with deterministic travel domain services to help travelers seamlessly plan, budget, and experience their trips.

The platform architecture is designed from the ground up to be headless, modular, and type-safe, separating application interfaces from core business orchestration.

---

## 📊 Phase 1 Implementation Status

| Capability Area | Status | Implemented Components |
| :--- | :--- | :--- |
| **Backend Core** | ✅ **Implemented** | FastAPI `create_app()` factory, CORS middleware, structured logging, centralized `AppException` handling |
| **System Endpoints** | ✅ **Implemented** | `GET /api/v1/health` and `GET /api/v1/version` with typed Pydantic responses |
| **Data Layer** | ✅ **Implemented** | SQLAlchemy 2.0 session factory and Alembic baseline migration (`0001_baseline.py`) |
| **Frontend Shell** | ✅ **Implemented** | Next.js 14 App Router layout, page view, and reactive `BackendStatus` component |
| **API Client** | ✅ **Implemented** | Decoupled TypeScript `apiClient` with typed schema contracts and error handling |
| **Automated Testing** | ✅ **Implemented** | Pytest suites for backend endpoints and Vitest test specs for frontend API client |
| **Smoke Check & CI** | ✅ **Implemented** | Stdlib-only `scripts/smoke_test.py` and multi-job GitHub Actions workflow (`ci.yml`) |
| **AI Itinerary Engine** | ⏳ *Planned* | LLM travel orchestration, user preference profiles, day-by-day planner (Phase 2+) |
| **Provider Connectors** | ⏳ *Planned* | Live flight, hotel, and attractions API integrations (Phase 2+) |
| **User Authentication** | ⏳ *Planned* | Multi-tenant user auth, JWT sessions, and saved trips (Phase 2+) |

---

## 🛠️ Technology Stack

| Layer | Technology | Verified Version | Description |
| :--- | :--- | :--- | :--- |
| **Backend** | Python, FastAPI | Python 3.11+, FastAPI 0.110+ | Async REST API framework with automatic OpenAPI docs |
| **ORM & Migrations** | SQLAlchemy, Alembic | SQLAlchemy 2.0+, Alembic 1.13+ | Relational modeling & schema migrations |
| **Data Validation** | Pydantic v2 | Pydantic 2.6+, Settings 2.2+ | Strict data serialization and type enforcement |
| **Frontend** | Next.js, React | Next.js 14.1, React 18.2 | Modern React framework with server & client components |
| **Client Language** | TypeScript | TypeScript 5.3+ | Strict static typing for frontend reliability |
| **Testing** | Pytest, Vitest | Pytest 8.0+, Vitest 1.3+ | Automated unit and integration testing |
| **Containerization** | Docker, Compose | Docker Compose v2+ | Reproducible container configuration for PostgreSQL |
| **CI / CD** | GitHub Actions | Ubuntu Latest | Continuous verification on every push and pull request |

---

## 🏛️ Project Architecture

```text
                      +-----------------------------+
                      |     Browser / Client        |
                      +--------------+--------------+
                                     |
                                     |  HTTP / REST (JSON)
                                     v
                      +-----------------------------+
                      |     Next.js Frontend        |
                      |   (Port 3000 / App Router)  |
                      +--------------+--------------+
                                     |
                                     |  /api/v1 (CORS Enabled)
                                     v
                      +-----------------------------+
                      |      FastAPI Backend        |
                      |   (Port 8000 / Core App)    |
                      +--------------+--------------+
                                     |
                                     |  SQLAlchemy 2.0
                                     v
                      +-----------------------------+
                      |     PostgreSQL Database     |
                      |        (Port 5432)          |
                      +-----------------------------+
```

---

## 📂 Repository Structure

```text
ai-travel-concierge/
├── .github/
│   └── workflows/
│       └── ci.yml                     # Multi-job CI: backend, frontend, repo-hygiene
├── AGENTS.md                          # Durable rules for memory-less agent runs
├── CONTRIBUTING.md                    # Guidelines for contributing to the codebase
├── README.md                          # Project documentation and developer guide
├── CHANGELOG.md                       # Release and modification history
├── .editorconfig                      # Universal code formatting rules
├── .gitignore                         # Project-wide ignore definitions
├── .gitattributes                     # Line-ending and attribute configurations
├── .env.example                       # Root environment variable template
├── docker-compose.yml                 # PostgreSQL container service definition
├── backend/
│   ├── app/
│   │   ├── main.py                    # create_app() factory with CORS and middleware
│   │   ├── version.py                 # Application version declaration
│   │   ├── core/                      # Config, errors, and logging utilities
│   │   ├── api/routes/                # Modular API route controllers (health, version)
│   │   ├── schemas/                   # Pydantic schemas (health, version, errors)
│   │   └── db/                        # Database session & declarative base models
│   ├── alembic/                       # Migration environment and version scripts
│   ├── tests/                         # Pytest test suites (unit & integration)
│   ├── pyproject.toml                 # Backend build and test configurations
│   ├── requirements.txt               # Production Python dependencies
│   ├── requirements-dev.txt           # Development and testing dependencies
│   ├── Dockerfile                     # Backend container build specification
│   └── README.md                      # Backend service documentation
├── frontend/
│   ├── src/
│   │   ├── app/                       # Next.js App Router (layout, page)
│   │   ├── components/                # Reusable UI elements (BackendStatus)
│   │   └── lib/                       # API clients, configurations, and utilities
│   ├── vitest.config.ts               # Vitest configuration for frontend tests
│   ├── package.json                   # Frontend dependencies and npm scripts
│   ├── Dockerfile                     # Frontend container build specification
│   └── README.md                      # Frontend application documentation
├── scripts/
│   └── smoke_test.py                  # Standard-library-only cross-service smoke check
└── docs/                              # System documentation & architectural records
    ├── architecture.md                # System design overview
    ├── environment.md                 # Environment configuration guide
    ├── testing.md                     # Testing methodology and guidelines
    ├── local-development.md           # Local setup instructions
    ├── deployment.md                  # Deployment guides
    ├── decisions/                     # Architecture Decision Records (ADRs)
    │   └── 0001-phase1-stack.md
    ├── qa/                            # Quality assurance reports
    │   └── phase1-qa-report.md
    └── releases/                      # Version release notes
        └── phase1.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Python**: `>= 3.11`
- **Node.js**: `>= 20.0.0`
- **Docker & Docker Compose** (for PostgreSQL)

### 1. Database Service
Start the PostgreSQL container:
```bash
docker compose up -d
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt -r requirements-dev.txt
   ```
4. Start the development server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
   Interactive Swagger API docs will be available at [http://localhost:8000/docs](http://localhost:8000/docs).

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the client application.

### 4. Cross-Service Smoke Test
Verify cross-service communication using the stdlib-only smoke script:
```bash
python3 scripts/smoke_test.py
```

---

## 🧪 Testing & Quality Assurance

### Backend Tests
Execute pytest across all endpoint and unit tests:
```bash
cd backend
pytest
```

### Frontend Tests
Execute Vitest test runner:
```bash
cd frontend
npm test
```

---

## 📜 Architectural Rules & Principles

As defined in [`AGENTS.md`](AGENTS.md):
1. **Architecture Boundaries**: Keep backend and frontend decoupled.
2. **Type Safety & Schemas**: Always keep API schemas in sync between backend and frontend.
3. **Tests**: All endpoints must have pytest coverage; frontend client methods must have Vitest tests.
4. **Reproducibility**: Update dependencies in requirements/package files whenever adding imports.

---

## 📚 Documentation
- [Architecture Overview of the project](docs/architecture.md)
- [Environment Configuration](docs/environment.md)
- [Local Development Guide](docs/local-development.md)
- [Testing Strategy](docs/testing.md)
- [ADR 0001: Phase 1 Stack Selection](docs/decisions/0001-phase1-stack.md)
- [Phase 1 QA Report](docs/qa/phase1-qa-report.md)
- [Phase 1 Release Notes](docs/releases/phase1.md)
