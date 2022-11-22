import { useQuery } from 'react-query';
import api from './api';

interface IResponseGetOccupations {
  occupations: { id: string; title: string }[];
}

interface IResponseGetSpecializations {
  specializations: { id: string; title: string }[];
}

export function useGetOccupations() {
  return useQuery<IResponseGetOccupations>(
    ['occupations'],
    () => api.get('/occupations').then(res => res.data),
    { refetchOnWindowFocus: false }
  );
}

export function useGetSpecializations(
  occupationId: string | string[] | undefined
) {
  return useQuery<IResponseGetSpecializations>(
    ['specializations', occupationId],
    () => api.get(`/specializations/${occupationId}`).then(res => res.data),
    {
      enabled: Boolean(occupationId),
      refetchOnWindowFocus: false,
    }
  );
}
