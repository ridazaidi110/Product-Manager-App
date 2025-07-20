import React, { createContext, useEffect, useState } from 'react';
import axios from './axios';

export const ProductContext = createContext();

function Context(props) {
  const [products, setProducts] = useState(() => { // lazy initialization
    try {
      const data = JSON.parse(localStorage.getItem('products'));
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Invalid JSON in localStorage for 'products':", error);
      return [];
    }
  });

  const getProducts = async () => {
    try {
      const { data } = await axios.get('/products');
      const validData = Array.isArray(data)
        ? data.filter(p => p && typeof p === 'object' && p.id)
        : [];
      setProducts(validData);
      localStorage.setItem('products', JSON.stringify(validData));
    } catch (error) {
      console.log('error fetching products:', error);
    }
  };

 useEffect(() => {
  const localData = localStorage.getItem("products");
  let parsedData = [];
  try {
    parsedData = localData ? JSON.parse(localData) : [];
  } catch (e) {
    parsedData = [];
  }
  if (!parsedData || !Array.isArray(parsedData) || parsedData.length === 0) {
    getProducts();
  }
}, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {props.children}
    </ProductContext.Provider>
  );
}

export default Context;
