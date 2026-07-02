function Navbar({ cartCount, user, onLoginClick, onLogoutClick }) {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="ShopEZ Nova home">
        <span>EZ</span>
        <strong>ShopEZ Nova</strong>
      </a>

      <nav className="nav-actions" aria-label="Main navigation">
        <a href="#home">Home</a>
        <a href="#products">Products</a>
        <button type="button" onClick={user ? onLogoutClick : onLoginClick}>
          {user ? "Logout" : "Login"}
        </button>
        <a className="cart-chip" href="#cart">
          Cart <span>{cartCount}</span>
        </a>
      </nav>
    </header>
  );
}

export default Navbar;
