# 🧪 Testing Strategy & Execution Guide

Testing is a core quality gate in the **AI Travel Concierge** project. As mandated in [AGENTS.md](../AGENTS.md), all API endpoints must have pytest coverage, and all frontend client methods must have Vitest tests.

---

## 1. Testing Pyramid Overview

```text
               / \
              /   \
             / E2E \       Cross-service smoke test (scripts/smoke_test.py)
            /-------\
           /  Integ  \     API Route integration tests (backend/tests)
          /-----------\
         /    Unit     \   Client & Service unit tests (vitest & pytest)
        /---------------\
```

---

## 2. Backend Testing (Pytest)

### 2.1. Structure & Conventions
All backend tests reside in `backend/tests/`:
- `test_health.py`: Validates `/api/v1/health` status and response payload.
- `test_version.py`: Validates `/api/v1/version` matches `APP_VERSION`.
- `test_errors.py`: Tests the exception handlers and structured `ErrorResponse`.

### 2.2. Running Backend Tests
From the `backend/` directory with your virtual environment activated:
```bash
# Run all tests
pytest

# Run tests with verbose output
pytest -v

# Run with test coverage report
pytest --cov=app tests/
```

### 2.3. Mocking External Services
External dependencies (databases, external LLM APIs, third-party flight/hotel APIs) must be mocked in unit and route tests to ensure deterministic and fast execution.

---

## 3. Frontend Testing (Vitest)

### 3.1. Structure & Conventions
Frontend tests are located alongside the modules they test:
- `frontend/src/lib/api/client.test.ts`: Verifies JSON headers, response parsing, and error status code handling.
- `frontend/src/lib/api/health.test.ts`: Tests the typed `checkHealth()` function.

### 3.2. Running Frontend Tests
From the `frontend/` directory:
```bash
# Run all vitest tests
npm test

# Run tests with watch mode during development
npx vitest

# Run with UI or coverage
npx vitest --coverage
```

---

## 4. Cross-Service Smoke Test

To verify end-to-end integration without installing third-party tools, a standard-library-only Python smoke script is provided:

```bash
# Start backend on localhost:8000
python3 scripts/smoke_test.py
```

### Exit Codes:
- `0`: Backend health check succeeded.
- `1`: Service unavailable, network failure, or invalid response payload.

---

## 5. Continuous Integration (CI)

Every commit and pull request triggers `.github/workflows/ci.yml`, executing three parallel jobs:
1. **`backend`**: Installs dependencies and runs `pytest`.
2. **`frontend`**: Installs npm dependencies and runs `vitest`.
3. **`repo-hygiene`**: Validates file formatting, editor settings, and repository constraints.
