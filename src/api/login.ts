import Router from 'next/router';
import { setCookie } from 'nookies';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import api from './api';

interface IParamsPostDefaultLogin {
  username: string;
  password: string;
}
interface IResponsePostDefaultLogin {
  access_token: string;
}

export default function usePostDefaultLogin(setError: any) {
  return useMutation<IResponsePostDefaultLogin, Error, IParamsPostDefaultLogin>(
    ({ username, password }) =>
      api
        .post('/auth/login/default', {
          username,
          password,
        })
        .then(res => res.data)
        .catch(error => {
          if (error.response.status === 404 || error.response.status === 401) {
            setError('username', {
              type: 'custom',
              message: error.response.data.message,
            });
          }
        }),
    {
      onSuccess: res => {
        setCookie(undefined, 'token', res.access_token, {
          maxAge: 60 * 60 * 24 * 7, // 7 dias
        });

        Router.replace('/');
      },
    }
  );
}

export function usePostGoogleLogin() {
  return useMutation(
    (token: string) =>
      api
        .post(`/auth/login/google/${token}`)
        .then(res => res.data)
        .catch(error => {
          if (error.response.status === 401 || error.response.status === 404) {
            toast.error(error.response.data.message);
          }
        }),
    {
      onSuccess: res => {
        setCookie(undefined, 'token', res.access_token, {
          maxAge: 60 * 60 * 24 * 7, // 7 dias
        });

        Router.replace('/');
      },
    }
  );
}
