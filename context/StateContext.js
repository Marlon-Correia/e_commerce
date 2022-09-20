import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

const cartContext = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState(1);
  const [search, setSearch] = useState();

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    const req = await axios.get(
      "https://gxabqs5gsj.execute-api.us-east-1.amazonaws.com/dev_v3/jerseys"
    );
    setCartItems(req.data.body);
    let priceN = 0;
    req.data.body.map((item) => {
      priceN += item.quantity * item.price;
    });
    setTotalPrice(priceN);
  };

  const onAddItem = async (product, quantity, sizeJersey) => {
    if (sizeJersey !== undefined) {
      const hasJersey = cartItems.find(
        (item) => item.modelId === product._id && item.size === sizeJersey
      );
      if (hasJersey) {
        updatingJerseyQt(hasJersey, quantity, true);
      } else {
        setLoading(true);
        const img = product.image[0].asset._ref;
        const newImg = img
          .replace(
            "image-",
            "https://cdn.sanity.io/images/wyt08z5i/production/"
          )
          .replace("-jpg", ".jpg");
        await axios.post(
          "https://gxabqs5gsj.execute-api.us-east-1.amazonaws.com/dev_v3/jersey",
          {
            modelId: product._id,
            name: product.name,
            url: newImg,
            price: product.price,
            quantity: quantity,
            size: sizeJersey,
            slug: product.slug.current,
          }
        );
        toast.success(`${qty} ${product.name} foram adicionados ao carrinho!`);
      }
      getItems();
      setLoading(false);
    } else {
      toast.error("Preencha o campo de tamanho!");
    }
  };

  const updatingJerseyQt = async (item, quantity, payload) => {
    setLoading(true);
    const newQuantity =
      payload === true ? item.quantity + quantity : item.quantity - quantity;
    await axios.patch(
      "https://gxabqs5gsj.execute-api.us-east-1.amazonaws.com/dev_v3/jersey",
      {
        newQt: newQuantity,
        product: item,
      }
    );
    const message =
      payload === true
        ? `${quantity} ${item.name} foram adicionados ao carrinho!`
        : `${quantity} ${item.name} foi removido do carrinho!`;
    toast.success(message);
    getItems();
    setLoading(false);
  };

  const removeItem = async (item) => {
    setLoading(true);
    await axios.delete(
      "https://gxabqs5gsj.execute-api.us-east-1.amazonaws.com/dev_v3/jersey",
      {
        data: {
          productId: item.productId,
        },
      }
    );
    getItems();
    setLoading(false);
  };

  const handleQtItemCart = (item, value) => {
    if (value === "dec" && item.quantity > 1) {
      updatingJerseyQt(item, 1, false);
    } else if (value === "inc") {
      updatingJerseyQt(item, 1, true);
    }
    getItems();
  };

  const incQty = () => {
    setQty((prevState) => prevState + 1);
    console.log(cartItems);
  };
  const decQty = () => {
    setQty((prevState) => {
      if (prevState - 1 < 1) return 1;
      return prevState - 1;
    });
  };

  return (
    <cartContext.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        qty,
        onAddItem,
        removeItem,
        setTotalPrice,
        setCartItems,
        search,
        setSearch,
        incQty,
        decQty,
        handleQtItemCart,
        loading,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export const useCart = () => useContext(cartContext);
