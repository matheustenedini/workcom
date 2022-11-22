import { useQuery } from 'react-query';
import api from './api';

interface IResponseGetCities {
  cities: { title: string; id: string }[];
}

export default function useGetCities(
  searchValue: string | undefined,
  active?: boolean
) {
  return useQuery<IResponseGetCities>(
    ['cities', searchValue],
    () =>
      api
        .get(`/cities?name=${searchValue}`)
        .then(res => res.data)
        .catch(() => null),
    {
      enabled: Boolean(searchValue) && active,
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
}
