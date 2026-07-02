import products from "../data/products";

const wait = (data) => new Promise((resolve) => setTimeout(() => resolve(data), 120));

export async function getProducts() {
  return wait(products);
}

export async function loginUser({ email, password }) {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const name = email.split("@")[0].replace(/[._-]/g, " ") || "Customer";
  return wait({
    email,
    name: name.replace(/\b\w/g, (letter) => letter.toUpperCase())
  });
}

export async function registerUser({ name, email, password }) {
  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  return wait({ name, email });
}
