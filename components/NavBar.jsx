import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineShopping, AiOutlineSearch } from "react-icons/ai";
import { useCart } from "../context/StateContext";
import { Cart } from "./";
import kings from "../public/images/sac.jpg";
import Image from "next/image";
import Router from "next/router";

const NavBar = () => {
  const {
    totalQuantities,
    setShowCart,
    showCart,
    setSearch,
    search,
    cartItems,
  } = useCart();
  const router = Router;
  const handleSearch = () => {
    if (search.length > 0) router.push(`/search/${search}`);
  };

  return (
    <div className="navbar-container">
      <Link href="/">
        <div className="logo">
          <Image src={kings} />
        </div>
      </Link>
      <div className="navbar-buttons">
        <div className="navbar-search">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <AiOutlineSearch
            size={22}
            style={{ marginRight: "4px", cursor: "pointer" }}
            onClick={handleSearch}
          />
        </div>
        <button
          type="button"
          className="cart-icon"
          onClick={() => setShowCart(true)}
        >
          <AiOutlineShopping />
          <span className="cart-item-qty">{cartItems.length}</span>
        </button>
      </div>
      {showCart ? <Cart /> : null}
    </div>
  );
};

export default NavBar;
