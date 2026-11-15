# Little Lemon Restaurant — Table Booking Web Application

A responsive, accessible table reservation web application built with React and Vite for the **Meta Front-End Developer Capstone** course.

---

## 📖 Project Overview

Little Lemon is a family-owned Mediterranean restaurant located in Chicago, Illinois. Founded by brothers Mario and Adrian, the restaurant combines traditional Mediterranean recipes with a modern culinary twist.

This web application allows customers to:
- Browse featured specials and menu offerings.
- Check table availability in real time based on selected dates.
- Submit table reservations with personalized details (party size, occasion, date, and time).
- Receive immediate confirmation with full booking details.

---

## ✨ Features

- **Responsive Landing Page:** Fully optimized across mobile (320px+), tablet, and desktop viewports.
- **Dynamic Table Availability:** Dynamically generated available booking slots that update automatically when the date changes, using React's `useReducer` and the mock `fetchAPI`.
- **Accessible Booking Form:**
  - Semantic HTML5 form controls (`<form>`, `<label>`, `<input>`, `<select>`, `<button>`).
  - Accessible error feedback via `aria-invalid`, `aria-describedby`, and `role="alert"`.
  - Keyboard-accessible skip-to-content navigation (`.skip-link`).
  - Strict client-side validation for customer name, email format, future dates, and guest limits (1–10).
- **Instant Booking Confirmation:** Summary view displaying confirmed booking details with an option to book another table.
- **Brand Consistency:** Designed following Little Lemon branding guidelines (Mediterranean Green `#495E57`, Lemon Yellow `#F4CE14`, Peach/Coral accents, Markazi Text, and Karla typography).
- **Comprehensive Unit Testing:** Automated unit tests covering reducers, validation logic, API integration, and user interactions with Vitest and React Testing Library.

---

## 🛠️ Technologies

- **React 19** — Component-based user interface and state management.
- **JavaScript (ES6+)** — Modern language features and modular architecture.
- **Vite 8** — Next-generation frontend build tool and dev server.
- **CSS3** — Custom properties (variables), Flexbox, CSS Grid, and responsive media queries.
- **Vitest 5 & React Testing Library 16** — Fast, behavior-driven unit and integration testing.
- **ESLint 10** — Strict code quality and React best-practice linting.

---

## 📁 Project Architecture & Components

```
little-lemon/
├── public/
│   └── favicon.svg           # Custom Little Lemon favicon
├── src/
│   ├── assets/
│   │   └── hero.png          # Hero image asset
│   ├── components/
│   │   ├── AboutSection.jsx  # Restaurant story and history
│   │   ├── BookingConfirmation.jsx # Booking confirmation summary screen
│   │   ├── BookingForm.jsx   # Accessible table booking form with validation
│   │   ├── Footer.jsx        # Semantic footer with contact and opening hours
│   │   ├── Header.jsx        # Header with brand, nav links, and mobile toggle
│   │   ├── Hero.jsx          # Hero section with primary CTA and image
│   │   └── MenuSection.jsx   # Specials cards with delivery order links
│   ├── reducers/
│   │   └── bookingReducer.js # Pure reducer functions (updateTimes, initializeTimes)
│   ├── api.js                # Mock booking API (fetchAPI, submitAPI)
│   ├── api.test.js           # API unit tests
│   ├── App.jsx               # Root application coordinator component
│   ├── App.css               # Application layout and responsive styles
│   ├── App.test.jsx          # Comprehensive unit & integration tests
│   ├── index.css             # Global CSS reset, typography, and theme tokens
│   ├── main.jsx              # React DOM entry point
│   └── setupTests.js         # Jest-DOM matchers setup for Vitest
├── eslint.config.js          # ESLint flat configuration
├── index.html                # HTML entry point with meta tags and Google Fonts
├── package.json              # Project scripts and dependencies
├── vite.config.js            # Vite configuration
└── vitest.config.js          # Vitest testing configuration
```

---

## ⚙️ Installation & Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher recommended)

### 1. Clone the repository
```bash
git clone https://github.com/kmaxdeveloper/little-lemon-web.git
cd little-lemon
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open your browser at the local URL shown in the terminal (usually `http://localhost:5173`).

