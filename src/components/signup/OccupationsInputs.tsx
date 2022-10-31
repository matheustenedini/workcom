/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useRef } from 'react';
import {
  Control,
  FieldArrayWithId,
  FieldErrors,
  FieldValues,
  UseFormRegister,
  useWatch,
} from 'react-hook-form';
import {
  useGetOccupations,
  useGetSpecializations,
} from '../../api/occupations';
import ErrorMessage from '../ErrorMessage';
import InputSelect from '../InputSelect';

interface IOccupationsInputs {
  o: FieldArrayWithId | any;
  i: number;
  register: UseFormRegister<FieldValues> | any;
  errors: FieldErrors;
  control: Control<FieldValues> | any;
  fields: Record<'id', string>[];
  setValue: any;
  handleDeleteOcuppationInput: (i: number) => void;
}

const occupationsInputs = ({
  o,
  i,
  register,
  errors,
  control,
  fields,
  handleDeleteOcuppationInput,
  setValue,
}: IOccupationsInputs) => {
  const getOccupations = useGetOccupations();

  const watchOccupationId = useWatch<FieldValues>({
    control,
    name: `occupations[${i}].occupation`,
  });

  const oldOccupationId = useRef('');
  useEffect(() => {
    if (oldOccupationId) {
      if (oldOccupationId.current !== watchOccupationId) {
        setValue(`occupations[${i}].specializations`, []);
      }
    }
    oldOccupationId.current = watchOccupationId;
  }, [watchOccupationId]);

  const getSpecializations = useGetSpecializations(
    watchOccupationId?.toString()
  );

  return (
    <div className="space-y-6" key={`occupation-inputs ${o}`}>
      <div>
        <InputSelect
          label={`Profissão${i > 0 ? ` ${i + 1}` : ''}`}
          name={`occupations[${i}].occupation`}
          register={register}
          type="Single"
          onClickClose={i > 0 ? () => handleDeleteOcuppationInput(i) : null}
          hasError={errors.occupations}
          control={control}
          options={getOccupations.data?.occupations}
          sugestOption
          showAsterisk
        />

        <ErrorMessage name="occupations" errors={errors} />
      </div>
      <InputSelect
        label="Especializações"
        name={`occupations[${i}].specializations`}
        type="Multiple"
        register={register}
        control={control}
        options={getSpecializations?.data?.specializations}
        sugestOption
      />
      {i !== fields.length - 1 && (
        <div className="h-[1px] w-full bg-gray-100" />
      )}
    </div>
  );
};
export default occupationsInputs;
