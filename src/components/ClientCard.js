import React from 'react';

const ClientCard = ({ client }) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <h3 className="font-medium text-lg">{client.name}</h3>
      <p className="text-gray-600">{client.email}</p>
      <p className="text-gray-600">{client.phone}</p>
    </div>
  );
};

export default ClientCard;