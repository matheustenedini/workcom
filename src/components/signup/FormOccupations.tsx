import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
} from 'react-hook-form';
import { IInputsSignupWorker } from '../../pages/signup-worker';
import Button from '../Button';
import OccupationsInputs from './OccupationsInputs';

export interface IOccupationObj {
  occupation: string;
  specializations: string[];
}

interface IFormOccupations {
  register: UseFormRegister<IInputsSignupWorker>;
  errors: FieldErrors;
  control: Control<IInputsSignupWorker>;
  setValue: any;
}

const FormOccupations = ({
  errors,
  control,
  register,
  setValue,
}: IFormOccupations) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'occupations',
  });

  return (
    <div className="mt-10">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Profissões</h2>
        <span className="text-sm text-gray-800">
          Adicione uma ou mais profissões ao seu perfil
        </span>
      </div>

      <div className="mt-8 space-y-6">
        {fields.map((o, i) => (
          <OccupationsInputs
            key={o.id}
            o={o}
            i={i}
            setValue={setValue}
            errors={errors}
            control={control}
            fields={fields}
            register={register}
            handleDeleteOcuppationInput={remove}
          />
        ))}
      </div>

      <Button
        isInline
        color="White"
        className="!mt-8"
        onClick={() => append({ occupation: '', specializations: [] })}
      >
        Add. outra profissão
      </Button>
    </div>
  );
};
export default FormOccupations;
