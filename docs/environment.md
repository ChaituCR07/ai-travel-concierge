# 🌐 Environment & Configuration Guide

This document provides a comprehensive overview of environment variables, tiers, and configuration management for the **AI Travel Concierge** platform.

---

## 1. Environment Tiers

The application supports multiple deployment environments designated by the `ENVIRONMENT` variable:

| Environment | Purpose | Database | Logging Level |
| :--- | :--- | :--- | :--- |
| `development` | Local engineering workflows | Local PostgreSQL via Docker Compose | `DEBUG` / `INFO` |
| `test` | Automated CI test runners (Pytest / Vitest) | In-memory / Mocked / Test container | `WARN` / `ERROR` |
| `staging` | Pre-production validation and QA | Managed staging PostgreSQL | `INFO` |
| `production` | Live end-user traffic | Highly available managed PostgreSQL | `INFO` / `WARN` |

---

## 2. Environment Variables Matrix

### 2.1. Root & Infrastructure Variables
Used by `docker-compose.yml` to spin up local persistence services:

| Variable | Required | Default Value | Description |
| :--- | :--- | :--- | :--- |
| `POSTGRES_USER` | No | `postgres` | Username for PostgreSQL superuser |
| `POSTGRES_PASSWORD` | No | `postgres` | Password for PostgreSQL superuser |
| `POSTGRES_DB` | No | `ai_travel_concierge` | Database name to create automatically |
| `POSTGRES_PORT` | No | `5432` | Exposed host port for the database container |

### 2.2. Backend Variables (`backend/.env`)
Managed in Python via `pydantic-settings`:

| Variable | Required | Default Value | Description |
| :--- | :--- | :--- | :--- |
| `ENVIRONMENT` | No | `development` | Active environment tier |
| `PROJECT_NAME` | No | `AI Travel Concierge Backend` | Display name in OpenAPI docs |
| `VERSION` | No | `0.1.0` | Backend API version identifier |
| `DATABASE_URL` | Yes (in prod) | `postgresql://postgres:postgres@localhost:5432/ai_travel_concierge` | SQLAlchemy database connection URI |

### 2.3. Frontend Variables (`frontend/.env.local`)
Exposed to the Next.js runtime (prefixed with `NEXT_PUBLIC_` for browser visibility):

| Variable | Required | Default Value | Description |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | No | `http://localhost:8000/api/v1` | Publicly reachable base URL of the FastAPI backend |

---

## 3. Configuration Security Best Practices

1. **Never Commit Secrets**: All `.env`, `.env.local`, and sensitive configuration files are strictly ignored in `.gitignore`.
2. **Synchronize `.env.example`**: Whenever a new environment variable is introduced, update the respective `.env.example` in root, `backend/`, and `frontend/`.
3. **Production Secrets Injection**: In staging and production environments, inject variables using environment secrets (such as GitHub Secrets, AWS Secrets Manager, or Google Cloud Secret Manager) rather than hardcoded files.
