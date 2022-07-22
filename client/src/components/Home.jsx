import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_QUOTES } from '../gql_api_operations/queries';
import toast, { Toaster } from 'react-hot-toast';
import { TailSpin } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_ALL_QUOTES, {
    fetchPolicy: 'cache-and-network',
  });

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
    <div className='flex flex-col gap-2 items-center bg-white mt-12'>
      {!data ? (
        <div className='border-gray-300 border-2 rounded-xl w-[40rem] py-7 px-5'>
          <div className='grid grid-cols-6 gap-3'>
            <div className='col-span-4'>
              <p className='text-gray-500 mt-4'>No Quote Available</p>
            </div>
          </div>
        </div>
      ) : (
        data.quotes &&
        data.quotes.map((quoteData) => (
          <div
            className='border-gray-300 border-2 rounded-xl w-[40rem] py-7 px-5'
            key={quoteData._id}
          >
            <div className='grid grid-cols-6 gap-3'>
              <div className='col-span-4'>
                <p
                  className='text-gray-700 font-bold cursor-pointer hover:text-sky-700'
                  onClick={() => navigate(`/user/profile/${quoteData.by._id}`)}
                >
                  {quoteData.by.firstName}
                </p>
                <p className='text-gray-500 mt-4'>{quoteData.name}</p>
              </div>
              <div className='w-full flex justify-center'>
                <div className='col-span-2'>
                  <div className='relative'>
                    <img
                      src={`https://robohash.org/${quoteData.by.firstName}.png`}
                      alt='userImage'
                      className='shadow-xl rounded-full align-middle border-none absolute -m-5 max-w-[100px]'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      <Toaster position='top-right' reverseOrder={false} />
    </div>
  );
};

export default Home;
