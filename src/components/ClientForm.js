// src/components/ClientForm.js
import React, { useState } from 'react';

const ClientForm = ({ onAdd, onCancel }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (form.name && form.email && form.phone) {
      onAdd(form);
      setForm({ name: '', email: '', phone: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
      <input name="phone" placeholder="Teléfono" value={form.phone} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">Agregar</button>
        <button type="button" onClick={onCancel} className="bg-gray-200 px-4 py-1 rounded">Cancelar</button>
      </div>
    </form>
  );
};

export default ClientForm;