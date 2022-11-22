/* eslint-disable react/jsx-props-no-spreading */
import Link from 'next/link';
import { InputHTMLAttributes } from 'react';
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';
import NumberFormat, { FormatInputValueFunction } from 'react-number-format';
import InputLabel from './InputLabel';

interface TInput extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  register: UseFormRegister<FieldValues> | any;
  control?: Control<FieldValues> | any;
  rules?: RegisterOptions;
  inputType?: 'password' | null;
  isOnlyNumber?: boolean;
  format?: FormatInputValueFunction | string;
  name: string;
  hasError?: boolean;
  showAsterisk?: boolean;
  isDisabled?: boolean;
}

const Input = ({
  label,
  register,
  rules,
  name,
  type = 'text',
  inputType,
  placeholder,
  isOnlyNumber,
  format,
  control,
  hasError,
  showAsterisk,
  isDisabled,
}: TInput) => (
  <div className="w-full text-sm">
    <div className="flex justify-between ">
      <InputLabel name={name} showAsterisk={showAsterisk}>
        {label}
      </InputLabel>
      {inputType === 'password' && (
        <Link href="/forgotPassword">
          <a className="cursor-pointer text-sm font-normal text-gray-600 hover:underline">
            Esqueceu a senha?
          </a>
        </Link>
      )}
    </div>
    {isOnlyNumber ? (
      <Controller
        name={name}
        control={control}
        rules={rules}
        // eslint-disable-next-line no-shadow
        render={({ field: { onChange } }) => (
          <NumberFormat
            className={`w-full rounded-md border border-solid border-gray-300 py-2
            px-3 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
              hasError && '!border-red-500 !ring-red-200'
            }`}
            allowNegative={false}
            placeholder={placeholder}
            format={format}
            onChange={onChange}
          />
        )}
      />
    ) : (
      <input
        type={type}
        className={`w-full rounded-md border border-solid border-gray-300 py-2
        px-3 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
          hasError && '!border-red-500 !ring-red-200'
        }
        ${isDisabled && 'cursor-not-allowed !border-gray-200 text-gray-400'}`}
        disabled={isDisabled}
        id={name}
        placeholder={placeholder}
        {...register(name, rules)}
      />
    )}
  </div>
);

export default Input;
