import { useGoogleLogin } from '@react-oauth/google';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/auth';

const Login: React.FC = () => {
  const { LoginSuccess } = useAuth();
  const [search, setSearch] = useSearchParams({});
  const [send, setSend] = useState(false);

  React.useEffect(() => {
    if (send) {
      const callback_url = new URL(
        `${import.meta.env.VITE_BACKEND_URL}login/google/callback`
      );
      callback_url.search = search.toString();
      LoginSuccess(callback_url.toString());
    }
  }, [send]);

  const login = useGoogleLogin({
    onSuccess: (res) => {
      setSearch(res);
      setSend(true);
    },
    onError: (error) => {
      throw new Error(error.error);
    },
    flow: 'auth-code',
    scope: 'profile',
    state: 'mouheb',
  });
  return (
    <>
      <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          <div className='flex flex-col justify-center '>
            <img
              className='mx-auto h-12 w-auto'
              src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
              alt='Workflow'
            />
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
              Sign in to your account
            </h2>

            <button
              onClick={() => login()}
              type='button'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-white border-indigo-600 text-indigo-600 hover:bg-slate-200 mt-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Sign in/up with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
