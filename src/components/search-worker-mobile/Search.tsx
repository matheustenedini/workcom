import { useRouter } from 'next/router';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormSetValue,
  useWatch,
} from 'react-hook-form';
import { VscChevronLeft } from 'react-icons/vsc';
import { animated, useSpring } from 'react-spring';
import useGetHealthInsurance from '../../api/health-insurance';
import { IResponsePostIpLocation } from '../../api/ip-location';
import {
  useGetOccupations,
  useGetSpecializations,
} from '../../api/occupations';
import { idTitle } from '../../types/idTitleType';
import SearchOptions from './SearchOptions';

const steps = [
  {
    name: 'city',
    placeholder: 'Selecione sua cidade',
    isRequired: true,
  },
  {
    name: 'occupation',
    placeholder: 'Profissão',
    isRequired: true,
  },
  {
    name: 'specialization',
    placeholder: 'Especialização (Opcional)',
    isRequired: false,
  },
  {
    name: 'healthInsurance',
    placeholder: 'Convênio (Opcional)',
    isRequired: false,
  },
];

export interface IInputsSearchWorkers {
  city: idTitle;
  occupation: idTitle;
  specialization: idTitle;
  healthInsurance: idTitle;
}

interface ISearch {
  setShowSearch: Dispatch<SetStateAction<boolean>>;
  ipLocation: IResponsePostIpLocation | undefined;
  isEditing?: boolean;
  setValue?: UseFormSetValue<FieldValues> | any;
  stepIndex?: number;
  getSpecializations?: any;
}

const Search = ({
  setShowSearch,
  ipLocation,
  isEditing,
  stepIndex: stepIndexProp,
  setValue: setValueProp,
  getSpecializations: getSpecializationsProp,
}: ISearch) => {
  const { setValue, control, handleSubmit } = useForm<IInputsSearchWorkers>({
    defaultValues: {
      city: { title: '', id: '' },
      occupation: { title: '', id: '' },
      specialization: { title: '', id: '' },
      healthInsurance: { title: '', id: '' },
    },
  });

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

  const getSpecializations = useGetSpecializations(
    watchOccupationId?.toString()
  );

  const getHealthInsurance = useGetHealthInsurance();

  const gets = {
    city: undefined,
    occupation: getOccupations?.data?.occupations,
    specialization:
      getSpecializationsProp?.data?.specializations ||
      getSpecializations?.data?.specializations,
    healthInsurance: getHealthInsurance?.data?.healthInsurance,
  };

  const [stepIndex, setStepIndex] = useState(stepIndexProp || 0);

  const [inputSearchValue, setInputSearchValue] = useState('');

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setInputSearchValue(target.value);
  };

  const refInputSearch = useRef<HTMLInputElement>(null);
  const [fadeIn, set] = useSpring(() => ({ opacity: 0 }));

  useEffect(() => {
    refInputSearch.current?.focus();
    setInputSearchValue('');
    set({ opacity: 1, from: { opacity: 0 }, config: { duration: 500 } });
  }, [stepIndex]);

  const handleBackButton = () => {
    if (!isEditing) {
      if (stepIndex === 0) {
        setShowSearch(false);
      } else {
        setStepIndex(prev => prev - 1);
      }
    } else {
      setShowSearch(false);
    }
  };

  const router = useRouter();

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
    setShowSearch(false);
  };

  useEffect(() => {
    if (!isEditing) {
      if (stepIndex === steps.length) {
        handleSubmit(onSubmit)();
      }
    }
  }, [stepIndex]);

  // isEditing === true
  const handleClearOptionSelected = () => {
    if (steps[stepIndex].name === 'specialization') {
      setValueProp('specialization', { title: '', id: '' });
      setShowSearch(false);
    } else if (steps[stepIndex].name === 'healthInsurance') {
      setValueProp('healthInsurance', { title: '', id: '' });
      setShowSearch(false);
    }
  };

  return (
    <div>
      {stepIndex <= steps.length - 1 && (
        <div className="fixed inset-0 z-50 w-full bg-white px-8 py-10">
          <animated.div
            style={fadeIn}
            className="flex h-full max-h-[100vh] flex-col"
          >
            <div className="mt-6 flex w-full space-x-3">
              {/* back  */}
              <button type="button" onClick={handleBackButton}>
                <VscChevronLeft className="text-2xl text-gray-800" />
              </button>

              {/* search  */}
              <input
                type="text"
                placeholder={steps[stepIndex]?.placeholder}
                ref={refInputSearch}
                className="w-full px-2 py-2 font-thin placeholder:font-light placeholder:text-gray-500 focus:outline-none"
                onChange={e => handleChangeInput(e)}
                value={inputSearchValue}
              />
            </div>
            <div className="overflow-y-auto">
              {steps.map((s, i) => (
                <div key={s.name}>
                  {i === stepIndex && (
                    <SearchOptions
                      name={s.name}
                      // @ts-ignore
                      options={gets[s.name]}
                      setStepIndex={setStepIndex}
                      setValue={setValueProp || setValue}
                      isEditing={isEditing}
                      inputSearchValue={inputSearchValue}
                      ipLocation={ipLocation}
                      setShowSearch={setShowSearch}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-auto flex flex-col items-center pt-6">
              {isEditing &&
              (steps[stepIndex].name === 'specialization' ||
                steps[stepIndex].name === 'healthInsurance') ? (
                // clear specialization || healthInsurance
                <button
                  type="button"
                  onClick={() => handleClearOptionSelected()}
                  className="pb-10 font-semibold text-gray-800 underline"
                >
                  Limpar{' '}
                  {steps[stepIndex].name === 'specialization' &&
                    'Especialização'}
                  {steps[stepIndex].name === 'healthInsurance' && 'Convênio'}
                </button>
              ) : null}

              {!isEditing && (
                <div>
                  {/* skip button */}
                  {!steps[stepIndex]?.isRequired && (
                    <button
                      type="button"
                      onClick={() => setStepIndex(prev => prev + 1)}
                      className="font-semibold text-gray-800 underline"
                    >
                      Pular
                    </button>
                  )}

                  {/* steps balls  */}
                  <div
                    className={`${
                      !steps[stepIndex]?.isRequired && 'mt-14'
                    } flex space-x-2`}
                  >
                    {steps.map((s, i) => (
                      <div
                        className={`h-2 w-2 rounded-full bg-gray-400 ${
                          i === stepIndex && '!bg-gray-900'
                        }`}
                        key={`step-balls-${s.name}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </animated.div>
        </div>
      )}
    </div>
  );
};

export default Search;
