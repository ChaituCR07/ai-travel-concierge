# Durable Agent Rules

Rules and guidance for memory-less agent runs in this repository.

1. **Architecture Boundaries**: Keep backend and frontend decoupled.
2. **Type Safety & Schemas**: Always keep API schemas in sync between backend and frontend.
3. **Tests**: All endpoints must have pytest coverage; frontend client methods should have Vitest tests.
4. **Reproducibility**: Update dependencies in requirements/package files whenever adding imports.
