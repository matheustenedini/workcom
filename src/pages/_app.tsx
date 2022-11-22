/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';

import '../../styles.css';

import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/montserrat/400.css';

import 'tailwindcss/tailwind.css';

import { useEffect, useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import useHistoryStore from '../store/useHistoryStore';
import api from '../api/api';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 20 * 1000,
          },
        },
      })
  );

  const addHistory = useHistoryStore(state => state.addHistory);
  const { asPath } = useRouter();
  useEffect(() => {
    addHistory(asPath);
  }, [asPath]);

  const { token } = parseCookies();
  useEffect(() => {
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }, [token]);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
        <Toaster />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
