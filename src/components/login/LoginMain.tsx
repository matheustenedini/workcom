/* eslint-disable react/jsx-props-no-spreading */
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import usePostDefaultLogin from '../../api/login';
// import useAuthStore from '../store/useAuthStore';
import Button from '../Button';
import ErrorMessage from '../ErrorMessage';
import GoogleLoginButton from '../GoogleLoginButton';
import Input from '../Input';

type TInputs = {
  username: string;
  password: string;
};

const LoginMain = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<TInputs>();

  const mutation = usePostDefaultLogin(setError);

  const onSubmit: SubmitHandler<TInputs> = ({ username, password }) => {
    mutation.mutate({
      username,
      password,
    });
  };

  return (
    <main className="flex grow justify-center py-8 px-8 text-gray-700 sm:px-0">
      <div className="h-full w-[420px]">
        <div>
          <h3 className="text-2xl font-semibold text-gray-800">Fazer login</h3>

          <div className="mt-1 flex w-full items-center text-sm text-gray-600">
            <span className="mr-1">
              <span className="hidden sm:inline">Ainda não </span>
              <span className="inline sm:hidden">Não </span>
              possui uma conta?
            </span>

            <Link href="/signup">
              <a className="cursor-pointer font-medium text-blue-500">
                Cadastre-se
              </a>
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          <div className="space-y-6">
            <div>
              <Input
                label="Email"
                name="username"
                register={register}
                rules={{ required: true }}
                hasError={Boolean(errors.username)}
              />
              <ErrorMessage name="username" errors={errors} />
            </div>
            <div>
              <Input
                label="Senha"
                name="password"
                type="password"
                inputType="password"
                register={register}
                rules={{ required: true }}
                hasError={Boolean(errors.password)}
              />
              <ErrorMessage name="password" errors={errors} />
            </div>
          </div>

          <div className="mt-8">
            <Button type="submit" isLoading={mutation.isLoading}>
              Continuar
            </Button>
          </div>
        </form>

        <div className="relative mt-6 flex items-center justify-center">
          <span className="absolute h-[1px] w-full bg-gray-200" />
          <span className="relative bg-white px-5 text-[10px] text-gray-600">
            OU
          </span>
          <span />
        </div>

        <div className="mt-6 space-y-4">
          <GoogleLoginButton origin="login" text="Continuar com Google" />
        </div>
      </div>
    </main>
  );
};

export default LoginMain;
