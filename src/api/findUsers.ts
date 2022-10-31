import { useMutation } from 'react-query';
import api from './api';

interface IParamsPostFindUsers {
  occupation: string | string[] | undefined;
  params: {
    specializations?: string[];
    healthInsurance?: string | string[] | undefined;
  };
  city: string | string[] | undefined;
  qtdPerPage: 20;
  page: 1;
}

interface IResponsePostFindUsers {
  users: [
    {
      id: string;
      firstName: string;
      lastName: string;
      phoneNumber: string;
      profilePicture: string;
      healthInsurance: string[];
      occupations: string[];
      addresses: string[];
    }
  ];
}

export default function usePostFindUsers() {
  return useMutation<IResponsePostFindUsers, Error, IParamsPostFindUsers>(
    ({ occupation, city, qtdPerPage, page, params }) =>
      api
        .post('/users/find', {
          occupation,
          city,
          qtdPerPage,
          page,
          ...params,
        })
        .then(res => res.data)
  );
}
