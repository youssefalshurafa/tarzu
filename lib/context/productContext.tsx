'use client';

import React, { ReactNode, createContext, useContext, useState } from 'react';
import { getCategory } from '../actions/category.action';

interface ProductContextProps {
  categories: any[];
  getCategories: () => void;
}

const ProductContext = createContext<ProductContextProps | undefined>(
  undefined
);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [categories, setCategories] = useState<any[]>([]);

  const getCategories = async () => {
    const allCategories = await getCategory();
    setCategories(allCategories.data);
  };

  const contextValue: ProductContextProps = {
    categories,
    getCategories,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children} {/* This is where the children prop is used */}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};
