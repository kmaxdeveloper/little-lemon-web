
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("Little Lemon booking form", () => {
  it("renders the reservation form", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: /reserve your table/i })
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
  });

  it("submits a valid reservation", () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "Test User" }
    });

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "test@example.com" }
    });

    fireEvent.change(screen.getByLabelText(/choose date/i), {
      target: { value: "2099-12-18" }
    });

    const timeSelect = screen.getByLabelText(/choose time/i);
    const availableTime = timeSelect.querySelectorAll("option")[1].value;

    fireEvent.change(timeSelect, {
      target: { value: availableTime }
    });

    fireEvent.click(
      screen.getByRole("button", { name: /confirm reservation/i })
    );

    expect(
      screen.getByRole("heading", { name: /booking request received/i })
    ).toBeInTheDocument();
  });
});
