import { describe, it, expect, vi, beforeEach } from "vitest";
import { apiClient } from "./client";

describe("apiClient", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches data successfully with JSON headers", async () => {
    const mockData = { message: "ok" };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    const result = await apiClient<{ message: string }>("/test");
    expect(result).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/test"),
      expect.objectContaining({
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
      })
    );
  });

  it("throws an error when response is not ok", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    } as Response);

    await expect(apiClient("/error")).rejects.toThrow("API call failed: 500 Internal Server Error");
  });
});
