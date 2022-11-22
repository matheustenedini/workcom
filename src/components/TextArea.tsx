import { TextareaHTMLAttributes } from 'react';
import { RegisterOptions } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import InputLabel from './InputLabel';

interface TTextArea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  minRows?: number;
  rules?: RegisterOptions;
  register: any;
  hasError?: boolean;
  showAsterisk?: boolean;
}

const TextArea = ({
  name,
  label,
  placeholder,
  minRows = 2,
  register,
  rules,
  hasError,
  showAsterisk,
}: TTextArea) => (
  <div className="text-sm">
    <InputLabel name={name} showAsterisk={showAsterisk}>
      {label}
    </InputLabel>
    <TextareaAutosize
      className={`w-full resize-none rounded-md border border-solid border-gray-300 py-2
      px-3 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
        hasError && '!border-red-500 !ring-red-200'
      }`}
      id={name}
      minRows={minRows}
      placeholder={placeholder}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...register(name, rules)}
    />
  </div>
);

export default TextArea;
