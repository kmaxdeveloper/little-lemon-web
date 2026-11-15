function AboutSection() {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="about-content">
        <p className="eyebrow">OUR STORY</p>
        <h2 id="about-title">A little taste of the Mediterranean</h2>
        <p>
          Founded by two Italian brothers, Mario and Adrian, Little Lemon is a
          cozy family-owned restaurant in the heart of Chicago. We bring authentic
          family recipes from the Mediterranean coast, infused with a modern
          culinary touch.
        </p>
        <p>
          We pride ourselves on using locally sourced, fresh ingredients, making
          every meal a celebration of flavor, family, and hospitality.
        </p>
      </div>

      <div className="about-visual" aria-hidden="true">
        <div className="about-badge">
          <span className="about-emoji">🍋</span>
          <span className="about-est">Est. 2012</span>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;

