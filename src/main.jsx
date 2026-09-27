import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import products from "./data/products.json";
import "./style.css";

/* =========================
   PRODUCT CARD
========================= */

function ProductCard({ product, addToCart, cart }) {
  /*
    Find whether this product is already in the cart
  */
  const cartItem = cart.find(
    (item) => item.id === product.id
  );

  /*
    Quantity of this product already added to cart
    If product is not in cart, quantity is 0
  */
  const quantityInCart = cartItem
    ? cartItem.quantity
    : 0;

  /*
    Calculate remaining stock

    Example:
    Original stock = 5
    Cart quantity = 2

    Remaining stock = 5 - 2 = 3
  */
  const remainingStock =
    product.stock - quantityInCart;

  /*
    SMS message for out-of-stock product
  */
  const message =
    `Hi there, I am interested in ${product.name}. Please let me know when it is available. Thank you!`;

  return (
    <div className="product">

      {/* Product Image */}
      <div className="image-container">
        <img
          src={product.image}
          alt={product.name}
        />
      </div>

      {/* Product Name */}
      <h3>{product.name}</h3>

      {/* Category */}
      <p className="category">
        {product.category}
      </p>

      {/* Description */}
      <p className="description">
        {product.description}
      </p>

      {/* Price */}
      <p className="price">
        ₹{product.price.toLocaleString("en-IN")}
      </p>

      {/* =========================
          STOCK SECTION
      ========================= */}

      {remainingStock > 0 ? (
        <>
          {/* Remaining Stock */}
          <p className="stock">
            {remainingStock} available
          </p>

          {/* Add To Cart */}
          <button
            className="cart-add-button"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </>
      ) : (
        /* =========================
           OUT OF STOCK
        ========================= */

        <div className="out-stock">

          <p>Out of Stock</p>

          <div className="contact-buttons">

            {/* Call Button */}
            <a
              href="tel:+918639960968"
              className="call-button"
            >
              Call
            </a>

            {/* SMS Button */}
            <a
              href={`sms:+918639960968?body=${encodeURIComponent(
                message
              )}`}
              className="sms-button"
            >
              SMS
            </a>

          </div>
        </div>
      )}
    </div>
  );
}


/* =========================
   MAIN APP
========================= */

