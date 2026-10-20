'use client';

import React, { useEffect, useState } from "react";
import { checkHealth, HealthResponse } from "../lib/api/health";

export default function BackendStatus() {
  const [status, setStatus] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkHealth()
      .then(setStatus)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div style={{ marginTop: "1rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h3>Backend Connection</h3>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {status ? (
        <p style={{ color: "green" }}>
          Status: {status.status} ({status.service})
        </p>
      ) : (
        !error && <p>Checking backend health...</p>
      )}
    </div>
  );
}
