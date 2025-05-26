import React from 'react';

const QuickSaleButton = ({ product, onSale }) => {
  return (
    <button 
      onClick={() => onSale(product.id)}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      Vender {product.name}
    </button>
  );
};

export default QuickSaleButton;