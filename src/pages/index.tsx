import { useWindowWidth } from '@react-hook/window-size';
import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import SearchDesktop from '../components/search-worker-desktop/Search';
import SearchMobile from '../components/search-worker-mobile/SearchButton';

const Home: NextPage = () => {
  const windowWidth = useWindowWidth();
  return (
    <div>
      <Head>
        <title>Página inicial</title>
      </Head>
      <Header />
      {windowWidth ? (
        <main className="py-8 px-8 sm:py-16">
          <div className="text-center text-2xl font-semibold sm:text-4xl">
            <h1 className="text-gray-700 sm:text-gray-900">
              Encontre o profissional perfeito
            </h1>
          </div>
          <div className="mt-8 sm:mt-12">
            {windowWidth >= 900 ? <SearchDesktop /> : <SearchMobile />}
          </div>
        </main>
      ) : null}
    </div>
  );
};

export default Home;