function App() {

  /*
    Selected category
  */
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  /*
    Search text
  */
  const [search, setSearch] = useState("");

  /*
    Cart items
  */
  const [cart, setCart] = useState([]);

  /*
    Show / hide cart
  */
  const [showCart, setShowCart] = useState(false);

  /*
    Small message shown after adding product
  */
  const [message, setMessage] = useState("");


  /* =========================
     CATEGORIES
  ========================= */

  const categories = [
    "All",
    ...new Set(
      products.map(
        (product) => product.category
      )
    )
  ];


  /* =========================
     FILTER PRODUCTS
  ========================= */

  const filteredProducts = products.filter(
    (product) => {

      /*
        Category filter
      */
      const categoryMatch =
        selectedCategory === "All" ||
        product.category ===
        selectedCategory;

      /*
        Search filter
      */
      const searchMatch =
        product.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      /*
        Both conditions must be true
      */
      return (
        categoryMatch &&
        searchMatch
      );
    }
  );


  /* =========================
     ADD TO CART
  ========================= */

  const addToCart = (product) => {

    setCart((currentCart) => {

      /*
        Check if product already exists
        in the cart
      */
      const existing =
        currentCart.find(
          (item) =>
            item.id === product.id
        );

      /*
        If product already exists
      */
      if (existing) {

        /*
          Don't allow quantity
          greater than stock
        */
        if (
          existing.quantity >=
          product.stock
        ) {
          return currentCart;
        }

        /*
          Increase quantity by 1
        */
        return currentCart.map(
          (item) =>
            item.id === product.id
              ? {
                ...item,
                quantity:
                  item.quantity + 1
              }
              : item
        );
      }

      /*
        Product doesn't exist
        in cart yet.

        Add it with quantity = 1
      */
      return [
        ...currentCart,
        {
          ...product,
          quantity: 1
        }
      ];
    });


    /*
      Show message
    */
    setMessage(
      `${product.name} added to cart`
    );

    /*
      Remove message after 1.5 seconds
    */
    setTimeout(() => {
      setMessage("");
    }, 1500);
  };


  /* =========================
     INCREASE QUANTITY
  ========================= */

  const increaseQuantity = (id) => {

    setCart((currentCart) =>

      currentCart.map((item) => {

        /*
          If this isn't the selected
          product, return unchanged
        */
        if (item.id !== id) {
          return item;
        }

        /*
          Don't allow quantity
          greater than stock
        */
        if (
          item.quantity >=
          item.stock
        ) {
          return item;
        }

        /*
          Increase quantity
        */
        return {
          ...item,
          quantity:
            item.quantity + 1
        };
      })
    );
  };


  /* =========================
     DECREASE QUANTITY
  ========================= */

  const decreaseQuantity = (id) => {

    setCart((currentCart) =>

      currentCart
        .map((item) =>

          item.id === id
            ? {
              ...item,
              quantity:
                item.quantity - 1
            }
            : item
        )

        /*
          If quantity becomes 0,
          remove product from cart
        */
        .filter(
          (item) =>
            item.quantity > 0
        )
    );
  };


  /* =========================
     REMOVE FROM CART
  ========================= */

  const removeFromCart = (id) => {

    setCart((currentCart) =>
      currentCart.filter(
        (item) =>
          item.id !== id
      )
    );
  };


  /* =========================
     CART COUNT
  ========================= */

  const cartCount =
    cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );


  /* =========================
     CART TOTAL
  ========================= */

  const cartTotal =
    cart.reduce(
      (total, item) =>
        total +
        item.price *
        item.quantity,
      0
    );


  /* =========================
     FORMAT PRICE
  ========================= */

  const formatPrice = (price) =>
    `₹${price.toLocaleString(
      "en-IN"
    )}`;


  /* =========================
     UI
  ========================= */

  return (
    <div>

      {/* =========================
          HEADER
      ========================= */}

      <header>

        <div className="header-content">

          <div>

            <h1>
              E-Commerce Store
            </h1>

            <p>
              Online Shopping Store
            </p>

          </div>


          {/* Header Cart Button */}

          <button
            className="cart-button"
            onClick={() =>
              setShowCart(true)
            }
          >
            🛒 Cart ({cartCount})
          </button>

        </div>

      </header>


      {/* =========================
          NAVIGATION
      ========================= */}

      <nav>

        <a href="#home">
          Home
        </a>

        <a href="#categories">
          Categories
        </a>

        <a href="#products">
          Products
        </a>

        <button
          onClick={() =>
            setShowCart(true)
          }
        >
          Cart
        </button>

      </nav>


      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main id="home">


        {/* =========================
            HERO SECTION
        ========================= */}

        <section className="hero">

          <h2>
            Welcome to Our Store
          </h2>

          <p>
            Find your favorite
            products at great prices.
          </p>

          <button
            onClick={() =>
              document
                .getElementById(
                  "products"
                )
                .scrollIntoView()
            }
          >
            Shop Now
          </button>

        </section>


        {/* =========================
            CATEGORIES
        ========================= */}

        <section id="categories">

          <h2>
            Categories
          </h2>

          <div className="categories">

            {categories.map(
              (category) => (

                <button
                  key={category}

                  className={
                    selectedCategory ===
                      category
                      ? "category active"
                      : "category"
                  }

                  onClick={() =>
                    setSelectedCategory(
                      category
                    )
                  }
                >
                  {category}
                </button>

              )
            )}

          </div>

        </section>


        {/* =========================
            PRODUCTS
        ========================= */}

        <section id="products">

          <h2>
            Products
          </h2>


          {/* Search */}

          <div className="search-box">

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>


          {/* Product List */}

          <div className="products">

            {filteredProducts.length >
              0 ? (

              filteredProducts.map(
                (product) => (

                  <ProductCard
                    key={product.id}
                    product={product}
                    addToCart={
                      addToCart
                    }
                    cart={cart}
                  />

                )
              )

            ) : (

              <p className="no-products">
                No products found.
              </p>

            )}

          </div>

        </section>

      </main>


      {/* =========================
          ADD TO CART MESSAGE
      ========================= */}

      {message && (

        <div className="message">

          {message}

        </div>

      )}




      {showCart && (

        <div
          className="cart-overlay"

          onClick={() =>
            setShowCart(false)
          }
        >



          <div
            className="cart"

            onClick={(e) =>
              e.stopPropagation()
            }
          >




            <div className="cart-header">

              <h2>
                Your Cart
              </h2>

              <button
                onClick={() =>
                  setShowCart(false)
                }
              >
                ✕
              </button>

            </div>




            {cart.length === 0 ? (

              <p className="empty-cart">
                Your cart is empty.
              </p>

            ) : (

              <>



                {cart.map(
                  (item) => (

                    <div
                      className="cart-item"
                      key={item.id}
                    >



                      <img
                        src={item.image}
                        alt={item.name}
                      />


                      <div className="cart-item-details">

                        <h3>
                          {item.name}
                        </h3>

                        <p>
                          {formatPrice(
                            item.price
                          )}
                        </p>




                        <div className="quantity">



                          <button
                            onClick={() =>
                              decreaseQuantity(
                                item.id
                              )
                            }
                          >
                            -
                          </button>




                          <span>
                            {item.quantity}
                          </span>




                          <button
                            onClick={() =>
                              increaseQuantity(
                                item.id
                              )
                            }

                            disabled={
                              item.quantity >=
                              item.stock
                            }
                          >
                            +
                          </button>

                        </div>



                        <button
                          className="remove"

                          onClick={() =>
                            removeFromCart(
                              item.id
                            )
                          }
                        >
                          Remove
                        </button>

                      </div>

                    </div>

                  )
                )}




                <div className="cart-total">

                  <h3>
                    Total:{" "}
                    {formatPrice(
                      cartTotal
                    )}
                  </h3>




                  <button
                    className="checkout"

                    onClick={() =>
                      alert(
                        "Checkout is ready for the next step!"
                      )
                    }
                  >
                    Checkout
                  </button>

                </div>

              </>

            )}

          </div>

        </div>

      )}

    </div>
  );
}




ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>
    <App />
  </React.StrictMode>

);