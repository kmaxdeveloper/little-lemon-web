import { useState } from "react";

const OCCASIONS = ["Birthday", "Anniversary", "Engagement", "Other"];

function BookingForm({
  availableTimes = [],
  dispatch,
  onDateChange,
  onSubmitBooking,
  submitError = "",
  isSubmitting = false,
}) {
  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("2");
  const [occasion, setOccasion] = useState("Birthday");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    date: false,
    time: false,
    guests: false,
  });

  function validate(fields = { name, email, date, time, guests }) {
    const errors = {};

    // Name validation
    const trimmedName = fields.name ? fields.name.trim() : "";
    if (!trimmedName) {
      errors.name = "Full name is required.";
    } else if (trimmedName.length < 2) {
      errors.name = "Full name must be at least 2 characters.";
    }

    // Email validation
    const trimmedEmail = fields.email ? fields.email.trim() : "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail) {
      errors.email = "Email address is required.";
    } else if (!emailRegex.test(trimmedEmail)) {
      errors.email = "Please enter a valid email address.";
    }

    // Date validation
    if (!fields.date) {
      errors.date = "Please choose a reservation date.";
    } else if (fields.date < today) {
      errors.date = "Reservation date cannot be in the past.";
    }

    // Time validation
    if (!fields.time) {
      errors.time = "Please choose a reservation time.";
    }

    // Guests validation
    const guestNum = Number(fields.guests);
    if (!fields.guests || isNaN(guestNum) || guestNum < 1 || guestNum > 10) {
      errors.guests = "Number of guests must be between 1 and 10.";
    }

    return errors;
  }

  const errors = validate();

  function handleBlur(field) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function handleDateChange(event) {
    const selectedDate = event.target.value;
    setDate(selectedDate);
    setTime("");
    setTouched((prev) => ({ ...prev, date: true }));

    if (dispatch) {
      dispatch({ type: "UPDATE_TIMES", date: selectedDate });
    }
    if (onDateChange) {
      onDateChange(selectedDate);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    setTouched({
      name: true,
      email: true,
      date: true,
      time: true,
      guests: true,
    });

    const formErrors = validate({ name, email, date, time, guests });
    if (Object.keys(formErrors).length > 0) {
      // Focus first error field for accessibility
      const firstErrorField = Object.keys(formErrors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.focus();
      }
      return;
    }

    const formData = {
      name: name.trim(),
      email: email.trim(),
      date,
      time,
      guests: Number(guests),
      occasion,
    };

    if (onSubmitBooking) {
      onSubmitBooking(formData);
    }
  }

  const hasTimes = availableTimes && availableTimes.length > 0;

  return (
    <form
      className="booking-form"
      onSubmit={handleSubmit}
      noValidate
      aria-label="Table reservation form"
    >
      <h3>Your reservation</h3>

      {/* Name Field */}
      <div className={`form-group ${touched.name && errors.name ? "has-error" : ""}`}>
        <label htmlFor="name">
          Full name <span className="required-star" aria-hidden="true">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => handleBlur("name")}
          placeholder="e.g. Maria Sanchez"
          required
          minLength={2}
          aria-required="true"
          aria-invalid={touched.name && !!errors.name}
          aria-describedby={touched.name && errors.name ? "name-error" : undefined}
        />
        {touched.name && errors.name && (
          <p id="name-error" className="field-error" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div className={`form-group ${touched.email && errors.email ? "has-error" : ""}`}>
        <label htmlFor="email">
          Email address <span className="required-star" aria-hidden="true">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => handleBlur("email")}
          placeholder="you@example.com"
          required
          aria-required="true"
          aria-invalid={touched.email && !!errors.email}
          aria-describedby={touched.email && errors.email ? "email-error" : undefined}
        />
        {touched.email && errors.email && (
          <p id="email-error" className="field-error" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      {/* Date & Time Row */}
      <div className="form-row">
        <div className={`form-group ${touched.date && errors.date ? "has-error" : ""}`}>
          <label htmlFor="date">
            Choose date <span className="required-star" aria-hidden="true">*</span>
          </label>
          <input
            id="date"
            name="date"
            type="date"
            value={date}
            min={today}
            onChange={handleDateChange}
            onBlur={() => handleBlur("date")}
            required
            aria-required="true"
            aria-invalid={touched.date && !!errors.date}
            aria-describedby={touched.date && errors.date ? "date-error" : undefined}
          />
          {touched.date && errors.date && (
            <p id="date-error" className="field-error" role="alert">
              {errors.date}
            </p>
          )}
        </div>

        <div className={`form-group ${touched.time && errors.time ? "has-error" : ""}`}>
          <label htmlFor="time">
            Choose time <span className="required-star" aria-hidden="true">*</span>
          </label>
          <select
            id="time"
            name="time"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
              setTouched((prev) => ({ ...prev, time: true }));
            }}
            onBlur={() => handleBlur("time")}
            required
            aria-required="true"
            aria-invalid={touched.time && !!errors.time}
            aria-describedby={touched.time && errors.time ? "time-error" : undefined}
            disabled={!hasTimes}
          >
            <option value="" disabled>
              {hasTimes ? "Select time" : "No times available"}
            </option>
            {availableTimes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          {touched.time && errors.time && (
            <p id="time-error" className="field-error" role="alert">
              {errors.time}
            </p>
          )}
          {!hasTimes && date && (
            <p className="field-hint" role="status">
              No available times for this date. Please choose another date.
            </p>
          )}
        </div>
      </div>

      {/* Guests & Occasion Row */}
      <div className="form-row">
        <div className={`form-group ${touched.guests && errors.guests ? "has-error" : ""}`}>
          <label htmlFor="guests">Number of guests</label>
          <select
            id="guests"
            name="guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            onBlur={() => handleBlur("guests")}
            aria-invalid={touched.guests && !!errors.guests}
            aria-describedby={touched.guests && errors.guests ? "guests-error" : undefined}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
              <option key={number} value={number}>
                {number} {number === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
          {touched.guests && errors.guests && (
            <p id="guests-error" className="field-error" role="alert">
              {errors.guests}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="occasion">Occasion</label>
          <select
            id="occasion"
            name="occasion"
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
          >
            {OCCASIONS.map((occ) => (
              <option key={occ} value={occ}>
                {occ}
              </option>
            ))}
          </select>
        </div>
      </div>

      {submitError && (
        <div role="alert" className="error-message">
          <span className="error-icon" aria-hidden="true">⚠️</span>
          <span>{submitError}</span>
        </div>
      )}

      <button
        className="primary-button submit-button"
        type="submit"
        disabled={isSubmitting || (!hasTimes && !!date)}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? "Confirming..." : "Confirm Reservation"}
      </button>
    </form>
  );
}

export default BookingForm;

