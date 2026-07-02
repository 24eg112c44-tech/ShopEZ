import { formatMoney } from "../utils/format";

function Cart({ cartItems, onIncrease, onDecrease, onClear }) {
  return (
    <div className="panel">
      <div className="panel-head">
        <h2>Your Cart</h2>
        <button className="text-button" type="button" onClick={onClear}>Clear</button>
      </div>
      <div className="cart-list">
        {cartItems.length ? (
          cartItems.map((item) => (
            <article className="cart-item" key={item.id}>
              <img className="cart-thumb" src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>{formatMoney(item.price)} each</p>
                <p className="cart-discount">
                  Saved {formatMoney((item.originalPrice - item.price) * item.quantity)}
                </p>
              </div>
              <div className="qty-control">
                <button className="qty-button" type="button" onClick={() => onDecrease(item.id)}>-</button>
                <strong>{item.quantity}</strong>
                <button className="qty-button" type="button" onClick={() => onIncrease(item.id)}>+</button>
              </div>
            </article>
          ))
        ) : (
          <p className="cart-empty">Cart is empty. Add a product to start checkout.</p>
        )}
      </div>
    </div>
  );
}

export default Cart;
