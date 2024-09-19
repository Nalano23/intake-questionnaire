"use client";

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '../../utils/users';

const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch(`/api/login`);
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }
      const data: User[] = await response.json();
      const user: User = data.find((user) => user.username === username && user.password == password);
      
      if (user) {
        localStorage.clear();
        if (user.role === 'admin') {
          localStorage.setItem('admin', JSON.stringify(user));
          router.push('/admin');
        } else {
          localStorage.setItem('user', JSON.stringify(user));
          router.push('/questionnaires');
        }
      } else {
        setError('Username or password not found');
      }
    } catch(error) {
        setError('Failed to fetch user details');
        console.error('Fetch error:', error);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError('');
              }}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
}

export default Login
