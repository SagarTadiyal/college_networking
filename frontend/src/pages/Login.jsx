import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/authContext';


const Login = () => {
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function submitHandler(e) {
    e.preventDefault();
    await login(email, password, navigate)
    navigate("/login")
  }
  return (
    <div className='h-[calc(100vh-80px)] text-white flex items-center justify-center'>

      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form
          onSubmit={submitHandler}
        >
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input

              onChange={(e => setEmail(e.target.value))}
              type="email"
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input

              onChange={(e => setPassword(e.target.value))}
              type="password"
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded cursor-pointer"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
