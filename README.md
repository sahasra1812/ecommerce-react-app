# E-Commerce React Application

This is a simple React e-commerce application using only:

- React
- HTML
- CSS
- JSON

There is NO Firebase, database, backend, authentication, or external API.

## Project structure

```text
ecommerce-react-app/
│
├── index.html
├── package.json
│
└── src/
    ├── main.jsx
    ├── style.css
    │
    └── data/
        └── products.json
```

## How to run

Open the project folder in VS Code.

Open the terminal and run:

```bash
npm install
```

Then:

```bash
npm run dev
```

Open the localhost URL shown by Vite, normally:

```text
http://localhost:5173
```

## Features

1. Product display
2. Product images
3. Category display
4. Category filtering
5. Product search
6. Stock display
7. Add to Cart
8. Increase quantity
9. Decrease quantity
10. Remove from Cart
11. Cart count
12. Cart total
13. Checkout placeholder
14. Out-of-stock message
15. Call button for out-of-stock products
16. SMS button for out-of-stock products
17. Responsive design

## ProductCard

The ProductCard follows the structure requested:

```jsx
function ProductCard({ product, addToCart }) {
  ...
}
```

The supplied JSON uses `stock`, so the component checks:

```jsx
product.stock > 0
```

instead of `product.quantity > 0`.

Cart quantity is stored separately in:

```jsx
quantity
```

This prevents the product's original stock value from being changed.
