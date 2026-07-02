import ProductCard from "../components/ProductCard";

const categories = ["all", "Gadgets", "Home", "Fashion", "Beauty", "Sports", "Kids"];
const audiences = ["all", "Men", "Women", "Unisex", "Kids"];

function Home({
  products,
  filteredProducts,
  filters,
  setFilters,
  search,
  setSearch,
  onAddToCart,
  onOpenProduct
}) {
  return (
    <>
      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow">Fresh demo store</p>
          <h1>Different UI, real products, smooth checkout.</h1>
          <p>
            Browse lifestyle essentials with real images, filters, cart, login,
            and payment methods like UPI, card, netbanking, and COD.
          </p>
          <div className="hero-actions">
            <a className="primary-link" href="#products">Shop Products</a>
            <a className="ghost-link" href="#checkout">Payment Method</a>
          </div>
        </div>
        <div className="hero-board">
          <img
            src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1000&q=85"
            alt="Shopping bags and products"
          />
          <div className="deal-card">
            <span>Today</span>
            <strong>Up to 35% off</strong>
          </div>
        </div>
      </section>

      <section className="toolbar" aria-label="Product controls">
        <label className="search-box search-full">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            type="search"
            placeholder="Search bags, gadgets, home, beauty..."
          />
        </label>

        <div className="category-strip">
          {categories.map((category) => (
            <button
              key={category}
              className={filters.category === category ? "active" : ""}
              type="button"
              onClick={() => setFilters({ ...filters, category })}
            >
              {category === "all" ? "All" : category}
            </button>
          ))}
        </div>

        <div className="toolbar-row">
          <div className="audience-tabs">
            {audiences.map((audience) => (
              <button
                key={audience}
                className={filters.audience === audience ? "active" : ""}
                type="button"
                onClick={() => setFilters({ ...filters, audience })}
              >
                {audience === "all" ? "All" : audience}
              </button>
            ))}
          </div>

          <select
            value={filters.sort}
            onChange={(event) => setFilters({ ...filters, sort: event.target.value })}
            aria-label="Sort products"
          >
            <option value="newest">Newest</option>
            <option value="low">Low Price</option>
            <option value="high">High Price</option>
            <option value="discount">Big Discount</option>
          </select>
        </div>
      </section>

      <section className="section-head" id="products">
        <div>
          <p className="eyebrow">Catalog</p>
          <h2>Different products</h2>
        </div>
        <p>{filteredProducts.length || products.length} products</p>
      </section>

      <section className="product-grid">
        {filteredProducts.length ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onOpenProduct={onOpenProduct}
            />
          ))
        ) : (
          <p className="empty-result">No products found. Try another filter.</p>
        )}
      </section>
    </>
  );
}

export default Home;
