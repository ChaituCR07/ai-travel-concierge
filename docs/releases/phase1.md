# Release: Phase 1 Baseline (Day 1)

**Release Version**: `0.1.0`  
**Date**: 2026-10-21  
**Repository**: [ChaituCR07/ai-travel-concierge](https://github.com/ChaituCR07/ai-travel-concierge)

---

## Highlights
- **Fullstack Scaffolding**: Initialized complete, cleanly separated repository structure.
- **FastAPI Core Service**:
  - `create_app()` factory with environment-driven settings, structured logging, and CORS middleware.
  - `/api/v1/health` endpoint returning system status.
  - `/api/v1/version` endpoint returning application version.
  - Centralized `AppException` error handling returning uniform `ErrorResponse` payloads.
  - SQLAlchemy database session management and empty Alembic baseline migration (`0001_baseline.py`).
- **Next.js Frontend Client**:
  - Modular API client (`apiClient`) with typed promises and error handling.
  - `BackendStatus` interactive component.
  - Unit test specifications using Vitest for API client functions.
- **Developer Experience & CI/CD**:
  - Docker Compose configuration for local PostgreSQL service.
  - Automated smoke check script (`scripts/smoke_test.py`) using Python standard library only.
  - GitHub Actions CI workflow pipeline (`ci.yml`) covering backend, frontend, and repository hygiene.
  - Comprehensive documentation covering architecture, environment, testing, local development, and deployments.
