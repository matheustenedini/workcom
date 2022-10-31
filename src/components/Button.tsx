import { ButtonHTMLAttributes } from 'react';
import Spinner from './Spinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  isInline?: boolean;
  color?: 'Black' | 'White' | 'Tranparent';
  hasShadow?: boolean;
  isDisabled?: boolean;
}

const Button = ({
  children,
  isLoading,
  isDisabled,
  className,
  isInline,
  color,
  hasShadow,
  onClick,
  type = 'button',
}: ButtonProps) => (
  <button
    // eslint-disable-next-line react/button-has-type
    type={type}
    className={`flex h-[38px] w-full flex-shrink-0 items-center justify-center space-x-2 rounded-md border border-solid border-transparent
    py-2 px-4 text-sm font-semibold text-white transition-colors
    
    ${isInline && 'xs:w-auto'}
    ${hasShadow && 'border-none shadow-[0_4px_14px_0_#0000001a]'} 

    ${
      !color &&
      `bg-blue-500 hover:bg-sky-600 ${
        isLoading || isDisabled ? '!bg-blue-300' : null
      }`
    }

    ${
      color === 'Black' &&
      `bg-gray-900 hover:bg-gray-800 ${
        isLoading || isDisabled ? '!bg-gray-600' : null
      }`
    }

    ${
      color === 'White' &&
      'border-gray-400 bg-transparent !text-gray-700 hover:border-gray-800 hover:bg-transparent'
    }

    ${
      color === 'Tranparent' &&
      'bg-transparent font-medium !text-gray-700 hover:bg-transparent'
    }
    ${className}`}
    disabled={isLoading}
    onClick={onClick}
  >
    {isLoading ? <Spinner /> : <span>{children}</span>}
  </button>
);

export default Button;
