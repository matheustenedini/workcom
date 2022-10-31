import { FieldErrors, FieldValues } from 'react-hook-form';
import { BsFillExclamationTriangleFill } from 'react-icons/bs';

interface IErrorMessage {
  name: string;
  errors: FieldErrors<FieldValues>;
}

const ErrorMessage = ({ errors, name }: IErrorMessage) => (
  <div>
    {errors[name]?.message && (
      <div className="mt-2.5 flex items-center space-x-1.5 text-xs text-red-500">
        <BsFillExclamationTriangleFill /> <span>{errors[name].message}</span>
      </div>
    )}
  </div>
);

export default ErrorMessage;
