import React from 'react';

const InventoryAlert = ({ product }) => {
  const alertLevel = product.stock < product.minStock ? 
    "bg-red-100 text-red-800" : 
    product.stock < product.minStock * 1.5 ? 
    "bg-yellow-100 text-yellow-800" : 
    "bg-green-100 text-green-800";

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${alertLevel}`}>
      {product.stock} en stock
    </span>
  );
};

export default InventoryAlert;