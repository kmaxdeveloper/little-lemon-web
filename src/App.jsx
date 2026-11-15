
import { useReducer, useState } from "react";
import { fetchAPI, submitAPI } from "./api";
import "./App.css";

function updateTimes(state, action) {
  if (action.type === "UPDATE_TIMES") {
    return fetchAPI(new Date(`${action.date}T12:00:00`));
  }

  return state;
}

function initializeTimes() {
  return fetchAPI(new Date());
}

function App() {
  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    undefined,
    initializeTimes
  );

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [guests, setGuests] = useState("2");
  const [occasion, setOccasion] = useState("Birthday");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  function handleDateChange(event) {
    const selectedDate = event.target.value;
    setDate(selectedDate);
    dispatch({ type: "UPDATE_TIMES", date: selectedDate });
    setTime("");
  }

  function handleSubmit(event) {
  event.preventDefault();

  if (!event.currentTarget.reportValidity()) return;

  const formData = {
    date,
    time,
    guests: Number(guests),
    occasion,
    name,
    email
  };

  const result = submitAPI(formData);

  if (result) {
    setSubmitError("");
    setConfirmed(true);
  } else {
    setSubmitError("Sorry, your reservation could not be completed. Please try again.");
  }
}

  return (
    <div className="app">
      <header className="header">
        <a className="brand" href="#home" aria-label="Little Lemon home">
          <span className="brand-icon">🍋</span>
          <span>Little Lemon</span>
        </a>

        <nav aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#menu">Menu</a>
          <a href="#booking">Reservations</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">CHICAGO · FAMILY OWNED</p>
            <h1>Little Lemon</h1>
            <h2>Mediterranean flavors, made with love.</h2>
            <p>
              Experience fresh ingredients, traditional recipes,
              and unforgettable moments around the table.
            </p>
            <a className="primary-button" href="#booking">
              Reserve a Table
            </a>
          </div>
          <div className="hero-image" role="img" aria-label="Mediterranean restaurant food">
            <span>Fresh. Simple. Delicious.</span>
          </div>
        </section>

        <section className="highlights" id="menu">
          <div className="section-heading">
            <div>
              <p className="eyebrow">TASTE THE DIFFERENCE</p>
              <h2>Our Specials</h2>
            </div>
            <a href="#booking" className="secondary-button">Book your table</a>
          </div>

          <div className="food-grid">
            <article className="food-card">
              <div className="food-image salad">🥗</div>
              <div className="food-info">
                <h3>Greek Salad</h3>
                <p>Fresh tomatoes, olives, feta cheese and crisp greens.</p>
                <strong>$12.99</strong>
              </div>
            </article>

            <article className="food-card">
              <div className="food-image bruschetta">🍅</div>
              <div className="food-info">
                <h3>Bruschetta</h3>
                <p>Grilled bread topped with fresh tomatoes and herbs.</p>
                <strong>$8.99</strong>
              </div>
            </article>

            <article className="food-card">
              <div className="food-image dessert">🍰</div>
              <div className="food-info">
                <h3>Lemon Dessert</h3>
                <p>A delightful homemade lemon dessert with a sweet finish.</p>
                <strong>$6.99</strong>
              </div>
            </article>
          </div>
        </section>

        <section className="booking-section" id="booking">
          <div className="booking-intro">
            <p className="eyebrow">WE LOOK FORWARD TO SEEING YOU</p>
            <h2>Reserve your table</h2>
            <p>
              Planning a special evening? Book your table and let us
              take care of the rest.
            </p>
            <div className="booking-note">
              <span>🍋</span>
              <p>Good food. Great company. Memorable moments.</p>
            </div>
          </div>

          <div className="booking-card">
            {confirmed ? (
              <div className="confirmation" role="status">
                <span className="confirmation-icon">✓</span>
                <h2>Booking request received!</h2>
                <p>Thank you, {name}. We look forward to welcoming you.</p>
                <p><strong>Date:</strong> {date}</p>
                <p><strong>Time:</strong> {time}</p>
                <p><strong>Guests:</strong> {guests}</p>
                <button
                  className="primary-button"
                  onClick={() => setConfirmed(false)}
                >
                  Make another reservation
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3>Your reservation</h3>

                <div className="form-group">
                  <label htmlFor="name">Full name</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                    minLength="2"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="date">Choose date</label>
                    <input
                      id="date"
                      type="date"
                      value={date}
                      min={today}
                      onChange={handleDateChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="time">Choose time</label>
                    <select
                      id="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                    >
                      <option value="" disabled>Select time</option>
                      {availableTimes.map((item) => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="guests">Number of guests</label>
                    <select
                      id="guests"
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                        <option key={number} value={number}>{number}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="occasion">Occasion</label>
                    <select
                      id="occasion"
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                    >
                      <option>Birthday</option>
                      <option>Anniversary</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                {submitError && (
                   <p role="alert" className="error-message">
                   {submitError}
                      </p>
                )}
                <button className="primary-button submit-button" type="submit">
                  Confirm Reservation
                </button>
              </form>
            )}
          </div>
        </section>

        <section className="about-section" id="about">
          <div>
            <p className="eyebrow">OUR STORY</p>
            <h2>A little taste of the Mediterranean</h2>
            <p>
              Little Lemon is a family-owned Mediterranean restaurant
              focused on traditional recipes, fresh ingredients and
              warm hospitality.
            </p>
          </div>
          <div className="about-symbol">🍋</div>
        </section>
      </main>

      <footer id="contact">
        <a className="brand footer-brand" href="#home">🍋 Little Lemon</a>
        <p>Chicago, Illinois · Fresh food, warm hospitality.</p>
        <p>© {new Date().getFullYear()} Little Lemon. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
