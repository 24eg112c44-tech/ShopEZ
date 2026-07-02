# ShopEZ Nova

ShopEZ Nova is a MERN-style e-commerce college project with a React Vite client
and an Express/MongoDB server structure.

## Features

- Product listing with real product images
- Search, category filter, audience filter, and price sorting
- Login and register UI
- Add to cart, quantity update, and clear cart
- Checkout with UPI, card, netbanking, and COD payment options
- Express API structure for product routes, controllers, and MongoDB model

## Project Structure

```text
ShopEZ/
  client/
    public/
    src/
      assets/
        images/
        styles/
      components/
      pages/
      services/
      App.jsx
      App.css
      main.jsx
    index.html
    package.json
    package-lock.json
    vite.config.js
  server/
    models/
    routes/
    controllers/
    config/
    server.js
    package.json
    package-lock.json
  .gitignore
  README.md
  LICENSE
```

## Run Client

```bash
cd client
npm install
npm run dev
```

## Run Server

```bash
cd server
npm install
npm run dev
```

The server expects MongoDB at `mongodb://127.0.0.1:27017/shopez` unless
`MONGO_URI` is set.
