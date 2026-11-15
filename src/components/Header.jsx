import { useState } from "react";

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  function toggleNav() {
    setIsNavOpen((prev) => !prev);
  }

  function handleNavLinkClick() {
    setIsNavOpen(false);
  }

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className="header">
        <a className="brand" href="#home" aria-label="Little Lemon home">
          <span className="brand-icon" aria-hidden="true">🍋</span>
          <span className="brand-name">Little Lemon</span>
        </a>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={isNavOpen}
          aria-label={isNavOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-controls="primary-navigation"
          onClick={toggleNav}
        >
          <span className="nav-toggle-icon" aria-hidden="true">
            {isNavOpen ? "✕" : "☰"}
          </span>
        </button>

        <nav
          id="primary-navigation"
          className={`main-nav ${isNavOpen ? "nav-open" : ""}`}
          aria-label="Main navigation"
        >
          <a href="#home" onClick={handleNavLinkClick}>Home</a>
          <a href="#about" onClick={handleNavLinkClick}>About</a>
          <a href="#menu" onClick={handleNavLinkClick}>Menu</a>
          <a href="#booking" onClick={handleNavLinkClick}>Reservations</a>
          <a href="#contact" onClick={handleNavLinkClick}>Contact</a>
        </nav>
      </header>
    </>
  );
}

export default Header;

