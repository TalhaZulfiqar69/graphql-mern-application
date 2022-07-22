import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';
import toast, { Toaster } from 'react-hot-toast';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../gql_api_operations/mutations';

const Register = () => {
  const navigate = useNavigate();

  const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER, {
    refetchQueries: ['getAllQuotes', 'profileData'],
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (data && data.user) {
      toast.success(
        `Congratulations ${data.user.firstName}. You account created successfully.`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data && data.user]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <div className='flex justify-center mt-24'>
      <div className='w-full max-w-md'>
        <h1 className='flex justify-center text-3xl'>Register</h1>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string()
              .max(255)
              .required('First name is required.'),
            lastName: Yup.string().max(255).required('Last name is required.'),
            email: Yup.string()
              .email('Email is invalid.')
              .max(255)
              .required('Email is required.'),
            password: Yup.string().max(255).required('Password is required.'),
          })}
          onSubmit={(values, { resetForm }) => {
            signupUser({
              variables: {
                newUser: values,
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
                  First Name
                </label>
                <input
                  id='firstName'
                  type='text'
                  name='firstName'
                  placeholder='First Name'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  className={classNames(
                    'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
                    [
                      errors.firstName &&
                        touched.firstName &&
                        'border-2 border-rose-600',
                    ]
                  )}
                />
                <div className='text-sm mt-1 text-red-500'>
                  {errors.firstName && touched.firstName ? (
                    <div>{errors.firstName}</div>
                  ) : null}
                </div>
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                  Last Name
                </label>
                <input
                  id='lastName'
                  type='text'
                  name='lastName'
                  placeholder='First Name'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  className={classNames(
                    'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
                    [
                      errors.lastName &&
                        touched.lastName &&
                        'border-2 border-rose-600',
                    ]
                  )}
                />
                <div className='text-sm mt-1 text-red-500'>
                  {errors.lastName && touched.lastName ? (
                    <div>{errors.lastName}</div>
                  ) : null}
                </div>
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                  Email
                </label>
                <input
                  id='email-address'
                  name='email'
                  type='email'
                  placeholder='Email address'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  className={classNames(
                    'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
                    [
                      errors.email &&
                        touched.email &&
                        'border-2 border-rose-600',
                    ]
                  )}
                />

                <div className='text-sm mt-1 text-red-500'>
                  {errors.email && touched.email ? (
                    <div>{errors.email}</div>
                  ) : null}
                </div>
              </div>
              <div className='mb-6'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                  Password
                </label>
                <input
                  id='password'
                  name='password'
                  type='password'
                  placeholder='password'
                  className={classNames(
                    'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
                    [
                      errors.password &&
                        touched.password &&
                        'border-2 border-rose-600',
                    ]
                  )}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                />
                <div className='text-sm mt-1 text-red-500'>
                  {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                  ) : null}
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <button
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  type='submit'
                  disabled={loading}
                >
                  {!loading && 'Sign Up'}
                  {loading && 'Loading ....'}
                </button>
                <span
                  className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer'
                  onClick={() => navigate('/login')}
                >
                  Already have account ? Sign In
                </span>
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

export default Register;
