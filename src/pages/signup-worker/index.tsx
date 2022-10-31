import produce from 'immer';
import Head from 'next/head';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { usePostRegisterWorker } from '../../api/register';
import Button from '../../components/Button';

import Header from '../../components/Header';
import FormAddresses from '../../components/signup/FormAddresses';
import FormExtraInformation from '../../components/signup/FormExtraInformation';
import FormOccupations from '../../components/signup/FormOccupations';
import FormPersonalInfos from '../../components/signup/FormPersonalInfos';

export interface IInputsSignupWorker {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  occupations: { occupation: string; specializations: string[] }[];
  addresses: {
    city: string;
    district: string;
    street: string;
    number: string;
    complement: string;
  }[];
  file: File;
  knowledge: string;
  description: string;
  phoneNumber: string;
  healthInsurance: (string | boolean)[];
}

const SignUpWorker = () => {
  const {
    register,
    handleSubmit,
    control,
    setError,
    watch,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<IInputsSignupWorker>({
    defaultValues: {
      phoneNumber: '',
      knowledge: '',
      occupations: [{ occupation: '', specializations: [] }],
      addresses: [
        { city: '', district: '', street: '', number: '', complement: '' },
      ],
      healthInsurance: [],
    },
  });

  const mutation = usePostRegisterWorker(setError);

  const onSubmit: SubmitHandler<IInputsSignupWorker> = data => {
    if (!data.occupations[0].occupation || !data.addresses[0].city) {
      if (!data.occupations[0].occupation) {
        setError('occupations', {
          type: 'required',
          message: 'Insira uma profissão',
        });
      }
      if (!data.addresses[0].city) {
        setError('addresses', {
          type: 'required',
          message: 'Insira uma cidade',
        });
      }
    } else {
      const newData = produce(data, draft => {
        draft.occupations = draft.occupations.map(o => ({
          occupation: o.occupation,
          specializations: o.specializations.filter(
            (h: string | boolean) => h !== false
          ),
        }));
        draft.healthInsurance = draft.healthInsurance.filter(
          (h: string | boolean) => h !== false
        );
      });
      mutation.mutate(newData);
    }
  };

  useEffect(() => {
    const subOccupations = watch(value => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (value.occupations[0]?.occupation) {
        clearErrors('occupations');
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (value.addresses[0]?.city) {
        clearErrors('addresses');
      }
    });

    return () => subOccupations.unsubscribe();
  }, [watch]);

  return (
    <div>
      <Head>
        <title>Workcom | Cadastrar-se - Profissional</title>
      </Head>
      <Header />
      <main className="flex grow justify-center py-8 text-gray-700 sm:py-12">
        <div className="h-full w-[460px] px-8 pb-4 sm:px-0">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">
              Cadastrar-se - Profissional
            </h3>
            <span className="invisible">A</span>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            key="signUpWorkerForm"
            className="mt-8"
          >
            <FormPersonalInfos
              register={register}
              errors={errors && errors}
              origin="worker"
            />

            <div className="mt-10 h-[1px] w-full bg-gray-200" />

            <FormOccupations
              control={control}
              errors={errors}
              register={register}
              setValue={setValue}
            />

            <div className="mt-10 h-[1px] w-full bg-gray-200" />

            <FormAddresses
              register={register}
              control={control}
              errors={errors}
            />

            <div className="mt-10 h-[1px] w-full bg-gray-200" />

            <FormExtraInformation
              register={register}
              control={control}
              errors={errors}
            />

            <Button
              type="submit"
              className="mt-10"
              isLoading={mutation.isLoading}
            >
              Criar conta
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignUpWorker;
