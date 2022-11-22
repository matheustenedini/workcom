import Head from 'next/head';
import { SubmitHandler, useForm } from 'react-hook-form';
import usePatchForgotPassword from '../../api/forgot-password';
import Button from '../../components/Button';
import ErrorMessage from '../../components/ErrorMessage';
import Header from '../../components/Header';
import Input from '../../components/Input';

interface IInputs {
  email: string;
}
const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInputs>();

  const mutation = usePatchForgotPassword();

  const onSubmit: SubmitHandler<IInputs> = data => mutation.mutate(data);

  return (
    <div>
      <Head>
        <title>Workcom | Esqueceu a senha?</title>
      </Head>
      <Header />
      <main className="flex grow justify-center px-8 py-8 text-gray-700 sm:px-8">
        <div className="h-full w-[420px]">
          <h1 className="text-2xl font-semibold text-gray-800">
            Esqueceu a senha?
          </h1>

          <h2 className="mt-6 text-sm text-gray-800">
            Insira o email utilizado para criar a conta e enviaremos um email
            com instruções para redefinir sua senha
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
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
              hasError={Boolean(errors.email)}
            />
            <ErrorMessage name="email" errors={errors} />

            <Button className="mt-6" isInline type="submit">
              Enviar intruções
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
