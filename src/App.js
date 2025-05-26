import React, { useState } from 'react';
import { products as initialProducts } from './mock/products';
import { clients as initialClients } from './mock/clients';
import { users } from './mock/users';
import InventoryList from './components/InventoryList';
import SalesDashboard from './components/SalesDashboard';
import ClientManager from './components/ClientManager';
import LoginForm from './components/LoginForm';

const App = () => {
  const [currentProducts, setCurrentProducts] = useState(initialProducts);
  const [currentClients, setCurrentClients] = useState(initialClients);
  const [currentSales, setCurrentSales] = useState([]);
  const [activeTab, setActiveTab] = useState('inventory');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);


  const handleAddClient = (clientData) => {
    const newId = Math.max(...currentClients.map(c => c.id), 100) + 1;
    setCurrentClients([...currentClients, { ...clientData, id: newId }]);
  };


  const handleLogin = (username, password) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(user);
    } else {
      alert('Credenciales incorrectas');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleSale = (newSale) => {
    // Actualizar stock
    const updatedProducts = currentProducts.map(product => {
      if (newSale.products.includes(product.id)) {
        return { ...product, stock: product.stock - 1 };
      }
      return product;
    });

    setCurrentProducts(updatedProducts);
    setCurrentSales([...currentSales, newSale]);
  };

  const handleEditProduct = (productData, productId) => {
    if (productId) {
      setCurrentProducts(currentProducts.map(p => 
        p.id === productId ? { ...productData, id: productId } : p
      ));
    } else {
      const newId = Math.max(...currentProducts.map(p => p.id)) + 1;
      setCurrentProducts([...currentProducts, { ...productData, id: newId }]);
    }
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      setCurrentProducts(currentProducts.filter(p => p.id !== productId));
    }
  };

  if (!isLoggedIn) {
  return <LoginForm onLogin={handleLogin} />;
}

return (
  <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 p-0">
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-600 to-green-400 rounded-full w-14 h-14 flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 0v4m0 8v4m-4-4h8" />
            </svg>
          </div>
          <h1 className="text-4xl font-black text-blue-700 tracking-tight drop-shadow">Nova Salud</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            <span className="font-semibold text-blue-700">Conectado:</span> <span className="font-medium">{currentUser?.name}</span>
          </span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-lg font-semibold shadow hover:from-blue-600 hover:to-green-500 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-8">
        <button 
          onClick={() => setActiveTab('inventory')}
          className={`px-6 py-2 rounded-xl font-semibold shadow transition-all ${
            activeTab === 'inventory'
              ? 'bg-gradient-to-r from-blue-600 to-green-400 text-white scale-105'
              : 'bg-white text-blue-700 border border-blue-100 hover:bg-blue-50'
          }`}
        >
          Inventario
        </button>
        <button 
          onClick={() => setActiveTab('sales')}
          className={`px-6 py-2 rounded-xl font-semibold shadow transition-all ${
            activeTab === 'sales'
              ? 'bg-gradient-to-r from-blue-600 to-green-400 text-white scale-105'
              : 'bg-white text-blue-700 border border-blue-100 hover:bg-blue-50'
          }`}
        >
          Ventas
        </button>
        <button 
          onClick={() => setActiveTab('clients')}
          className={`px-6 py-2 rounded-xl font-semibold shadow transition-all ${
            activeTab === 'clients'
              ? 'bg-gradient-to-r from-blue-600 to-green-400 text-white scale-105'
              : 'bg-white text-blue-700 border border-blue-100 hover:bg-blue-50'
          }`}
        >
          Clientes
        </button>
      </div>

      {/* Main Content */}
      <div className="bg-white/90 rounded-3xl shadow-2xl p-8 min-h-[60vh]">
        {activeTab === 'inventory' && (
          <InventoryList
            products={currentProducts}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            isAdmin={currentUser?.role === 'admin'}
          />
        )}
        {activeTab === 'sales' && (
          <SalesDashboard 
            products={currentProducts} 
            onSale={handleSale} 
            clients={currentClients} 
          />
        )}
        {activeTab === 'clients' && (
          <ClientManager clients={currentClients} onAddClient={handleAddClient} />
        )}
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} PharmaSoft. Sistema de gestión para farmacias.
      </footer>
    </div>
  </div>
);
};

export default App;