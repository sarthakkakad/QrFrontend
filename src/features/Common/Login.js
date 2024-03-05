// LoginPage.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserAsync, selectUser } from '../counter/counterSlice';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const loading = false;
  const user = useSelector(selectUser)
  const error = useSelector((state) => state.counter.error);

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    dispatch(checkUserAsync(userData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
        {user && <Navigate to="scanner"/>}
      <div className="bg-gray-100 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
