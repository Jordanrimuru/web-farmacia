import React, { useState } from 'react';
import InventoryAlert from './InventoryAlert';
import ProductForm from './ProductForm';

const InventoryList = ({ products, onEdit, onDelete, isAdmin }) => {
  const [showForm, setShowForm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setCurrentProduct(null);
    setShowForm(true);
  };

  const handleSubmit = (productData) => {
    onEdit(productData, currentProduct?.id);
    setShowForm(false);
  };

  // ...existing code...
return (
  <div className="space-y-8">
    {isAdmin && (
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-extrabold text-blue-800 tracking-tight">Inventario de Farmacia</h2>
        <button
          onClick={handleAddNew}
          className="px-5 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-semibold shadow hover:from-green-700 hover:to-green-600 transition-all"
        >
          + Agregar Medicamento
        </button>
      </div>
    )}

    {showForm ? (
      <ProductForm
        product={currentProduct}
        onSubmit={handleSubmit}
        onCancel={() => setShowForm(false)}
      />
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div
            key={product.id}
            className="bg-white/90 border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow p-6 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-lg text-blue-700">{product.name}</h3>
                <p className="text-gray-500 font-medium">{product.lab}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {product.requiresPrescription ? (
                    <span className="inline-flex items-center gap-1">
                      <span className="text-pink-600">💊</span> Requiere receta
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1">
                      <span className="text-green-600">🆓</span> Venta libre
                    </span>
                  )}
                  <span className="mx-2">|</span>
                  <span className="inline-flex items-center gap-1">
                    <span className="text-blue-500">📅</span> Vence: {product.expiryDate}
                  </span>
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <InventoryAlert product={product} />
                <span className="font-bold text-lg text-green-700">S/.{product.price}</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-gray-600">
                Stock: <span className="font-semibold text-gray-800">{product.stock}</span>
              </span>
              {isAdmin && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="px-4 py-1 bg-yellow-400 text-white rounded-lg font-semibold hover:bg-yellow-500 text-sm shadow transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
                    className="px-4 py-1 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 text-sm shadow transition"
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
};

export default InventoryList;