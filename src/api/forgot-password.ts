import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import api from './api';

interface IParamsPatchForgotPassword {
  email: string;
}

interface IResponsePatchForgotPassword {
  msg: string;
}

export default function usePatchForgotPassword() {
  return useMutation<
    IResponsePatchForgotPassword,
    Error,
    IParamsPatchForgotPassword
  >(
    ({ email }) =>
      api
        .post('/users/forgot-password', { email })
        .then(res => res.data)
        .catch(err => {
          if (err.response.status === 404) {
            toast.error(err.response.data.message);
          }
        }),
    {
      onSuccess: data => {
        toast.success(data.msg, { duration: 8000 });
      },
    }
  );
}
