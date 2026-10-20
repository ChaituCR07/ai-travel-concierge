# 💻 Local Development Workflow Guide

This guide walks you through setting up a complete local development environment for **AI Travel Concierge** from scratch.

---

## 1. Prerequisites

Make sure the following runtimes are installed on your workstation:
- **Python**: version `3.11` or higher
- **Node.js**: version `20.x` or higher (`npm` included)
- **Docker & Docker Compose**: latest desktop or engine release

---

## 2. Quick Setup Checklist

### Step 1: Clone Repository
```bash
git clone https://github.com/ChaituCR07/ai-travel-concierge.git
cd ai-travel-concierge
```

### Step 2: Spin Up the Database
Start the PostgreSQL container service in the background:
```bash
docker compose up -d
```
Verify the container is healthy:
```bash
docker compose ps
```

### Step 3: Configure and Launch the Backend
1. Open a new terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Create and activate a Python virtual environment:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```
3. Install production and development dependencies:
   ```bash
   pip install -r requirements.txt -r requirements-dev.txt
   ```
4. Copy the environment configuration:
   ```bash
   cp .env.example .env
   ```
5. Apply database baseline migrations:
   ```bash
   alembic upgrade head
   ```
6. Start the FastAPI development server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
   Backend will be running at [http://localhost:8000](http://localhost:8000) (Swagger Docs: [http://localhost:8000/docs](http://localhost:8000/docs)).

### Step 4: Configure and Launch the Frontend
1. Open a second terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Copy the environment configuration:
   ```bash
   cp .env.example .env.local
   ```
4. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser. The page should load and display the green `Status: healthy (backend)` indicator.

### Step 5: Run the Smoke Test
In a third terminal from the repository root:
```bash
python3 scripts/smoke_test.py
```

---

## 3. Common Troubleshooting

| Issue | Cause | Solution |
| :--- | :--- | :--- |
| **Port 5432 in use** | A local PostgreSQL instance is already running | Modify `POSTGRES_PORT` in `.env` and `DATABASE_URL` in `backend/.env`. |
| **CORS Error in Browser** | Backend is not accepting requests from origin | Ensure `app.add_middleware(CORSMiddleware, ...)` is enabled in `backend/app/main.py`. |
| **ModuleNotFoundError in Backend** | Virtual environment is not activated | Run `source .venv/bin/activate` before executing uvicorn or pytest. |
| **API Call Failed (Connection Refused)** | Backend server is not running | Verify backend is running on `http://localhost:8000`. |
