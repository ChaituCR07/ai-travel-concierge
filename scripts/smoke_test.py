#!/usr/bin/env python3
"""Cross-service smoke test using standard library only."""
import sys
import urllib.request
import json

BACKEND_URL = "http://localhost:8000/api/v1/health"

def run_smoke_test():
    print(f"Checking backend health at {BACKEND_URL}...")
    try:
        with urllib.request.urlopen(BACKEND_URL, timeout=5) as response:
            if response.status != 200:
                print(f"FAILED: Backend returned status {response.status}")
                return 1
            body = response.read().decode("utf-8")
            data = json.loads(body)
            if data.get("status") == "healthy":
                print("SUCCESS: Backend is healthy!")
                return 0
            else:
                print(f"FAILED: Unexpected response payload: {data}")
                return 1
    except Exception as e:
        print(f"ERROR: Could not connect to backend: {e}")
        return 1

if __name__ == "__main__":
    sys.exit(run_smoke_test())
