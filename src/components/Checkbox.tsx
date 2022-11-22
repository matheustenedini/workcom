/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react';
import { HiOutlineCheck } from 'react-icons/hi';
import { IInputSelect } from './InputSelect';

interface ICeckbox {
  children: React.ReactNode;
  className?: string;
  id: string;
  name: string;
  register: IInputSelect['register'];
}

const Checkbox = ({ children, className, register, name, id }: ICeckbox) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const checkbox = document.getElementById(id) as HTMLInputElement;
    setIsActive(checkbox!.checked);
  }, [id]);

  return (
    <div
      className={`group relative flex w-full items-center focus:outline-none ${className}`}
    >
      <input
        type="checkbox"
        id={id}
        value={id}
        {...register(name)}
        onClick={e => {
          const target = e.target as HTMLInputElement;
          setIsActive(target.checked);
        }}
        className="absolute inset-0 h-full w-full opacity-0"
      />
      <div
        className={`flex items-center justify-center rounded border-2  
      border-solid
      ${isActive ? 'border-blue-500 bg-blue-500' : 'border-base-400'}
       focus:outline-none group-active:border-blue-500
       group-active:ring-2
       `}
      >
        {isActive ? (
          <HiOutlineCheck className="h-4 w-4 text-white" />
        ) : (
          <div className="h-4 w-4" />
        )}
      </div>
      {children}
    </div>
  );
};

export default Checkbox;
