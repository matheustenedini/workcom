import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import useGetHealthInsurance from '../../api/health-insurance';
import { IInputsSignupWorker } from '../../pages/signup-worker';
import ErrorMessage from '../ErrorMessage';
import Input from '../Input';
import InputSelect from '../InputSelect';
import TextArea from '../TextArea';

interface IFormExtraInformation {
  register: UseFormRegister<IInputsSignupWorker>;
  errors: FieldErrors;
  control: Control<IInputsSignupWorker>;
}

const FormExtraInformation = ({
  register,
  control,
  errors,
}: IFormExtraInformation) => {
  const getHealthInsurance = useGetHealthInsurance();
  return (
    <div>
      <div className="mt-10">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Informações extras
          </h2>
          <span className="text-sm text-gray-800">
            Insira sua formação, descrição, telefone e convênios aceitos para
            finalizar o cadastro
          </span>
        </div>
        <div className="mt-8 space-y-6">
          <TextArea
            minRows={2}
            label="Formação"
            name="knowledge"
            placeholder="Qual é a sua formação? Faculdades, especializações, cursos, etc."
            register={register}
            rules={{
              maxLength: {
                value: 1000,
                message: 'A sua formação não pode ter mais de 1000 caracteres',
              },
            }}
            hasError={Boolean(errors.formation)}
          />

          <div>
            <TextArea
              minRows={4}
              label="Descrição"
              name="description"
              placeholder="Quais são suas experiências? Como é seu local de trabalho? Como funciona a sua consulta?"
              register={register}
              rules={{
                required: true,
                minLength: {
                  value: 30,
                  message: 'A sua descrição deve ter mais de 30 caracteres',
                },
                maxLength: {
                  value: 2000,
                  message:
                    'A sua descrição não pode ter mais de 2000 caracteres',
                },
              }}
              showAsterisk
              hasError={Boolean(errors.description)}
            />
            <ErrorMessage name="description" errors={errors} />
          </div>

          <div>
            <Input
              format="+55 (##) ##### ####"
              placeholder="+55 (XX) XXXXX XXXX"
              label="Telefone para contato"
              name="phoneNumber"
              register={register}
              control={control}
              isOnlyNumber
              rules={{
                required: true,
                maxLength: {
                  value: 20,
                  message: 'O seu telefone não pode ter mais de 20 caracteres',
                },
              }}
              showAsterisk
              hasError={Boolean(errors.phoneNumber)}
            />
            <ErrorMessage name="phoneNumber" errors={errors} />
          </div>

          <InputSelect
            label="Convênios aceitos"
            name="healthInsurance"
            type="Multiple"
            register={register}
            control={control}
            options={getHealthInsurance.data?.healthInsurance}
            sugestOption
          />
        </div>
      </div>
    </div>
  );
};

export default FormExtraInformation;
