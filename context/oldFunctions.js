const handleQtItemCart = (id, size, value) => {
  foundProduct = cartItems.find(
    (item) => item._id === id && item.size === size
  );
  index = cartItems.findIndex((item) => item._id === id && item.size === size);
  if (value === "inc") {
    let newCart = cartItems.map((item) => {
      if (item._id === id && item.size === size)
        item.quantity = item.quantity + 1;
      return item;
    });
    setCartItems(newCart);
    setTotalPrice((prevValue) => prevValue + foundProduct.price);
    setTotalQuantities((prevQt) => prevQt + 1);
  } else if (value === "dec") {
    if (foundProduct.quantity > 1) {
      let newCart = cartItems.map((item) => {
        if (item._id === id && item.size === size)
          item.quantity = item.quantity - 1;
        return item;
      });
      setCartItems(newCart);
      setTotalPrice((prevValue) => prevValue - foundProduct.price);
      setTotalQuantities((prevQt) => prevQt - 1);
    }
  }
};

const removeItem = async (item) => {
  foundProduct = cartItems.findIndex(
    (item) => item._id === product._id && item.size === product.size
  );
  const newCartItems = cartItems.filter(
    (item) => cartItems.indexOf(item) !== foundProduct
  );
  setTotalPrice((prevValue) => prevValue - product.price * product.quantity);
  setTotalQuantities((prevQt) => prevQt - product.quantity);
  setCartItems(newCartItems);
};

const incQty = () => {
  setQty((prevState) => prevState + 1);
};
const decQty = () => {
  setQty((prevState) => {
    if (prevState - 1 < 1) return 1;
    return prevState - 1;
  });
};

const onAddItem = async (product, quantity, sizeJersey) => {
  const hasUser = cartItems.find(
    (item) => item._id === product._id && item.size === sizeJersey
  );
  if (hasUser) {
    const updateCart = cartItems.map((item) => {
      if (item._id === product._id && item.size === sizeJersey)
        item.quantity = item.quantity + 1;
      return item;
    });
    setCartItems(updateCart);
    setQty(1);
  } else {
    product.quantity = quantity;
    setCartItems([...cartItems, { ...product, size: sizeJersey }]);
  }
  setTotalPrice((prevState) => prevState + product.price * quantity);
  setTotalQuantities((prevTotalQt) => prevTotalQt + quantity);
};
