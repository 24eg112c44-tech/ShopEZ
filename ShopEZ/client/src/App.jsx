import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import Register from "./pages/Register";
import { getProducts } from "./services/api";
import { formatMoney } from "./utils/format";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("shopez-cart") || "{}"));
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("shopez-user") || "null"));
  const [showLogin, setShowLogin] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ category: "all", audience: "all", sort: "newest" });
  const [payment, setPayment] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [address, setAddress] = useState("");
  const [orderMessage, setOrderMessage] = useState("");

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  useEffect(() => {
    localStorage.setItem("shopez-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) localStorage.setItem("shopez-user", JSON.stringify(user));
    else localStorage.removeItem("shopez-user");
  }, [user]);

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    return [...products]
      .filter((product) => {
        const matchesTerm = [product.name, product.category, product.audience].join(" ").toLowerCase().includes(term);
        const matchesCategory = filters.category === "all" || product.category === filters.category;
        const matchesAudience = filters.audience === "all" || product.audience === filters.audience;
        return matchesTerm && matchesCategory && matchesAudience;
      })
      .sort((a, b) => {
        if (filters.sort === "low") return a.price - b.price;
        if (filters.sort === "high") return b.price - a.price;
        if (filters.sort === "discount") return b.discount - a.discount;
        return b.created - a.created;
      });
  }, [products, search, filters]);

  const cartItems = useMemo(() => {
    return Object.entries(cart)
      .map(([id, quantity]) => {
        const product = products.find((item) => item.id === Number(id));
        return product ? { ...product, quantity } : null;
      })
      .filter(Boolean);
  }, [cart, products]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const originalSubtotal = cartItems.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
  const discountTotal = originalSubtotal - subtotal;
  const delivery = subtotal > 0 && subtotal < 1500 ? 79 : 0;
  const total = subtotal + delivery;
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (id) => setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }));
  const increase = (id) => addToCart(id);
  const decrease = (id) => {
    setCart((current) => {
      const next = { ...current, [id]: (current[id] || 0) - 1 };
      if (next[id] <= 0) delete next[id];
      return next;
    });
  };

  const placeOrder = (event) => {
    event.preventDefault();

    if (!user) {
      setOrderMessage("Please login before placing the order.");
      setShowLogin(true);
      return;
    }
    if (!cartItems.length) return setOrderMessage("Add at least one product to cart.");
    if (payment === "upi" && !/^[\w.-]+@[\w.-]+$/.test(upiId.trim())) {
      return setOrderMessage("Enter a valid UPI ID like name@upi.");
    }
    if (payment === "card" && cardNumber.replace(/\D/g, "").length < 12) {
      return setOrderMessage("Enter a valid card number.");
    }
    if (payment === "netbanking" && !bankName) return setOrderMessage("Select your bank.");
    if (!address.trim()) return setOrderMessage("Enter delivery address.");

    setOrderMessage(`Order placed with ${payment.toUpperCase()}. Thank you, ${user.name}.`);
    setCart({});
  };

  const loginUserIn = (nextUser) => {
    setUser(nextUser);
    setShowLogin(false);
  };

  if (!user) {
    return (
      <main className="login-first">
        <Login onLogin={loginUserIn} />
      </main>
    );
  }

  return (
    <>
      <Navbar
        cartCount={cartCount}
        user={user}
        onLoginClick={() => setShowLogin(true)}
        onLogoutClick={() => setUser(null)}
      />
      <main>
        <Home
          products={products}
          filteredProducts={filteredProducts}
          filters={filters}
          setFilters={setFilters}
          search={search}
          setSearch={setSearch}
          onAddToCart={addToCart}
          onOpenProduct={setSelectedProduct}
        />

        <section className="checkout-grid" id="cart">
          <Cart cartItems={cartItems} onIncrease={increase} onDecrease={decrease} onClear={() => setCart({})} />

          <aside className="panel pay-panel" id="checkout">
            <div className="panel-head">
              <h2>Payment</h2>
              <span>{user ? `${user.name} logged in` : "Guest checkout"}</span>
            </div>

            <dl className="summary">
              <div><dt>MRP Total</dt><dd>{formatMoney(originalSubtotal)}</dd></div>
              <div><dt>Discount</dt><dd>-{formatMoney(discountTotal)}</dd></div>
              <div><dt>Subtotal</dt><dd>{formatMoney(subtotal)}</dd></div>
              <div><dt>Delivery</dt><dd>{delivery === 0 ? "Free" : formatMoney(delivery)}</dd></div>
              <div className="total"><dt>Total</dt><dd>{formatMoney(total)}</dd></div>
            </dl>

            <form className="payment-form" onSubmit={placeOrder}>
              <div className="payment-methods">
                {["upi", "card", "netbanking", "cod"].map((method) => (
                  <label key={method} className={payment === method ? "active" : ""}>
                    <input
                      type="radio"
                      name="payment"
                      value={method}
                      checked={payment === method}
                      onChange={() => {
                        setPayment(method);
                        setOrderMessage("");
                      }}
                    />
                    {method.toUpperCase()}
                  </label>
                ))}
              </div>

              {payment === "upi" && (
                <label><span>UPI ID</span><input value={upiId} onChange={(event) => setUpiId(event.target.value)} placeholder="yourname@upi" /></label>
              )}
              {payment === "card" && (
                <label><span>Card Number</span><input value={cardNumber} onChange={(event) => setCardNumber(event.target.value)} placeholder="4242 4242 4242 4242" /></label>
              )}
              {payment === "netbanking" && (
                <label>
                  <span>Bank</span>
                  <select value={bankName} onChange={(event) => setBankName(event.target.value)}>
                    <option value="">Select bank</option>
                    <option>State Bank of India</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                  </select>
                </label>
              )}

              <label>
                <span>Delivery Address</span>
                <textarea value={address} onChange={(event) => setAddress(event.target.value)} rows={3} placeholder="House number, street, city, pincode" />
              </label>

              <button className="primary-button" type="submit">Place Order</button>
              {orderMessage && <p className="form-note">{orderMessage}</p>}
            </form>
          </aside>
        </section>

        <Register />
      </main>
      <Footer />
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onAddToCart={addToCart}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      {showLogin && <Login onLogin={loginUserIn} onClose={() => setShowLogin(false)} />}
    </>
  );
}

export default App;
