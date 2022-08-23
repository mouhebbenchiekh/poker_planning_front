import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import React, { useContext } from 'react';
import { userContext } from '../context/auth';
let config = {
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};
function objectToQueryString(obj: any) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  return str.join('&');
}

const Login: React.FC = () => {
  const { user, setUser } = useContext(userContext);
  const login = useGoogleLogin({
    onSuccess: (res) => {
      console.log({ res });

      const queryString = objectToQueryString(res);

      const callback_url = new URL(
        'http://localhost:3000/login/google/callback'
      );
      callback_url.search = queryString;
      console.log(callback_url.toString());

      axios
        .get(callback_url.toString())
        .then((result) => {
          setUser(result?.data?.data);
          localStorage.setItem('token', result.data.token);
        })
        .catch((err) => console.log(err));
    },
    onError: (error) => console.log(error),
    flow: 'auth-code',
    scope: 'profile',
    /* redirect_uri: 'http://localhost:3000/login/google/callback',
    ux_mode: 'redirect', */
    state: 'mouheb',
  });
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          <div className='flex flex-col justify-center '>
            <img
              className='mx-auto h-12 w-auto'
              src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
              alt='Workflow'
            />
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
              Sign in to your account {user?.family_name}
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
