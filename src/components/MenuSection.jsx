const specials = [
  {
    id: "greek-salad",
    name: "Greek Salad",
    price: "$12.99",
    description:
      "Fresh tomatoes, kalamata olives, crisp cucumbers, peppers, and authentic Greek feta dressed with extra virgin olive oil.",
    emoji: "🥗",
    badgeClass: "salad",
  },
  {
    id: "bruschetta",
    name: "Bruschetta",
    price: "$8.99",
    description:
      "Grilled artisan sourdough bread seasoned with garlic, topped with vine-ripened tomatoes, fresh herbs, and balsamic drizzle.",
    emoji: "🍅",
    badgeClass: "bruschetta",
  },
  {
    id: "lemon-dessert",
    name: "Lemon Dessert",
    price: "$6.99",
    description:
      "A delightful homemade lemon cake with smooth mascarpone layers and a zesty lemon curd finish straight from Grandma's recipe book.",
    emoji: "🍰",
    badgeClass: "dessert",
  },
];

function MenuSection() {
  return (
    <section className="highlights" id="menu" aria-labelledby="menu-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">TASTE THE DIFFERENCE</p>
          <h2 id="menu-heading">Our Specials</h2>
        </div>
        <a href="#booking" className="secondary-button">
          Book your table
        </a>
      </div>

      <div className="food-grid">
        {specials.map((dish) => (
          <article className="food-card" key={dish.id}>
            <div
              className={`food-image ${dish.badgeClass}`}
              role="img"
              aria-label={dish.name}
            >
              <span>{dish.emoji}</span>
            </div>
            <div className="food-info">
              <div className="food-header">
                <h3>{dish.name}</h3>
                <strong className="food-price">{dish.price}</strong>
              </div>
              <p>{dish.description}</p>
              <a
                href="#booking"
                className="delivery-link"
                aria-label={`Order delivery for ${dish.name}`}
              >
                <span>Order a delivery</span>
                <span className="delivery-icon" aria-hidden="true">🛵</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default MenuSection;

