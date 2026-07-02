import { useState } from "react";
import { registerUser } from "../services/api";

function Register() {
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const update = (key) => (event) => {
    setForm({ ...form, [key]: event.target.value });
  };

  const submit = async (event) => {
    event.preventDefault();
    await registerUser(form);
    setMessage("Registration successful. You can login now.");
  };

  return (
    <section className="panel register-panel">
      <h2>Register</h2>
      <form className="payment-form" onSubmit={submit}>
        <label><span>Name</span><input value={form.name} onChange={update("name")} required /></label>
        <label><span>Email</span><input type="email" value={form.email} onChange={update("email")} required /></label>
        <label><span>Password</span><input type="password" value={form.password} onChange={update("password")} required /></label>
        <button className="primary-button" type="submit">Create Account</button>
        {message && <p className="form-note">{message}</p>}
      </form>
    </section>
  );
}

export default Register;
