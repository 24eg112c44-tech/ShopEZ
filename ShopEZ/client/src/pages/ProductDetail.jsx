import { formatMoney } from "../utils/format";

function ProductDetail({ product, onAddToCart, onClose }) {
  if (!product) return null;

  const savings = product.originalPrice - product.price;

  return (
    <dialog className="product-dialog" open>
      <div className="product-detail">
        <button className="close-button" type="button" aria-label="Close details" onClick={onClose}>
          x
        </button>
        <div className="detail-image">
          <img src={product.image} alt={product.name} />
          <span className="discount-badge">-{product.discount}%</span>
        </div>
        <div className="detail-copy">
          <p className="eyebrow">{product.category} / {product.audience}</p>
          <h2>{product.name}</h2>
          <p className="detail-description">
            A carefully picked ShopEZ product with a fresh price, quick checkout,
            and an easy return-friendly shopping experience.
          </p>
          <div className="detail-price-row">
            <strong>{formatMoney(product.price)}</strong>
            <span>{formatMoney(product.originalPrice)}</span>
            <em>You save {formatMoney(savings)}</em>
          </div>
          <div className="detail-points" aria-label="Product highlights">
            <span>Fast delivery</span>
            <span>Quality checked</span>
            <span>Easy returns</span>
          </div>
          <button className="primary-button" type="button" onClick={() => onAddToCart(product.id)}>
            Add to cart
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default ProductDetail;
