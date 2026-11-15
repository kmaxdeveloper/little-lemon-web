import heroImage from "../assets/hero.png";

function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-content">
        <p className="eyebrow">CHICAGO · FAMILY OWNED</p>
        <h1 id="hero-title">Little Lemon</h1>
        <h2>Mediterranean flavors, made with love.</h2>
        <p>
          Experience fresh ingredients, traditional recipes,
          and unforgettable moments around the table.
        </p>
        <a className="primary-button" href="#booking">
          Reserve a Table
        </a>
      </div>

      <div className="hero-image-container">
        <img
          src={heroImage}
          alt="Fresh Mediterranean dishes and ambiance at Little Lemon"
          className="hero-image"
          loading="eager"
        />
      </div>
    </section>
  );
}

export default Hero;

