import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/authContext';

const Signup = () => {
  const { signup } = useContext(AuthContext)
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();
    await signup(username, email, password, navigate);
  }

  return (
    <div className='h-[calc(100vh-80px)] text-white flex items-center justify-center'>
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded cursor-pointer"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link to="/" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
