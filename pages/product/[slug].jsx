import React, { useState } from "react";
import { urlFor, client } from "../../lib/client";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { Product, ProductCarousel } from "../../components";
import { useCart } from "../../context/StateContext";

const ProductDetails = ({ productInd, products }) => {
  const { image, name, loading, price } = productInd;
  const [index, setIndex] = useState(0);
  const [sizeJer, setSizeJer] = useState();
  const { qty, incQty, decQty, onAddItem, setShowCart } = useCart();
  const handleBuyNow = () => {
    onAddItem(productInd, qty);
    setShowCart(true);
  };
  const handleAdd = (e) => {
    e.setAttribute("disabled", true);
    onAddItem(productInd, qty, sizeJer);
    setTimeout(() => {
      e.removeAttribute("disabled");
    }, 2000);
  };
  return (
    <div>
      <div className="product-detail-container">
        <div className="product-detail-images">
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                src={urlFor(item)}
                key={i}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
          <div className="image-container">
            <img
              className="product-detail-image"
              src={urlFor(image && image[index])}
            />
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <p className="price">
            R${price.toFixed(2).toString().replace(".", ",")}
          </p>
          <div className="quantity">
            <h3>Quantidade:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="size">
            <h3>Tamanho:</h3>
            <select id="select" onChange={(e) => setSizeJer(e.target.value)}>
              <option selected>Selecionar...</option>
              {productInd.size?.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={(e) => handleAdd(e.target)}
            >
              {loading ? "AAAAAAAA" : "Add to Cart"}
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>Produtos recomendados para você</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <ProductCarousel product={item} key={item._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const productsQuery = '*[_type == "product"] { slug {current} }';
  const products = await client.fetch(productsQuery);
  const paths = products.map((product) => ({
    params: { slug: product.slug.current },
  }));

  return { paths, fallback: "blocking" };
}
export async function getStaticProps({ params: { slug } }) {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const productInd = await client.fetch(query);
  const products = await client.fetch(productsQuery);
  return {
    props: { productInd, products },
  };
}

export default ProductDetails;
