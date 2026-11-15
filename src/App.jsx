import { useReducer, useState } from "react";
import { submitAPI } from "./api";
import { updateTimes, initializeTimes } from "./reducers/bookingReducer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MenuSection from "./components/MenuSection";
import BookingForm from "./components/BookingForm";
import BookingConfirmation from "./components/BookingConfirmation";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";
import "./App.css";


function App() {
  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    undefined,
    initializeTimes
  );

  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleBookingSubmit(formData) {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const isSuccess = submitAPI(formData);

      if (isSuccess) {
        setConfirmedBooking(formData);
        setSubmitError("");
      } else {
        setSubmitError(
          "Sorry, your reservation could not be completed. Please try again."
        );
      }
    } catch {
      setSubmitError(
        "An unexpected error occurred while processing your reservation. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleResetBooking() {
    setConfirmedBooking(null);
    setSubmitError("");
  }

  return (
    <div className="app">
      <Header />

      <main id="main-content">
        <Hero />
        <MenuSection />

        <section
          className="booking-section"
          id="booking"
          aria-labelledby="booking-heading"
        >
          <div className="booking-intro">
            <p className="eyebrow">WE LOOK FORWARD TO SEEING YOU</p>
            <h2 id="booking-heading">Reserve your table</h2>
            <p>
              Planning a special evening? Book your table in advance and let us
              take care of the rest. We provide exceptional Mediterranean cuisine,
              delightful atmosphere, and welcoming hospitality.
            </p>
            <div className="booking-note" aria-hidden="true">
              <span className="booking-note-icon">🍋</span>
              <p>Good food. Great company. Memorable moments.</p>
            </div>
          </div>

          <div className="booking-card">
            {confirmedBooking ? (
              <BookingConfirmation
                booking={confirmedBooking}
                onReset={handleResetBooking}
              />
            ) : (
              <BookingForm
                availableTimes={availableTimes}
                dispatch={dispatch}
                onSubmitBooking={handleBookingSubmit}
                submitError={submitError}
                isSubmitting={isSubmitting}
              />
            )}
          </div>
        </section>

        <AboutSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
