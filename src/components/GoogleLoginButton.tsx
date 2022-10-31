import GoogleLogin from 'react-google-login';
import { usePostGoogleLogin } from '../api/login';
import { usePostRegisterCustomerGoogle } from '../api/register';
import SocialLoginButton from './SocialLoginButton';

interface IGoogleLoginButton {
  origin: 'login' | 'register';
  text: string;
}

const GoogleLoginButton = ({ text, origin }: IGoogleLoginButton) => {
  const mutationLogin = usePostGoogleLogin();
  const mutationRegister = usePostRegisterCustomerGoogle();

  const handleSuccess = (token: string) => {
    if (origin === 'login') {
      mutationLogin.mutate(token);
    } else if (origin === 'register') {
      mutationRegister.mutate(token);
    }
  };
  return (
    <div>
      <GoogleLogin
        clientId="472400088220-qgeer2e8liope1m2ddibqiv044q7qoaf.apps.googleusercontent.com"
        render={renderProps => (
          <SocialLoginButton text={text} handleClick={renderProps.onClick} />
        )}
        // @ts-ignore
        onSuccess={response => handleSuccess(response.tokenId)}
        cookiePolicy="single_host_origin"
      />
    </div>
  );
};

export default GoogleLoginButton;
