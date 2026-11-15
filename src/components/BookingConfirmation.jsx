function BookingConfirmation({ booking, onReset }) {
  if (!booking) {
    return null;
  }

  return (
    <div className="confirmation" role="status" aria-live="polite">
      <div className="confirmation-icon-wrapper" aria-hidden="true">
        <span className="confirmation-icon">✓</span>
      </div>

      <h2>Your booking request has been received.</h2>
      <p className="confirmation-thankyou">
        Thank you, <strong>{booking.name}</strong>. We look forward to welcoming you to Little Lemon.
      </p>

      <div className="confirmation-card">
        <div className="confirmation-row">
          <span className="confirmation-label">Date:</span>
          <span className="confirmation-value">{booking.date}</span>
        </div>
        <div className="confirmation-row">
          <span className="confirmation-label">Time:</span>
          <span className="confirmation-value">{booking.time}</span>
        </div>
        <div className="confirmation-row">
          <span className="confirmation-label">Guests:</span>
          <span className="confirmation-value">
            {booking.guests} {booking.guests === 1 ? "guest" : "guests"}
          </span>
        </div>
        <div className="confirmation-row">
          <span className="confirmation-label">Occasion:</span>
          <span className="confirmation-value">{booking.occasion}</span>
        </div>
        <div className="confirmation-row">
          <span className="confirmation-label">Email:</span>
          <span className="confirmation-value">{booking.email}</span>
        </div>
      </div>

      <p className="confirmation-note">
        Need to make changes? Call us directly at (312) 555-0199 with your booking details.
      </p>

      <button
        type="button"
        className="primary-button confirmation-button"
        onClick={onReset}
      >
        Make another reservation
      </button>
    </div>
  );
}

export default BookingConfirmation;
