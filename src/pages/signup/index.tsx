import Head from 'next/head';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { HiChevronRight } from 'react-icons/hi';
import { usePostRegisterCustomer } from '../../api/register';
import Button from '../../components/Button';
import GoogleLoginButton from '../../components/GoogleLoginButton';
import Header from '../../components/Header';
import FormPersonalInfos from '../../components/signup/FormPersonalInfos';

export interface IInputsSignup {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const SingUp = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IInputsSignup>();

  const mutation = usePostRegisterCustomer(setError);

  const onSubmit: SubmitHandler<IInputsSignup> = data => mutation.mutate(data);

  return (
    <div>
      <Head>
        <title>Workcom | Cadastrar-se</title>
      </Head>
      <Header />
      <main className="flex grow justify-center py-8 text-gray-700">
        <div className="h-full w-[420px] px-8 sm:px-0">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">
              Cadastrar-se
            </h3>

            <div className="mt-1 flex w-full items-center text-sm text-gray-600">
              <span className="mr-1">Já possui uma conta?</span>

              <Link href="/login">
                <a className="cursor-pointer font-medium text-blue-500">
                  Entrar
                </a>
              </Link>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/signup-worker"
              // type="button"
            >
              <a
                className="inline-flex cursor-pointer items-center rounded-full border border-solid border-gray-200 px-4 py-2 text-sm
                font-semibold shadow-md sm:px-6
              "
              >
                <span className="flex w-full items-center truncate text-center text-gray-800">
                  Fazer cadastro como profissional
                  <HiChevronRight className="ml-1 text-lg" />
                </span>
              </a>
            </Link>
          </div>

          <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
            <FormPersonalInfos
              register={register}
              errors={errors}
              origin="customer"
            />
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
            <GoogleLoginButton
              origin="register"
              text="Fazer cadastro com Google"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SingUp;