---

## 🧪 Testing

Run the test suite once:
```bash
npm test -- --run
```

Run tests in watch mode during development:
```bash
npm test
```

### What is tested:
- **`initializeTimes`:** Returns initial available booking times from `fetchAPI`.
- **`updateTimes`:** Returns updated available times when date changes; preserves state on unknown/invalid actions.
- **Form Rendering:** All required form controls, accessible labels, default values, and landmarks.
- **Accessibility:** Skip-to-content link, landmarks (`banner`, `main`, `contentinfo`), and ARIA attributes.
- **Validation:**
  - Empty submission prevention and required field error messages.
  - Name minimum length (>= 2 characters).
  - Email format validation.
  - Past date prevention (dates earlier than today are rejected).
  - Guest count bounds (1 to 10 guests).
- **Date Change Integration:** Selecting a new future date triggers dynamic time slot updates.
- **Successful Submission Flow:** Form submission calls `submitAPI` and transitions to the confirmation view with correct booking details.
- **Reset Flow:** "Make another reservation" returns to the reservation form.
- **Failure Error Handling:** Submission failure displays an accessible alert error banner.
- **API Tests:** Validates time format (`HH:00` / `HH:30`), consistency, and `submitAPI` return value.

---

## 🔍 Code Quality & Linting

Run ESLint:
```bash
npm run lint
```

---

## 📦 Production Build

Create an optimized production build:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

---

## 🔌 Mock API Explanation

This project uses a client-side mock API (`src/api.js`) as specified by the Meta Front-End Capstone curriculum:
- **`fetchAPI(date)`**: Takes a JavaScript `Date` object, seeds a pseudo-random generator with the date's day of month, and returns an array of available evening reservation slots between 17:00 and 23:30.
- **`submitAPI(formData)`**: Simulates table reservation processing and returns `true` upon receiving valid reservation data.

> **Note:** The mock API simulates backend behavior purely in the browser for demonstration and grading purposes; it does not persist data to an external database.

---

## 📋 Coursera Peer-Review Criteria Self-Assessment

| # | Peer-Review Criterion | Status | Implementation Details |
|---|----------------------|--------|------------------------|
| 1 | **UX/UI Design** | ✅ Met | Follows Little Lemon Mediterranean palette (`#495E57`, `#F4CE14`, `#EE9972`), Markazi Text and Karla typography, polished hero, cards, and smooth hover/focus transitions. |
| 2 | **Accessibility** | ✅ Met | Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), explicit `<label htmlFor>`, `aria-required`, `aria-invalid`, `aria-describedby`, `role="alert"`, `:focus-visible` indicators, and skip-to-content link. |
| 3 | **Unit Tests** | ✅ Met | 17 comprehensive Vitest and React Testing Library tests covering reducer functions, field rendering, validation edge cases, date changes, success, and error paths. |
| 4 | **Booking Form & Validation** | ✅ Met | Full name required (>= 2 chars), valid email regex, past dates blocked, time slot selection, guests (1–10), and occasion selection. |
| 5 | **Semantics & Responsiveness** | ✅ Met | Proper heading hierarchy (`h1` -> `h2` -> `h3`), responsive CSS Grid/Flexbox layouts across mobile, tablet, and desktop without horizontal scroll. |
| 6 | **Git Repository** | ✅ Met | Clean commit history, safe working tree, no unauthorized pushes or modifications to remote settings. |
| 7 | **Code Structure & Maintainability** | ✅ Met | Modular component hierarchy (`Header`, `Hero`, `MenuSection`, `BookingForm`, `BookingConfirmation`, `AboutSection`, `Footer`, `bookingReducer`). Clean, documented, intermediate-friendly React code. |
| 8 | **Edge Cases & Error Handling** | ✅ Met | Prevents empty submits, past dates, invalid emails, handles `submitAPI` failures with accessible user-facing alert, and prevents duplicate submissions. |
| 9 | **Documentation** | ✅ Met | Comprehensive `README.md` covering overview, features, tech stack, setup, testing, build, mock API explanation, and rubric checklist. |

---

## 📄 License

This project is created for educational purposes as part of the **Meta Front-End Developer Certificate**.
