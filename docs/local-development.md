# Local Development Guide

## Prerequisites
- Python 3.11+
- Node.js 20+
- Docker & Docker Compose (optional for PostgreSQL)

## Starting the Database
```bash
docker compose up -d
```

## Running the Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt -r requirements-dev.txt
uvicorn app.main:app --reload --port 8000
```

## Running the Frontend
```bash
cd frontend
npm install
npm run dev
```
