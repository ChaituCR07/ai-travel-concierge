# 🤝 Contributing to AI Travel Concierge

Thank you for your interest in contributing to the **AI Travel Concierge**! We welcome contributions to improve our application, architecture, and developer experience.

---

## 📋 Code of Conduct & Core Rules

Before contributing, review the repository guidelines in [AGENTS.md](AGENTS.md):
1. **Decoupled Architecture**: Keep backend and frontend strictly independent.
2. **Type Safety & Schemas**: Keep API schemas synchronized between backend (Pydantic) and frontend (TypeScript).
3. **Mandatory Tests**: All endpoints must have pytest coverage; frontend client methods must have Vitest tests.
4. **Reproducibility**: Always pin dependencies and update requirements/package manifests when introducing new packages.

---

## 🛠️ Development Setup

Detailed instructions for local environment setup, virtual environments, and container configurations are available in [docs/local-development.md](docs/local-development.md).

---

## 🌿 Git Branching Strategy

- **`main`**: Production-ready, stable codebase.
- **`feature/<feature-name>`**: New features, routes, or components.
- **`fix/<bug-name>`**: Bug fixes and patches.
- **`docs/<topic>`**: Documentation updates.

---

## ✍️ Commit Conventions

We enforce [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` A new feature (e.g., `feat(backend): add trip recommendation endpoint`)
- `fix:` A bug fix (e.g., `fix(client): handle 404 responses gracefully`)
- `docs:` Documentation changes (e.g., `docs: update architecture overview`)
- `test:` Adding or updating tests (e.g., `test(backend): add test for error handler`)
- `refactor:` Code change that neither fixes a bug nor adds a feature
- `chore:` Tooling, dependency, or configuration updates

---

## ✅ Pull Request Checklist

Before submitting a PR, ensure:
1. `pytest` passes cleanly in `backend/`.
2. `npm test` passes cleanly in `frontend/`.
3. Code adheres to formatting rules (Run `black`, `isort`, `flake8` for Python; `prettier` / `eslint` for TypeScript).
4. Any new endpoints or client methods have accompanying test cases.
5. All documentation and schema definitions have been kept in sync.
