import BackendStatus from "@/components/BackendStatus";

export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>AI Travel Concierge</h1>
      <p>Welcome to your intelligent travel planner.</p>
      <BackendStatus />
    </main>
  );
}
