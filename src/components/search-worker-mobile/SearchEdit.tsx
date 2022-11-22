import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { VscClose } from 'react-icons/vsc';
import { useGetGeoLocation, usePostIpLocation } from '../../api/ip-location';
import { useGetSpecializations } from '../../api/occupations';
import { IInputsSearchWorkers } from '../search-worker-desktop/Search';
import Search from './Search';

interface ISearchEdit {
  setShowSearchEdit: Dispatch<SetStateAction<boolean>>;
  setShowSearch: Dispatch<SetStateAction<boolean>>;
}

const SearchEdit = ({
  setShowSearchEdit,
  setShowSearch: setShowSearchProp,
}: ISearchEdit) => {
  const filters = [
    {
      name: 'Cidade',
      id: 'city',
    },
    {
      name: 'Profissão',
      id: 'occupation',
    },
    {
      name: 'Especialização',
      id: 'specialization',
    },
    {
      name: 'Convênio',
      id: 'healthInsurance',
    },
  ];

  const { setValue, control, handleSubmit, watch } =
    useForm<IInputsSearchWorkers>({
      defaultValues: {
        city: { title: '', id: '' },
        occupation: { title: '', id: '' },
        specialization: { title: '', id: '' },
        healthInsurance: { title: '', id: '' },
      },
    });

  const watchOccupationId = useWatch({
    control,
    name: 'occupation.id',
  });

  const getSpecializations = useGetSpecializations(
    watchOccupationId?.toString()
  );

  const oldOccupationId = useRef<string>();
  useEffect(() => {
    if (oldOccupationId.current) {
      if (oldOccupationId.current !== watchOccupationId) {
        setValue('specialization.id', '');
        setValue('specialization.title', '');
      }
    }
    oldOccupationId.current = watchOccupationId;
  }, [watchOccupationId]);

  const router = useRouter();
  useEffect(() => {
    // eslint-disable-next-line array-callback-return
    filters.map(f => {
      const queryId = router.query[`${f.id}Id`];
      const queryTitle = router.query[f.id];
      // @ts-ignore
      setValue(`${f.id}.title`, queryTitle);
      // @ts-ignores
      setValue(`${f.id}.id`, queryId);
    });
  }, [router.query]);

  const [stepIndex, setStepIndex] = useState(0);
  const [showSearch, setShowSearch] = useState(false);

  const handleClickEdit = (index: number) => {
    setStepIndex(index);
    setShowSearch(true);
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

  const onSubmit: SubmitHandler<IInputsSearchWorkers> = data => {
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
    setShowSearchEdit(false);
  };

  const handleClearSearch = () => {
    setShowSearchEdit(false);
    setStepIndex(0);
    setShowSearchProp(true);
  };

  return (
    <div className="flex w-full justify-center">
      {!showSearch && (
        <div className="fixed inset-0 z-50 flex h-screen w-full flex-col overflow-y-auto bg-white px-8 py-12">
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold text-gray-800">
              Editar pesquisa
            </div>
            <button type="button" onClick={() => setShowSearchEdit(false)}>
              <VscClose className="text-2xl text-gray-800" />
            </button>
          </div>
          <div className="mt-8 space-y-4">
            {filters.map((f, i) => (
              <button
                key={f.name}
                type="button"
                onClick={() => handleClickEdit(i)}
                className="flex w-full items-center justify-between rounded-lg py-3 px-4 shadow-[0_1px_2px_#00000014_,_0_2px_12px_#0000000f]"
              >
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-800">
                    {f.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {/* @ts-ignore */}
                    {watch(`${f.id}.title`)}
                  </div>
                </div>
                <div className="rounded-full bg-gray-100 px-3 py-1">
                  <div className="text-[13px] font-semibold text-gray-700">
                    Editar
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-auto space-y-5 pt-10">
            <button
              type="button"
              onClick={handleClearSearch}
              className="w-full py-1 text-sm font-semibold text-gray-700"
            >
              Limpar pesquisa
            </button>

            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="w-full rounded-lg bg-blue-500 py-3.5 text-sm font-semibold text-white"
            >
              Buscar
            </button>
          </div>
        </div>
      )}
      {showSearch && (
        <Search
          setShowSearch={setShowSearch}
          ipLocation={mutation.data}
          isEditing
          setValue={setValue}
          stepIndex={stepIndex}
          getSpecializations={getSpecializations}
        />
      )}
    </div>
  );
};

export default SearchEdit;
