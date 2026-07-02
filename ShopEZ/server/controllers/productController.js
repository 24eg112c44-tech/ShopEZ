import Product from "../models/Product.js";

export async function getProducts(req, res) {
  try {
    const { category, audience, search, sort } = req.query;
    const query = {};

    if (category && category !== "all") query.category = category;
    if (audience && audience !== "all") query.audience = audience;
    if (search) query.name = { $regex: search, $options: "i" };

    let products = Product.find(query);
    if (sort === "low") products = products.sort({ price: 1 });
    else if (sort === "high") products = products.sort({ price: -1 });
    else if (sort === "discount") products = products.sort({ discount: -1 });
    else products = products.sort({ createdAt: -1 });

    res.json(await products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function createProduct(req, res) {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
