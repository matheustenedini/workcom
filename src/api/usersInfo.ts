import { useQuery } from 'react-query';
import api from './api';

interface IReponseGetUserInfo {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
  isProfessional: boolean;
}

export default function useGetUserInfo(enabled: boolean) {
  return useQuery<IReponseGetUserInfo>(
    ['users-info'],
    () => api.get('/users/info').then(res => res.data),
    { refetchOnWindowFocus: false, staleTime: 10000000, enabled }
  );
}
