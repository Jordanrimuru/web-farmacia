import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Usuario y contraseña son requeridos');
      return;
    }
    setError('');
    onLogin(username, password);
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl border border-blue-100">
      <div className="flex flex-col items-center mb-6">
        <div className="bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center mb-2 shadow-lg">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 className="text-3xl font-extrabold text-blue-700">PharmaSoft</h2>
        <span className="text-gray-500 text-sm mt-1">Acceso al sistema</span>
      </div>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
            placeholder="Ej: farmacia"
            autoFocus
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
            placeholder="Ej: farma123"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition-colors"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default LoginForm;