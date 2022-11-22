import { useQuery } from 'react-query';
import api from './api';

interface IResponseGetHealthInsurance {
  healthInsurance: { title: string; id: string }[];
}

export default function useGetHealthInsurance() {
  return useQuery<IResponseGetHealthInsurance>(
    ['health-insurances'],
    () => api.get('/health-insurance').then(res => res.data),
    { refetchOnWindowFocus: false }
  );
}
