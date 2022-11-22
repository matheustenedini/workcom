import axios from 'axios';
import { parseCookies } from 'nookies';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: 'https://api-workcom.herokuapp.com/',
  // baseURL: 'http://localhost:8080',
});

const { token } = parseCookies();
if (token) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 500) {
      toast.error('Erro no servidor');
    } else if (error.response?.status === 400) {
      const message = error.response.data.message
        ?.map((m: string) => m)
        .join(' ');

      toast.error(message);
    } else {
      throw error;
    }
  }
);

export default api;
