import { formatMoney } from "../utils/format";

function ProductCard({ product, onAddToCart, onOpenProduct }) {
  return (
    <article className="product-card">
      <button className="product-open" type="button" onClick={() => onOpenProduct(product)}>
        View details
      </button>
      <div className="image-wrap" onClick={() => onOpenProduct(product)}>
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="discount-badge">-{product.discount}%</span>
      </div>
      <div className="product-body">
        <div className="product-meta">
          <span>{product.category}</span>
          <span>{product.audience}</span>
        </div>
        <button className="product-title" type="button" onClick={() => onOpenProduct(product)}>
          {product.name}
        </button>
        <div className="price-row">
          <p className="price">{formatMoney(product.price)}</p>
          <p className="old-price">{formatMoney(product.originalPrice)}</p>
        </div>
        <button className="add-button" type="button" onClick={() => onAddToCart(product.id)}>
          Add to cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
