import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { FiSearch, FiAlertTriangle } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import SearchInput from './SearchInput';
import { idTitle } from '../../types/idTitleType';
import {
  useGetOccupations,
  useGetSpecializations,
} from '../../api/occupations';
import useGetHealthInsurance from '../../api/health-insurance';
import { useGetGeoLocation, usePostIpLocation } from '../../api/ip-location';

export interface IOrigin {
  origin: 'city' | 'occupation' | 'specialization' | 'healthInsurance';
}

const inputs = [
  {
    id: 'city',
    label: 'Cidade',
  },
  {
    id: 'occupation',
    label: 'Profissão',
  },
  {
    id: 'specialization',
    label: 'Especialização',
    placeholder: 'Opcional',
  },
  {
    id: 'healthInsurance',
    label: 'Convênio',
    placeholder: 'Opcional',
  },
];

export interface IInputsSearchWorkers {
  city: idTitle;
  occupation: idTitle;
  specialization: idTitle;
  healthInsurance: idTitle;
}
const Search = () => {
  const { setValue, handleSubmit, control, setError, clearErrors, formState } =
    useForm<IInputsSearchWorkers>();

  const getOccupations = useGetOccupations();

  const watchOccupationId = useWatch({
    control,
    name: 'occupation.id',
  });

  const oldOccupationId = useRef<string>();
  useEffect(() => {
    if (oldOccupationId.current) {
      if (oldOccupationId.current !== watchOccupationId) {
        setValue('specialization', { title: '', id: '' });
      }
    }
    oldOccupationId.current = watchOccupationId;
  }, [watchOccupationId]);

  const router = useRouter();
  const { occupationId } = router.query;

  const getSpecializations = useGetSpecializations(
    watchOccupationId?.toString() || occupationId
  );

  const getHealthInsurance = useGetHealthInsurance();

  const gets = {
    city: undefined,
    occupation: getOccupations.data?.occupations,
    specialization: getSpecializations.data?.specializations,
    healthInsurance: getHealthInsurance.data?.healthInsurance,
  };

  // handle form submit
  const onSubmit: SubmitHandler<IInputsSearchWorkers> = data => {
    if (!data.city.id || !data.occupation.id) {
      if (!data.city.id) {
        setError('city', {
          type: 'required',
          message: 'Este campo é necessário',
        });
      }
      if (!data.occupation.id) {
        setError('occupation', {
          type: 'required',
          message: 'Este campo é necessário',
        });
      }
    } else {
      router.push({
        pathname: '/search-result',
        query: {
          occupation: data.occupation?.title,
          occupationId: data.occupation?.id,
          specialization: data.specialization?.title,
          specializationId: data.specialization?.id,
          healthInsurance: data.healthInsurance?.title,
          healthInsuranceId: data.healthInsurance?.id,
          city: data.city?.title,
          cityId: data.city?.id,
        },
      });
    }
  };

  const getGeoLocation = useGetGeoLocation();

  const mutation = usePostIpLocation();

  useEffect(() => {
    if (getGeoLocation.isSuccess) {
      mutation.mutate({
        IP: getGeoLocation.data.IPv4,
        city: getGeoLocation.data.city,
        state: getGeoLocation.data.state,
      });
    }
  }, [getGeoLocation.isSuccess]);

  const { cityId } = router.query;
  useEffect(() => {
    if (mutation.isSuccess && !cityId) {
      setValue('city', { id: mutation.data!.id, title: mutation.data!.title });
    }
  }, [mutation.isSuccess]);

  return (
    <div className="relative flex w-full flex-col items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex !min-h-[60px] max-w-[850px] rounded-full border border-solid border-gray-200 pl-8 pr-2 shadow-[0_1px_2px_#00000014_,_0_6px_12px_#0000000d] lg:w-full"
      >
        {inputs.map((o, i) => (
          <SearchInput
            key={o.id}
            id={o.id}
            label={o.label}
            placeholder={o.placeholder}
            i={i}
            setValue={setValue}
            control={control}
            // @ts-ignore:
            options={gets[o.id]}
            formState={formState}
            clearErrors={clearErrors}
          />
        ))}
        <div className="flex items-center pl-4">
          <button
            type="submit"
            className="grid h-12 w-12 place-items-center rounded-full bg-gray-900 transition-colors hover:bg-gray-800"
          >
            <FiSearch className="h-5 w-5 text-white" />
          </button>
        </div>
      </form>
      <div className="mt-4 flex max-w-[850px] items-center text-left text-gray-600 lg:w-full">
        <FiAlertTriangle className="mr-1" />
        <span className=" text-sm">
          No campo Cidade, selecione &quot;Porto Alegre&quot; para testar a
          busca
        </span>
      </div>
    </div>
  );
};

export default Search;
