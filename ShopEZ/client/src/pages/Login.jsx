import { useState } from "react";
import { loginUser } from "../services/api";

function Login({ onLogin, onClose }) {
  const [form, setForm] = useState({
    email: "customer@shopez.com",
    password: "shop123"
  });
  const [error, setError] = useState("");

  const update = (key) => (event) => {
    setForm({ ...form, [key]: event.target.value });
  };

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const user = await loginUser(form);
      onLogin(user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <dialog className="login-dialog" open>
      <form onSubmit={submit}>
        {onClose && (
          <button className="close-button" type="button" aria-label="Close" onClick={onClose}>
            x
          </button>
        )}
        <p className="eyebrow">Login page</p>
        <h2>Sign in to ShopEZ Nova</h2>
        <label>
          <span>Email</span>
          <input type="email" value={form.email} onChange={update("email")} required />
        </label>
        <label>
          <span>Password</span>
          <input type="password" value={form.password} onChange={update("password")} required />
        </label>
        {error && <p className="form-note">{error}</p>}
        <button className="primary-button" type="submit">Login</button>
        <p className="form-note">Demo accepts any email and password.</p>
      </form>
    </dialog>
  );
}

export default Login;
