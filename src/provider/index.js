import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { addToCart, deleteCart, getAllCarts } from "../api/site";
import { getProductDetailAPI } from "../api/shop";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [userID, setUserID_] = useState(localStorage.getItem("userID"));
  const [cart, setCart_] = useState(JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : []);

  // Function to set the authentication token
  const setToken = (newToken) => {
    if(!newToken) {
      localStorage.removeItem('token');
    }else {
      setToken_(newToken);
    }
  };

  const setUserID = (newUserID) => {
    if(!newUserID) {
      localStorage.removeItem('userID');
    }else {
      setUserID_(newUserID);
    }
  };

  const setCart = (newCart) => {
    console.log(newCart);
    if(newCart.length === 0) {
      localStorage.removeItem('cart');
    }
    setCart_(newCart);
  };

  const addItemToCart = async (newItem) => {
    const res = (await addToCart(newItem)).data;
    const newItemData = (await getProductDetailAPI(newItem.productId)).data;

    const isItemInCart = cart.find((cartItem) => cartItem.productId === newItem.productId);

    if(isItemInCart) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.productId === newItem.productId
          ? { ...cartItem, quantity: cartItem.quantity + newItem.quantity }
          : cartItem);
      setCart(updatedCart);
      // localStorage.setItem("cart", JSON.stringify(updatedCart));
    }else {
      const newItemDetail = {
        ...res,
        image: newItemData.image,
        discount: newItemData.discount,
        name: newItemData.name,
        price: newItemData.price
      }
      setCart([...cart, newItemDetail]);
      // localStorage.setItem("cart", JSON.stringify([...cart, newItemDetail]));
    }
  };

  const deleteItemFromCart = async (itemID) => {
    const res = await deleteCart(itemID);
    console.log(res);
    setCart(cart.filter((cartItem) => cartItem.id !== itemID))
  };

  const fetchData = async() => {
      try {
          const allCartsData = await getAllCarts();
          let userCart = allCartsData.filter((cart) => cart.userId === userID);
          userCart = await Promise.all(userCart.map(async (cart) => {
              const product = (await getProductDetailAPI(cart.productId)).data;
              return {
                  ...cart,
                  image: product.image,
                  discount: product.discount,
                  price: product.price,
                  name: product.name
              }
          }));
          setCart(userCart);
      }
      catch(error) {
          console.log(error)
      }
  }

  useEffect(() => {
    if (token) {
      localStorage.setItem('token',token);
      localStorage.setItem('userID',userID);
      fetchData();
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('userID');
      localStorage.removeItem('cart');
    }
  }, [token, userID]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart])

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      userID,
      setUserID,
      cart, 
      setCart,

      addItemToCart,
      deleteItemFromCart
    }),
    [token, userID, cart]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;