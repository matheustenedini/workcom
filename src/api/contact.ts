import { useMutation } from 'react-query';
import { IContactPopup } from '../components/ContactPopup';
import api from './api';

interface IResponsePostContact {
  mgs: string;
}

interface IParamsPostContact {
  email: string | undefined;
  text: string | undefined;
  type: IContactPopup['type'];
  origin: IContactPopup['origin'];
}

export default function usePostContact() {
  return useMutation<IResponsePostContact, Error, IParamsPostContact>(
    ({ email, text, type, origin }) =>
      api
        .post('/contact', {
          email,
          text,
          type,
          origin,
        })
        .then(res => res.data)
  );
}
