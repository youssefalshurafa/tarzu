'use client';

import React, {
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import Cookies from 'js-cookie';

interface CartContextProps {
  cart: any[];
  setCart: SetStateAction<any>;
  addToCart: (updatedProduct: any) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (updatedProduct: any) => {
    const getCookie = Cookies.get('cart');
    if (getCookie?.length) {
      //@ts-ignore
      setCart(JSON.parse(getCookie));
    }
    const newCart = [...cart, updatedProduct];
    setCart(newCart);
    Cookies.set('cart', JSON.stringify(newCart));
  };

  const contextValue: CartContextProps = {
    cart,
    setCart,
    addToCart,
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
