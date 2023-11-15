'use client';

import React, { ReactNode, createContext, useContext, useState } from 'react';

interface CartContextProps {
  cart: any[];
  addToCart: (updatedProduct: any) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = async (updatedProduct: any) => {
    setCart(updatedProduct);
  };

  const contextValue: CartContextProps = {
    cart,
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
