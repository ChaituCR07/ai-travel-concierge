import { config } from "../config";

export async function apiClient<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${config.apiUrl}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
