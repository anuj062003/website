import React from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault(); // ✅ prevent default form submission

    try {
      const response = await axios.post(`${backendUrl}/api/user/admin`, {
        email,
        password,
      });

      // ✅ Assuming the response contains a token in response.data.token
      const { token } = response.data;

      if (token) {
        setToken(token); // Store token in state
        localStorage.setItem('authToken', token); // Persist token (optional)
        toast.success('Login successful!');
      } else {
        toast.error('Invalid response from server.');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'An error occurred during login.');
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-6 text-center'>Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className='mb-4'>
            <label className='text-sm font-medium text-gray-700 mb-2 block'>Email Address</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500'
              type='email'
              placeholder='your@gmail.com'
              required
              autoComplete='email'
            />
          </div>
          <div className='mb-4'>
            <label className='text-sm font-medium text-gray-700 mb-2 block'>Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500'
              type='password'
              placeholder='Enter your password'
              required
              autoComplete='current-password'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-200'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
