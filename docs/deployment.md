# 🚢 Production Deployment Guide

This guide covers deployment strategies, containerization standards, and operational considerations for the **AI Travel Concierge** platform.

---

## 1. Containerization Overview

Both frontend and backend include multi-stage `Dockerfile` specifications designed for minimal image footprints and high security.

### 1.1. Backend Container (`backend/Dockerfile`)
Built on `python:3.11-slim`:
- Installs dependencies without caching to keep images small.
- Copies the application code.
- Executes `uvicorn app.main:app --host 0.0.0.0 --port 8000`.

To build and test locally:
```bash
cd backend
docker build -t travel-concierge-backend:latest .
docker run -p 8000:8000 travel-concierge-backend:latest
```

### 1.2. Frontend Container (`frontend/Dockerfile`)
Built on `node:20-alpine`:
- Copies package manifests and installs dependencies.
- Serves the Next.js runtime on port 3000.

To build and test locally:
```bash
cd frontend
docker build -t travel-concierge-frontend:latest .
docker run -p 3000:3000 travel-concierge-frontend:latest
```

---

## 2. Cloud Deployment Architecture

```text
               ┌───────────────────────────────┐
               │    DNS & CDN (Cloudflare)     │
               └───────────────┬───────────────┘
                               │
                ┌──────────────┴──────────────┐
                ▼                             ▼
   ┌───────────────────────────┐ ┌───────────────────────────┐
   │ Next.js Frontend Service  │ │ FastAPI Backend Service   │
   │   (Vercel / Cloud Run)    │ │ (AWS ECS / Cloud Run)     │
   └───────────────────────────┘ └─────────────┬─────────────┘
                                               │
                                               ▼
                                 ┌───────────────────────────┐
                                 │ Managed PostgreSQL DB     │
                                 │ (AWS RDS / Cloud SQL)     │
                                 └───────────────────────────┘
```

---

## 3. Health Checks & Readiness Probes

Container orchestrators (such as Kubernetes or Docker Swarm) should configure the following probes:

- **Liveness Probe**: `GET /api/v1/health`
  - Period: 10s
  - Timeout: 3s
  - Failure threshold: 3
- **Readiness Probe**: `GET /api/v1/health`
  - Ensures the FastAPI application is fully initialized and receiving traffic.

---

## 4. Database Migrations in Production

Run Alembic migrations during continuous deployment pipelines prior to traffic switching:
```bash
# In CI/CD release stage
alembic upgrade head
```
Do not run migrations automatically inside auto-scaling container startup scripts to prevent concurrency deadlocks.

---

## 5. Rollback Strategy & Zero-Downtime Releases

1. **Blue/Green or Rolling Deployment**: Route production traffic to the new revision only after the `/api/v1/health` readiness probe passes consistently.
2. **Backward-Compatible Migrations**: Ensure database migrations are backward-compatible so that running containers of the previous version can continue processing requests during rollout.
3. **Rollback Action**: If new container revisions fail readiness checks, orchestrators automatically halt routing and keep the previous stable revision active without user disruption.
