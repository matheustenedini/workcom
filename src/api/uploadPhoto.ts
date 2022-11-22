import Router from 'next/router';
import { useMutation } from 'react-query';
import api from './api';

interface IParamsPatchUploadPhoto {
  formData: FormData;
}

interface IResponsePatchUploadPhoto {
  msg: string;
}

export default function usePatchUploadPhoto() {
  return useMutation<IResponsePatchUploadPhoto, Error, IParamsPatchUploadPhoto>(
    ({ formData }) =>
      api
        .patch('/users/photo', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => res.data),
    {
      onSuccess: () => {
        Router.replace('/');
      },
    }
  );
}
