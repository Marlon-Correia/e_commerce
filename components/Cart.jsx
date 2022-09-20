import React, { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";

import { useCart } from "../context/StateContext";
import getStripe from "../lib/getStripe";
import axios from "axios";
import { MoonLoader } from "react-spinners";

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    loading,
    cartItems,
    setShowCart,
    handleQtItemCart,
    removeItem,
  } = useCart();

  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await axios.post("/api/stripe", cartItems);
    if (response.statusCode === 500) return;
    const data = await response.data;
    toast.loading("Redirecting...");
    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
        </button>
        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={120} />
            <h3>Seu carrinho está vazio</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Comprando
              </button>
            </Link>
          </div>
        )}
        {loading ? (
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MoonLoader color="#662986" size={60} />
          </div>
        ) : (
          <div className="product-container">
            {cartItems.length >= 1 &&
              cartItems.map((item, i) => (
                <div className="product" key={i}>
                  <img src={item.url_image} className="cart-product-image" />
                  <div className="item-desc">
                    <div
                      className="flex-cart "
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        color: "#324d67",
                        fontSize: "20px",
                      }}
                    >
                      <h5>
                        <Link href={`/product/${item.slug}`}>{item.name}</Link>
                      </h5>
                      <h4>R${item.price}</h4>
                      <h4>Tamanho: {item.size}</h4>
                    </div>
                    <div className="flex">
                      <div>
                        <p className="quantity-desc">
                          <span
                            className="minus"
                            onClick={() => handleQtItemCart(item, "dec")}
                          >
                            <AiOutlineMinus />
                          </span>
                          <span className="num">{item.quantity}</span>
                          <span
                            className="plus"
                            onClick={() => handleQtItemCart(item, "inc")}
                          >
                            <AiOutlinePlus />
                          </span>
                        </p>
                      </div>
                      <button
                        type="button"
                        className="remove-item"
                        onClick={() => removeItem(item)}
                      >
                        <TiDeleteOutline />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
        {cartItems.length >= 1 && !loading && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>R${totalPrice.toFixed(2).toString().replace(".", ",")}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Pagar com Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
