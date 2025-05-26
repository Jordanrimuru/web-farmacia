import React, { useState } from 'react';

const SalesDashboard = ({ products, onSale, clients }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  const handleAddToSale = (product) => {
    if (product.stock > 0) {
      setSelectedProducts([...selectedProducts, product]);
    } else {
      alert('No hay suficiente stock de este producto');
    }
  };

  const handleRemoveFromSale = (index) => {
    setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
  };

  const handleCompleteSale = () => {
    if (selectedProducts.length === 0) return;

    const newSale = {
      id: Date.now(),
      date: new Date().toISOString(),
      products: selectedProducts.map(p => p.id),
      total: selectedProducts.reduce((sum, p) => sum + p.price, 0),
      clientId: selectedClient?.id || null
    };

    onSale(newSale);
    setSelectedProducts([]);
    setSelectedClient(null);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-extrabold text-blue-800 tracking-tight mb-2">Registro de Ventas</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(product => (
          <div
            key={product.id}
            className={`p-5 bg-white/90 border border-gray-200 rounded-2xl shadow-lg flex flex-col justify-between transition-all duration-200 ${
              product.stock > 0 ? 'hover:shadow-2xl hover:border-blue-200' : 'opacity-60'
            }`}
          >
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
            <div className="flex flex-col gap-2 mt-4">
              <span className="font-bold text-lg text-green-700">S/.{product.price}</span>
              <span className="text-sm text-gray-600">
                Stock: <span className="font-semibold text-gray-800">{product.stock}</span>
              </span>
              <button
                onClick={() => handleAddToSale(product)}
                disabled={product.stock <= 0}
                className={`mt-2 w-full py-2 rounded-lg text-sm font-semibold shadow transition-all ${
                  product.stock > 0
                    ? 'bg-gradient-to-r from-green-500 to-green-400 text-white hover:from-green-600 hover:to-green-500'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                {product.stock > 0 ? '+ Agregar' : 'Sin stock'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedProducts.length > 0 && (
        <div className="mt-8 p-6 bg-white/90 border border-blue-100 rounded-2xl shadow-xl">
          <h3 className="text-xl font-bold text-blue-700 mb-4">Resumen de Venta</h3>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Cliente</label>
            <select
              value={selectedClient?.id || ''}
              onChange={e => {
                const client = clients.find(c => c.id === Number(e.target.value));
                setSelectedClient(client || null);
              }}
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
            >
              <option value="">Seleccionar cliente (opcional)</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>
          <ul className="divide-y divide-blue-50">
            {selectedProducts.map((product, index) => (
              <li key={index} className="flex justify-between items-center py-2">
                <span>{product.name}</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-green-700">S/.{product.price}</span>
                  <button
                    onClick={() => handleRemoveFromSale(index)}
                    className="ml-2 px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 text-xs font-bold transition"
                    title="Quitar"
                  >
                    ×
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-3 border-t font-bold flex justify-between text-lg">
            <span>Total:</span>
            <span>${selectedProducts.reduce((sum, p) => sum + p.price, 0)}</span>
          </div>
          <button
            onClick={handleCompleteSale}
            className="mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-lg font-bold shadow-lg hover:from-blue-700 hover:to-blue-600 transition-all text-lg tracking-wide"
          >
            Confirmar Venta
          </button>
        </div>
      )}
    </div>
  );
};

export default SalesDashboard;