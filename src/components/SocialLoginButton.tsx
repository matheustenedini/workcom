import Image from 'next/image';
import GoogleSvg from '../../public/images/google-color.svg';

type TSocialLoginButton = {
  text: string;
  handleClick: () => void;
};

const SocialLoginButton = ({ text, handleClick }: TSocialLoginButton) => (
  <button
    type="button"
    className="flex w-full items-center rounded-md border border-solid border-gray-500 py-1.5
 px-5 text-center font-semibold text-gray-700 hover:border-gray-700"
    onClick={handleClick}
  >
    <Image width="20" height="20" src={GoogleSvg} />

    <div className="w-full text-center">
      <span className="text-sm">{text}</span>
    </div>
  </button>
);

export default SocialLoginButton;
