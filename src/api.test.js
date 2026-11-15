
import { describe, it, expect } from "vitest";
import { fetchAPI, submitAPI } from "./api";

describe("Little Lemon API", () => {
  it("returns available booking times", () => {
    const date = new Date("2026-11-18T12:00:00");
    const times = fetchAPI(date);

    expect(Array.isArray(times)).toBe(true);
    expect(times.length).toBeGreaterThan(0);
  });

  it("returns consistent times for the same date", () => {
    const date = new Date("2026-11-18T12:00:00");

    expect(fetchAPI(date)).toEqual(fetchAPI(date));
  });

  it("successfully submits a booking", () => {
    const booking = {
      date: "2026-11-18",
      time: "19:30",
      guests: 4,
      occasion: "Birthday",
      name: "Test User",
      email: "test@example.com"
    };

    expect(submitAPI(booking)).toBe(true);
  });
});
