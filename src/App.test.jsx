import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import { initializeTimes, updateTimes } from "./reducers/bookingReducer";
import * as api from "./api";

describe("Booking Reducer Functions", () => {
  it("initializeTimes returns a non-empty array of available times", () => {
    const times = initializeTimes();
    expect(Array.isArray(times)).toBe(true);
    expect(times.length).toBeGreaterThan(0);
    expect(typeof times[0]).toBe("string");
  });

  it("updateTimes returns updated available times for a given date action", () => {
    const initialState = ["17:00", "18:00"];
    const action = { type: "UPDATE_TIMES", date: "2099-05-20" };
    const updatedTimes = updateTimes(initialState, action);

    expect(Array.isArray(updatedTimes)).toBe(true);
    expect(updatedTimes.length).toBeGreaterThan(0);
  });

  it("updateTimes returns existing state for invalid date or unknown action", () => {
    const initialState = ["17:00", "18:00"];
    const unknownAction = { type: "UNKNOWN_ACTION", date: "2099-05-20" };
    expect(updateTimes(initialState, unknownAction)).toEqual(initialState);

    const invalidDateAction = { type: "UPDATE_TIMES", date: "invalid-date" };
    expect(updateTimes(initialState, invalidDateAction)).toEqual(initialState);
  });
});

describe("Little Lemon Table Booking Application", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the skip-to-content accessibility link and landmarks", () => {
    render(<App />);

    const skipLink = screen.getByRole("link", { name: /skip to main content/i });
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute("href", "#main-content");

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("renders all required booking fields with appropriate labels", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: /reserve your table/i })
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /confirm reservation/i })
    ).toBeInTheDocument();
  });

  it("validates required fields upon empty submission and prevents submission", () => {
    render(<App />);

    const submitBtn = screen.getByRole("button", { name: /confirm reservation/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText(/full name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email address is required/i)).toBeInTheDocument();
    expect(screen.getByText(/please choose a reservation date/i)).toBeInTheDocument();
    expect(screen.getByText(/please choose a reservation time/i)).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", { name: /your booking request has been received/i })
    ).not.toBeInTheDocument();
  });

  it("validates minimum length for full name", () => {
    render(<App />);

    const nameInput = screen.getByLabelText(/full name/i);
    fireEvent.change(nameInput, { target: { value: "A" } });
    fireEvent.blur(nameInput);

    expect(
      screen.getByText(/full name must be at least 2 characters/i)
    ).toBeInTheDocument();
    expect(nameInput).toHaveAttribute("aria-invalid", "true");
  });

  it("validates invalid email address format", () => {
    render(<App />);

    const emailInput = screen.getByLabelText(/email address/i);
    fireEvent.change(emailInput, { target: { value: "not-an-email" } });
    fireEvent.blur(emailInput);

    expect(
      screen.getByText(/please enter a valid email address/i)
    ).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("aria-invalid", "true");
  });

  it("prevents selecting a past date and displays validation error", () => {
    render(<App />);

    const dateInput = screen.getByLabelText(/choose date/i);
    fireEvent.change(dateInput, { target: { value: "2020-01-01" } });
    fireEvent.blur(dateInput);

    expect(
      screen.getByText(/reservation date cannot be in the past/i)
    ).toBeInTheDocument();
    expect(dateInput).toHaveAttribute("aria-invalid", "true");
  });

  it("updates available times when a valid future date is selected", async () => {
    render(<App />);

    const dateInput = screen.getByLabelText(/choose date/i);
    fireEvent.change(dateInput, { target: { value: "2099-11-20" } });

    const timeSelect = screen.getByLabelText(/choose time/i);
    await waitFor(() => {
      const options = timeSelect.querySelectorAll("option");
      expect(options.length).toBeGreaterThan(1);
    });
  });

  it("submits the form successfully and displays submitted details in confirmation", async () => {
    const submitSpy = vi.spyOn(api, "submitAPI").mockReturnValue(true);

    render(<App />);

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "Adrian Miller" }
    });

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "adrian@example.com" }
    });

    fireEvent.change(screen.getByLabelText(/choose date/i), {
      target: { value: "2099-12-25" }
    });

    const timeSelect = screen.getByLabelText(/choose time/i);
    const availableOption = timeSelect.querySelectorAll("option")[1];
    const selectedTime = availableOption.value;

    fireEvent.change(timeSelect, {
      target: { value: selectedTime }
    });

    fireEvent.change(screen.getByLabelText(/number of guests/i), {
      target: { value: "4" }
    });

    fireEvent.change(screen.getByLabelText(/occasion/i), {
      target: { value: "Anniversary" }
    });

    fireEvent.click(
      screen.getByRole("button", { name: /confirm reservation/i })
    );

    expect(submitSpy).toHaveBeenCalledWith({
      name: "Adrian Miller",
      email: "adrian@example.com",
      date: "2099-12-25",
      time: selectedTime,
      guests: 4,
      occasion: "Anniversary"
    });

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /your booking request has been received/i })
      ).toBeInTheDocument();
    });

    expect(screen.getByText(/Adrian Miller/i)).toBeInTheDocument();
    expect(screen.getByText("2099-12-25")).toBeInTheDocument();
    expect(screen.getByText(selectedTime)).toBeInTheDocument();
    expect(screen.getByText(/4 guests/i)).toBeInTheDocument();
    expect(screen.getByText("Anniversary")).toBeInTheDocument();
    expect(screen.getByText("adrian@example.com")).toBeInTheDocument();
  });

  it("allows returning to the reservation form after successful booking", async () => {
    vi.spyOn(api, "submitAPI").mockReturnValue(true);

    render(<App />);

    // Fill and submit
    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "Maria Rossi" }
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "maria@example.com" }
    });
    fireEvent.change(screen.getByLabelText(/choose date/i), {
      target: { value: "2099-07-15" }
    });

    const timeSelect = screen.getByLabelText(/choose time/i);
    const availableOption = timeSelect.querySelectorAll("option")[1];
    fireEvent.change(timeSelect, { target: { value: availableOption.value } });

    fireEvent.click(
      screen.getByRole("button", { name: /confirm reservation/i })
    );

    // Verify confirmation is shown
    const resetBtn = await screen.findByRole("button", {
      name: /make another reservation/i
    });
    expect(resetBtn).toBeInTheDocument();

    // Click reset
    fireEvent.click(resetBtn);

    // Form is displayed again
    expect(
      screen.getByRole("button", { name: /confirm reservation/i })
    ).toBeInTheDocument();
  });

  it("displays an accessible error alert when booking submission fails", async () => {
    vi.spyOn(api, "submitAPI").mockReturnValue(false);

    render(<App />);

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "John Doe" }
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "john@example.com" }
    });
    fireEvent.change(screen.getByLabelText(/choose date/i), {
      target: { value: "2099-08-20" }
    });

    const timeSelect = screen.getByLabelText(/choose time/i);
    const availableOption = timeSelect.querySelectorAll("option")[1];
    fireEvent.change(timeSelect, { target: { value: availableOption.value } });

    fireEvent.click(
      screen.getByRole("button", { name: /confirm reservation/i })
    );

    await waitFor(() => {
      const errorAlert = screen.getByRole("alert");
      expect(errorAlert).toBeInTheDocument();
      expect(errorAlert).toHaveTextContent(
        /sorry, your reservation could not be completed/i
      );
    });

    // Form remains visible so user does not lose input
    expect(
      screen.getByRole("button", { name: /confirm reservation/i })
    ).toBeInTheDocument();
  });
});
