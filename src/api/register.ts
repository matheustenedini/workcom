import Router from 'next/router';
import { setCookie } from 'nookies';
import { UseFormSetError } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { IInputsSignup } from '../pages/signup';
import { IInputsSignupWorker } from '../pages/signup-worker';
import api from './api';

interface IResponsePostRegister {
  access_token: string;
  firstName: string;
}

export function usePostRegisterCustomer(
  setError: UseFormSetError<IInputsSignup>
) {
  return useMutation<IResponsePostRegister, Error, IInputsSignup>(
    ({ firstName, lastName, email, password }) =>
      api
        .post('/register/customer/default', {
          firstName,
          lastName,
          email,
          password,
        })
        .then(res => res.data)
        .catch(error => {
          if (error.response.status === 400) {
            toast.error(error.response.data.message);
          }
          if (error.response.status === 409) {
            setError('email', {
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

export function usePostRegisterCustomerGoogle() {
  return useMutation(
    (token: string) =>
      api
        .post(`/register/customer/google/${token}`)
        .then(res => res.data)
        .catch(error => {
          if (error.response.status === 401 || error.response.status === 409) {
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

export function usePostRegisterWorker(
  setError: UseFormSetError<IInputsSignupWorker>
) {
  return useMutation<IResponsePostRegister, Error, IInputsSignupWorker>(
    ({
      firstName,
      lastName,
      email,
      password,
      occupations,
      knowledge,
      description,
      phoneNumber,
      healthInsurance,
      addresses,
    }) =>
      api
        .post('/register/worker/default', {
          firstName,
          lastName,
          email,
          password,
          occupations,
          knowledge,
          description,
          phoneNumber,
          addresses,
          healthInsurance,
        })
        .then(res => res.data)
        .catch(error => {
          if (error.response.status === 400) {
            toast.error(error.response.data.message);
          }
          if (error.response.status === 409) {
            setError('email', {
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

        Router.replace('/select-photo');
      },
    }
  );
}
