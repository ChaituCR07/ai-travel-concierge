# 💻 AI Travel Concierge - Frontend Application

The frontend application for **AI Travel Concierge** is built with **Next.js 14 (App Router)**, **React 18**, and **TypeScript**. It provides a reactive, responsive user interface for interactive travel planning, itinerary management, and real-time backend communication.

---

## 🏗️ Architecture & Folder Structure

```text
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with meta tags and global structure
│   │   └── page.tsx           # Primary application view
│   ├── components/
│   │   └── BackendStatus.tsx  # React client component displaying live backend connectivity
│   └── lib/
│       ├── config.ts          # Frontend environment variables & API baseUrl
│       └── api/
│           ├── client.ts      # Fetch wrapper with typed response and error propagation
│           ├── client.test.ts # Vitest tests for apiClient
│           ├── health.ts      # Health endpoint API consumer
│           └── health.test.ts # Vitest tests for health check service
├── vitest.config.ts           # Vitest configuration (jsdom environment, path aliases)
├── package.json               # Dependencies and scripts
├── Dockerfile                 # Frontend containerization
└── .env.example               # Frontend environment template
```

---

## ⚙️ Environment Configuration

Create a `.env.local` or `.env` file in `frontend/`:

```bash
cp .env.example .env.local
```

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000/api/v1` | Base URL pointing to the FastAPI backend |

---

## 🛠️ Local Development Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 🧪 Testing with Vitest

The frontend uses **Vitest** with a `jsdom` environment and `@/` path alias mapping:

Run tests once:
```bash
npm test
```

Run tests in watch mode:
```bash
npx vitest
```

---

## 🔌 API Client Architecture

All backend communication flows through decoupled, strongly-typed client modules located in `src/lib/api/`:
- **`client.ts`**: Handles HTTP headers, JSON serialization, and normalized error throwing (`AppException`).
- **`health.ts`**: Type-safe method invoking `/health` returning `{ status: string, service: string }`.
- Every client method must have corresponding unit test coverage in `*.test.ts`.

---

## 🐳 Docker Deployment

Build and run using Docker:
```bash
docker build -t ai-travel-concierge-frontend .
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1 ai-travel-concierge-frontend
```
