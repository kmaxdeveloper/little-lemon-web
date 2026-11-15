function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="site-footer">
      <div className="footer-content">
        <div className="footer-col footer-brand-col">
          <a className="brand footer-brand" href="#home" aria-label="Little Lemon home">
            <span className="brand-icon" aria-hidden="true">🍋</span>
            <span>Little Lemon</span>
          </a>
          <p className="footer-motto">
            Traditional Mediterranean recipes served with modern warmth in Chicago.
          </p>
        </div>

        <div className="footer-col">
          <h4>Navigation</h4>
          <nav aria-label="Footer navigation" className="footer-nav">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#menu">Menu</a>
            <a href="#booking">Reservations</a>
          </nav>
        </div>

        <div className="footer-col">
          <h4>Contact Us</h4>
          <address className="footer-address">
            <p>123 Mediterranean Way</p>
            <p>Chicago, IL 60601</p>
            <p>
              Phone:{" "}
              <a href="tel:3125550199" aria-label="Call (312) 555-0199">
                (312) 555-0199
              </a>
            </p>
            <p>
              Email:{" "}
              <a
                href="mailto:reservations@littlelemon.com"
                aria-label="Email reservations@littlelemon.com"
              >
                reservations@littlelemon.com
              </a>
            </p>
          </address>
        </div>

        <div className="footer-col">
          <h4>Opening Hours</h4>
          <p>Monday – Friday: 11:00 AM – 10:00 PM</p>
          <p>Saturday – Sunday: 10:00 AM – 11:00 PM</p>
          <div className="social-links" aria-label="Social media links">
            <a href="#home" aria-label="Little Lemon on Instagram" className="social-link">
              Instagram
            </a>
            <span aria-hidden="true">·</span>
            <a href="#home" aria-label="Little Lemon on Facebook" className="social-link">
              Facebook
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {currentYear} Little Lemon Restaurant. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

