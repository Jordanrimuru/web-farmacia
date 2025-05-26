import React, { useState } from 'react';

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(product || {
    name: '',
    lab: '',
    requiresPrescription: false,
    stock: 0,
    minStock: 0,
    price: 0,
    expiryDate: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Nombre requerido';
    if (!formData.lab) newErrors.lab = 'Laboratorio requerido';
    if (formData.stock < 0) newErrors.stock = 'Stock no puede ser negativo';
    if (formData.minStock < 0) newErrors.minStock = 'Stock mínimo no puede ser negativo';
    if (formData.price <= 0) newErrors.price = 'Precio debe ser mayor a 0';
    if (!formData.expiryDate) newErrors.expiryDate = 'Fecha de vencimiento requerida';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">
        {product ? 'Editar Medicamento' : 'Nuevo Medicamento'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Nombre del Medicamento*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        
        <div>
          <label className="block text-gray-700 mb-1">Laboratorio*</label>
          <input
            type="text"
            name="lab"
            value={formData.lab}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg ${errors.lab ? 'border-red-500' : ''}`}
          />
          {errors.lab && <p className="text-red-500 text-sm mt-1">{errors.lab}</p>}
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            name="requiresPrescription"
            checked={formData.requiresPrescription}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-gray-700">Requiere receta médica</label>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Stock Actual*</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg ${errors.stock ? 'border-red-500' : ''}`}
              min="0"
            />
            {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Stock Mínimo*</label>
            <input
              type="number"
              name="minStock"
              value={formData.minStock}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg ${errors.minStock ? 'border-red-500' : ''}`}
              min="0"
            />
            {errors.minStock && <p className="text-red-500 text-sm mt-1">{errors.minStock}</p>}
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 mb-1">Precio (PEN)*</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg ${errors.price ? 'border-red-500' : ''}`}
            min="0.01"
            step="0.01"
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>
        
        <div>
          <label className="block text-gray-700 mb-1">Fecha de Vencimiento*</label>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg ${errors.expiryDate ? 'border-red-500' : ''}`}
          />
          {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {product ? 'Actualizar Medicamento' : 'Agregar Medicamento'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

// DONE