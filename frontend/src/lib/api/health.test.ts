import { describe, it, expect, vi, beforeEach } from "vitest";
import { checkHealth } from "./health";
import * as clientModule from "./client";

describe("checkHealth", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("calls /health and returns backend status", async () => {
    const mockHealthResponse = { status: "healthy", service: "backend" };
    const apiClientSpy = vi
      .spyOn(clientModule, "apiClient")
      .mockResolvedValue(mockHealthResponse);

    const result = await checkHealth();
    expect(result).toEqual(mockHealthResponse);
    expect(apiClientSpy).toHaveBeenCalledWith("/health");
  });
});
