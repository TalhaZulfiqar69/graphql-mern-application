import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  return (
    <nav className='bg-gray-800'>
      <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
        <div className='relative flex items-center justify-between h-16'>
          <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'></div>
          <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
            <div
              className='flex-shrink-0 flex items-center cursor-pointer'
              onClick={() => navigate('/')}
            >
              <h1 className='text-2xl text-white hidden lg:block h-8 w-auto'>
                Graphql Mern App
              </h1>
            </div>
          </div>
          <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
            <div className='ml-3 relative'>
              <div>
                {token && (
                  <>
                    <span
                      className='text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer'
                      aria-current='page'
                      onClick={() => navigate('/profile')}
                    >
                      Profile
                    </span>
                    <span
                      className='text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer'
                      aria-current='page'
                      onClick={() => navigate('/create')}
                    >
                      Create Qoute
                    </span>
                    <span
                      className='text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer'
                      aria-current='page'
                      onClick={() => logout()}
                    >
                      Logout
                    </span>
                  </>
                )}

                {!token && (
                  <>
                    <span
                      className='text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer'
                      aria-current='page'
                      onClick={() => navigate('/login')}
                    >
                      Login
                    </span>
                    <span
                      className='text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer'
                      aria-current='page'
                      onClick={() => navigate('/register')}
                    >
                      Register
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
