import { useMutation, useQuery } from 'react-query';
import { idTitle } from '../types/idTitleType';
import api from './api';

interface IResponseGetGeoLocation {
  country_code: string;
  country_name: string;
  city: string;
  postal: string;
  latitude: number;
  longitude: number;
  IPv4: string;
  state: string;
}

export function useGetGeoLocation() {
  return useQuery<IResponseGetGeoLocation>(
    ['geo-location'],
    () =>
      api
        .get(
          'https://geolocation-db.com/json/8dd79c70-0801-11ec-a29f-e381a788c2c0'
        )
        .then(res => res.data),
    { retry: false, refetchOnWindowFocus: false }
  );
}

export interface IResponsePostIpLocation {
  id: string;
  title: string;
}

interface IParamsPostIpLocation {
  state: string;
  city: string;
  IP: string;
}

export function usePostIpLocation() {
  return useMutation<IResponsePostIpLocation, Error, IParamsPostIpLocation>(
    ({ IP, city, state }) =>
      api
        .post('/cities/ip-location', {
          IP,
          city,
          state,
        })
        .then(res => res.data)
  );
}
