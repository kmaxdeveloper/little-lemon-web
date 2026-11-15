import { describe, it, expect } from "vitest";
import { fetchAPI, submitAPI } from "./api";

describe("Little Lemon API", () => {
  it("returns available booking times as an array", () => {
    const date = new Date("2026-11-18T12:00:00");
    const times = fetchAPI(date);

    expect(Array.isArray(times)).toBe(true);
    expect(times.length).toBeGreaterThan(0);
  });

  it("returns time strings in HH:MM format", () => {
    const date = new Date("2026-11-18T12:00:00");
    const times = fetchAPI(date);
    const timePattern = /^([01]\d|2[0-3]):(00|30)$/;

    times.forEach((slot) => {
      expect(slot).toMatch(timePattern);
    });
  });

  it("returns consistent times for the same date", () => {
    const date = new Date("2026-11-18T12:00:00");

    expect(fetchAPI(date)).toEqual(fetchAPI(date));
  });

  it("successfully submits a booking and returns true", () => {
    const booking = {
      date: "2026-11-18",
      time: "19:30",
      guests: 4,
      occasion: "Birthday",
      name: "Test User",
      email: "test@example.com",
    };

    expect(submitAPI(booking)).toBe(true);
  });
});
