import Head from 'next/head';
import Header from '../../components/Header';
import LoginMain from '../../components/login/LoginMain';

const Login = () => (
  <div>
    <Head>
      <title>Workcom | Login</title>
    </Head>
    <div className="flex h-full flex-col bg-white">
      <Header />

      <LoginMain />
    </div>
  </div>
);

export default Login;
