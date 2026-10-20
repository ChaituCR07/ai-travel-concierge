# 🏛️ System Architecture - AI Travel Concierge

## 1. Architectural Principles

The AI Travel Concierge follows core principles defined in the repository [AGENTS.md](../AGENTS.md):

1. **Decoupled Architecture**: The backend and frontend are strictly separated. The backend functions as an independent, headless REST API, while the frontend is an autonomous client application.
2. **Type Safety & Schema Synchronization**: All communication between backend and frontend adheres to shared, validated schemas (Pydantic models on the backend; TypeScript interfaces on the frontend).
3. **Defense in Depth Error Handling**: Errors generated across database, services, or routes are normalized into uniform `ErrorResponse` payloads.
4. **Reproducible Infrastructure**: Environments are declared through standardized configuration and container manifests.

---

## 2. High-Level System Architecture

```text
┌────────────────────────────────────────────────────────────────────────┐
│                              Web Client                                │
│                     (Browser / Mobile Web Browser)                     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                         HTTPS / JSON Requests
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        Next.js Frontend (3000)                         │
│  ┌───────────────────────┐                  ┌───────────────────────┐  │
│  │   App Router Views    │ ◄──────────────► │    BackendStatus      │  │
│  │ (layout.tsx, page.tsx)│                  │       Component       │  │
│  └───────────────────────┘                  └───────────┬───────────┘  │
│                                                         │              │
│                                              ┌──────────▼───────────┐  │
│                                              │      apiClient       │  │
│                                              │  (Typed HTTP Layer)  │  │
│                                              └──────────┬───────────┘  │
└─────────────────────────────────────────────────────────┼──────────────┘
                                                          │
                                               REST Calls (CORS Enabled)
                                                          │
                                                          ▼
┌────────────────────────────────────────────────────────────────────────┐
│                         FastAPI Backend (8000)                         │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │               Middleware: CORS, Logging, Exception               │  │
│  └──────────────────────────────┬───────────────────────────────────┘  │
│                                 ▼                                      │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                        API Router Layer                          │  │
│  │           /api/v1/health                  /api/v1/version        │  │
│  └──────────────────────────────┬───────────────────────────────────┘  │
│                                 ▼                                      │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                      Core Domain & Services                      │  │
│  │             Configuration, LLM Tools, Error Handlers             │  │
│  └──────────────────────────────┬───────────────────────────────────┘  │
│                                 ▼                                      │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                  Data Persistence (SQLAlchemy 2.0)               │  │
│  │                  Declarative Base & Session Pool                 │  │
│  └──────────────────────────────┬───────────────────────────────────┘  │
└─────────────────────────────────┼──────────────────────────────────────┘
                                  │
                       SQL Connection (TCP:5432)
                                  ▼
┌────────────────────────────────────────────────────────────────────────┐
│                       PostgreSQL Database (5432)                       │
│                        Managed via Alembic                             │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Subsystem Breakdown

### 3.1. Frontend (`frontend/`)
- **Framework**: Next.js 14 utilizing the App Router architecture.
- **Client Layer**: `src/lib/api/` contains modular API functions (`client.ts`, `health.ts`). The fetch abstraction attaches headers, processes responses, and enforces HTTP error validation.
- **Components**: UI blocks (such as `BackendStatus.tsx`) are reactive client components that display system connection status and user-facing features.
- **Testing**: Vitest provides component and utility unit testing with mocking capabilities for `fetch`.

### 3.2. Backend (`backend/`)
- **Framework**: FastAPI application configured through an application factory pattern (`create_app()`).
- **Core Modules**:
  - `core/config.py`: Reads settings via `pydantic-settings` using `.env` fallback.
  - `core/logging.py`: Centralized stdout logging handler.
  - `core/errors.py`: Custom `AppException` translating business logic errors into standardized JSON responses.
- **Routing**: Modular routers organized in `app/api/routes/` and registered with the `/api/v1` prefix.
- **Data Access**: `app/db/` encapsulates connection engines and session generators (`get_db`).

### 3.3. Database Layer (`PostgreSQL & Alembic`)
- **Engine**: PostgreSQL 15.
- **ORM**: SQLAlchemy 2.0 declarative mappings.
- **Migrations**: Alembic tracks schema changes. `alembic/versions/0001_baseline.py` establishes the baseline migration.

---

## 4. Cross-Service Type Synchronization

Data contracts are enforced symmetrically across the language boundary:

| Contract | Backend Schema (Pydantic) | Frontend Model (TypeScript) |
| :--- | :--- | :--- |
| **Health** | `HealthResponse` (`status: str`, `service: str`) | `interface HealthResponse { status: string; service: string; }` |
| **Version** | `VersionResponse` (`version: str`) | `interface VersionResponse { version: string; }` |
| **Error** | `ErrorResponse` (`error: str`, `code: str`, `details: Optional[str]`) | `interface ErrorResponse { error: string; code: string; details?: string; }` |

---

## 5. Extensibility & Future AI Concierge Phases
- **Agent Orchestrator**: Will integrate into `backend/app/services/agents/` to coordinate user travel queries, itinerary generation, and tool invocation.
- **External Connectors**: Flight, hotel, and attractions APIs will be added as decoupled connectors under `backend/app/services/external/`.
