import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_PROFILE } from '../gql_api_operations/queries';
import { TailSpin } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Profile = () => {
  const navigate = useNavigate();
  const { loading, data, error } = useQuery(GET_USER_PROFILE, {
    fetchPolicy: 'cache-and-network',
  });

  if (!localStorage.getItem('token')) {
    navigate('/login');
    setTimeout(() => {
      toast.error(error.message);
    }, 1000);
  }

  if (loading)
    return (
      <div className='flex flex-col gap-2 items-center bg-white mt-12'>
        <TailSpin width='100' strokeColor='#e5e7eb' strokeWidth='1' />
      </div>
    );

  if (error) {
    toast.error(error.message);
  }

  return (
    <>
      <div className='relative max-w-md mx-auto md:max-w-2xl min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-24'>
        <div className='px-6'>
          <div className='flex flex-wrap justify-center'>
            <div className='w-full flex justify-center'>
              <div className='relative'>
                <img
                  src={`https://robohash.org/${data.user.firstName}.png`}
                  className='shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]'
                  alt='ProfileImage'
                />
              </div>
            </div>
            <div className='w-full text-center mt-20'>
              <div className='flex justify-center lg:pt-4 pt-8 pb-0'></div>
            </div>
          </div>
          <div className='text-center mt-2'>
            <h3 className='text-2xl text-slate-700 font-bold leading-normal mb-1'>
              {`${data.user.firstName} ${data.user.lastName}`}
            </h3>
            <div className='text-xs mt-0 mb-2 text-slate-400 font-bold uppercase'>
              <i className='fas fa-map-marker-alt mr-2 text-slate-400 opacity-75'></i>
              {data.user.email}
            </div>
          </div>
          <div className='mt-6 py-6 border-t border-slate-200'>
            <div className='flex flex-wrap'>
              {data.user.quotes &&
                data.user.quotes.map((quote) => (
                  <div className='w-full px-4'>
                    <div className='flex p-2'>
                      <div className='card h-42 p-3 overflow-hidden bg-white border-l-4 border-red-400'>
                        <p className='text-sm font-light leading-relaxed text-slate-600 mb-4'>
                          {quote.name}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <Toaster position='top-right' reverseOrder={false} />
    </>
  );
};

export default Profile;
