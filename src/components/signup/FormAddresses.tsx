import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
} from 'react-hook-form';
import { IInputsSignupWorker } from '../../pages/signup-worker';
import Button from '../Button';
import ErrorMessage from '../ErrorMessage';
import Input from '../Input';
import InputSelect from '../InputSelect';

interface IFormAddresses {
  register: UseFormRegister<IInputsSignupWorker>;
  errors: FieldErrors;
  control: Control<IInputsSignupWorker>;
}

const FormAddresses = ({ register, control, errors }: IFormAddresses) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'addresses',
  });

  return (
    <div>
      <div className="mt-10">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Endereços</h2>
          <span className="text-sm text-gray-800">
            Insira os endereços dos seus locais de trabalho
          </span>
        </div>
        <div className="mt-8 space-y-6">
          {fields.map((a, i) => (
            <div className="space-y-6" key={a.id}>
              {/* cidade  */}
              <div>
                <InputSelect
                  label={`Cidade${i > 0 ? ` ${i + 1}` : ''}`}
                  onClickClose={i > 0 ? () => remove(i) : null}
                  name={`addresses[${i}].city`}
                  type="Single"
                  register={register}
                  control={control}
                  backendSearch
                  showAsterisk
                  // hasError={Boolean(errors.addresses && errors.addresses)}
                />
                <ErrorMessage name="addresses" errors={errors} />
              </div>
              {/* bairro */}
              <div>
                <Input
                  label="Bairro"
                  name={`addresses[${i}].district`}
                  register={register}
                  rules={{
                    required: true,
                    maxLength: {
                      value: 50,
                      message: 'O bairro não pode ter mais de 50 caracteres',
                    },
                  }}
                  showAsterisk
                  hasError={Boolean(
                    errors.addresses && errors.addresses[i]?.district
                  )}
                />
                <ErrorMessage
                  name={`addresses[${i}].district`}
                  errors={errors}
                />
              </div>

              {/* rua e numero  */}
              <div className="flex w-full flex-wrap gap-x-5 gap-y-6 sm:flex-nowrap">
                <Input
                  label="Rua"
                  name={`addresses[${i}].street`}
                  register={register}
                  rules={{
                    required: true,
                    maxLength: {
                      value: 50,
                      message: 'A rua não pode ter mais de 50 caracteres',
                    },
                  }}
                  showAsterisk
                  hasError={Boolean(
                    errors.addresses && errors.addresses[i]?.street
                  )}
                />
                <Input
                  label="Número"
                  name={`addresses[${i}].number`}
                  register={register}
                  control={control}
                  isOnlyNumber
                  rules={{
                    required: true,
                    maxLength: {
                      value: 10,
                      message: 'O número não pode ter mais de 10 caracteres',
                    },
                  }}
                  showAsterisk
                  hasError={
                    errors.addresses && Boolean(errors.addresses[i]?.number)
                  }
                />
              </div>
              <div>
                <ErrorMessage name={`addresses[${i}].street`} errors={errors} />
                <ErrorMessage name={`addresses[${i}].number`} errors={errors} />
              </div>

              {/* complemento */}
              <div>
                <Input
                  label="Complemento"
                  name={`addresses[${i}].complement`}
                  register={register}
                  rules={{
                    maxLength: {
                      value: 50,
                      message:
                        'O complemento não pode ter mais de 50 caracteres',
                    },
                  }}
                  hasError={Boolean(
                    errors.addresses && errors.addresses[i]?.complement
                  )}
                />
                <ErrorMessage
                  name={`addresses[${i}].complement`}
                  errors={errors}
                />
              </div>
              {i !== fields.length - 1 && (
                <div className="h-[1px] w-full bg-gray-100" />
              )}
            </div>
          ))}
        </div>
      </div>
      <Button
        isInline
        color="White"
        className="!mt-8"
        onClick={() =>
          append({
            city: '',
            district: '',
            street: '',
            number: '',
            complement: '',
          })
        }
      >
        Add. outro endereço
      </Button>
    </div>
  );
};

export default FormAddresses;
