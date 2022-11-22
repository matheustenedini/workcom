import { useQuery } from 'react-query';
import api from './api';

interface IResponseGetUser {
  id: 'string';
  firstName: 'string';
  lastName: 'string';
  description: 'string';
  knowledge: 'string';
  phoneNumber: 'string';
  healthInsurance: string[];
  occupations: {
    occupation: 'string';
    specializations: string[];
  }[];
  addresses: string[];
  profilePicture: 'string';
}

export default function useGetUser(id: string | string[] | undefined) {
  return useQuery<IResponseGetUser>(
    ['user', id],
    () => api.get(`users/${id}`).then(res => res.data),
    { enabled: Boolean(id) }
  );
}
