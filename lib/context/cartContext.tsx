'use client';

import React, {
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import Cookies from 'js-cookie';
import { ProductType } from '../Types';

interface CartContextProps {
  cartItems: any[];
  setCartItems: SetStateAction<any>;
  addToCart: (item: any) => void;
  removeFromCart: (item: any) => void;
  clearCart: () => void;
  getCartTotal: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems') || '{}')
      : []
  );

  const addToCart = (item: ProductType) => {
    const isItemInCart = cartItems.find(
      (cartItem: ProductType) => cartItem._id === item._id
    ); // check if the item is already in the cart

    if (isItemInCart) {
      setCartItems(
        cartItems.map(
          (
            cartItem: ProductType // if the item is already in the cart, increase the quantity of the item
          ) =>
            cartItem._id === item._id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem // otherwise, return the cart item
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]); // if the item is not in the cart, add the item to the cart
    }
  };
  const removeFromCart = (item: ProductType) => {
    const isItemInCart = cartItems.find(
      (cartItem: ProductType) => cartItem._id === item._id
    );

    if (isItemInCart.quantity === 1) {
      setCartItems(
        cartItems.filter((cartItem: ProductType) => cartItem._id !== item._id)
      );
    } else {
      setCartItems(
        cartItems.map((cartItem: ProductType) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total: any, item: any) => total + item.price * item.quantity,
      0
    );
  };

  useEffect(() => {
    const data = localStorage.getItem('cartItems');
    if (data) {
      setCartItems(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]); // Include cartItems as a dependency here

  const contextValue: CartContextProps = {
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children} {/* This is where the children prop is used */}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};
