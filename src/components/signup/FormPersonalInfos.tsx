/* eslint-disable react/jsx-props-no-spreading */
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import ErrorMessage from '../ErrorMessage';
import Input from '../Input';

interface IFormPersonalInfos {
  register: UseFormRegister<FieldValues> | any;
  errors: FieldErrors;
  origin: 'worker' | 'customer';
}
const FormPersonalInfos = ({
  register,
  errors,
  origin,
}: IFormPersonalInfos) => (
  <div className="relative space-y-6">
    <div>
      <div className="flex w-full flex-wrap gap-x-5 gap-y-6 sm:flex-nowrap">
        <Input
          label="Nome"
          name="firstName"
          register={register}
          rules={{
            required: true,
            minLength: {
              value: 3,
              message: 'O seu nome deve ter entre 3 e 20 caracteres',
            },
            maxLength: {
              value: 20,
              message: 'O seu nome deve ter entre 3 e 20 caracteres',
            },
          }}
          hasError={Boolean(errors.firstName)}
          showAsterisk={origin === 'worker'}
        />
        <Input
          label="Sobrenome"
          name="lastName"
          register={register}
          rules={{
            required: true,
            minLength: {
              value: 3,
              message: 'O seu sobrenome deve ter entre 3 e 50 caracteres',
            },
            maxLength: {
              value: 50,
              message: 'O seu sobrenome deve ter entre 3 e 50 caracteres',
            },
          }}
          hasError={Boolean(errors.lastName)}
          showAsterisk={origin === 'worker'}
        />
      </div>
      <ErrorMessage name="firstName" errors={errors} />
      <ErrorMessage name="lastName" errors={errors} />
    </div>

    <div>
      <Input
        label="Email"
        name="email"
        register={register}
        rules={{
          required: true,
          maxLength: {
            value: 70,
            message: 'O seu email não pode ter mais de 70 caracteres',
          },
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i,
            message: 'Endereço de email inválido',
          },
        }}
        showAsterisk={origin === 'worker'}
        hasError={Boolean(errors.email)}
      />
      <ErrorMessage name="email" errors={errors} />
    </div>

    <div>
      <Input
        label="Senha"
        type="password"
        name="password"
        placeholder="6+ caracteres"
        register={register}
        rules={{
          required: true,
          minLength: {
            value: 6,
            message: 'A sua senha deve ter entre 6 e 100 caracteres',
          },
          maxLength: {
            value: 100,
            message: 'A sua senha deve ter entre 6 e 100 caracteres',
          },
        }}
        showAsterisk={origin === 'worker'}
        hasError={Boolean(errors.password)}
      />
      <ErrorMessage name="password" errors={errors} />
    </div>
  </div>
);
export default FormPersonalInfos;
