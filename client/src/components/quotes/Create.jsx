import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';
import toast, { Toaster } from 'react-hot-toast';
import { useMutation } from '@apollo/client';
import { CREATE_QUOTE } from '../../gql_api_operations/mutations';

const CreateQuote = () => {
  const navigate = useNavigate();
  const [creatingQuote, { loading, data, error }] = useMutation(CREATE_QUOTE, {
    refetchQueries: ['getAllQuotes', 'profileData'],
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (data && data.quote) {
      toast.success(`${data.quote}`);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data && data.quote]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <div className='flex justify-center mt-24'>
      <div className='w-full max-w-md'>
        <h1 className='flex justify-center text-3xl'>Create Quote</h1>

        <Formik
          initialValues={{
            name: '',
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().max(1000).required('Quote name is required'),
          })}
          onSubmit={(values, { resetForm }) => {
            creatingQuote({
              variables: {
                name: values.name,
              },
            });

            resetForm({ values: '' });
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
            values,
          }) => (
            <form
              onSubmit={handleSubmit}
              noValidate
              autoComplete='off'
              className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
            >
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                  Quote Name
                </label>
                <input
                  id='name'
                  name='name'
                  type='text'
                  placeholder='Quote Name'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  className={classNames(
                    'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
                    [errors.name && touched.name && 'border-2 border-rose-600']
                  )}
                />

                <div className='text-sm mt-1 text-red-500'>
                  {errors.name && touched.name ? (
                    <div>{errors.name}</div>
                  ) : null}
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <button
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  type='submit'
                  disabled={loading}
                >
                  {!loading && 'Save'}
                  {loading && 'Saving ....'}
                </button>
              </div>
            </form>
          )}
        </Formik>
        <p className='text-center text-gray-500 text-xs'>
          &copy;2020 Talha Zulfiqar. All rights reserved.
        </p>
      </div>
      <Toaster position='top-right' reverseOrder={false} />
    </div>
  );
};

export default CreateQuote;
