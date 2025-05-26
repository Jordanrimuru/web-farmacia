// src/components/ClientManager.js
import React, { useState } from 'react';
import ClientCard from './ClientCard';
import ClientForm from './ClientForm';

const ClientManager = ({ clients, onAddClient }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-800">Clientes</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded shadow"
        >
          + Agregar Cliente
        </button>
      </div>
      {showForm && (
        <ClientForm
          onAdd={client => {
            onAddClient(client);
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {clients.map(client => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </div>
  );
};

export default ClientManager;