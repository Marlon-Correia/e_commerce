import React, { useState } from "react";
import Link from "next/link";

import { urlFor } from "../lib/client";

const Product = ({ product }) => {
  const [index, setIndex] = useState(0);
  const handleImg = () => {
    const verify = index === 0 ? 1 : 0;
    setIndex(verify);
  };

  return (
    <div>
      <Link href={`/product/${product.slug.current}`}>
        <div className="product-card">
          <img
            onMouseEnter={handleImg}
            onMouseOut={handleImg}
            src={urlFor(product.image && product.image[index])}
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-text">{product.name}</p>
          <p className="product-text">R${product.price},00</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
