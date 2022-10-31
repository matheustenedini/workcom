/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  Control,
  FieldValues,
  FormState,
  UseFormSetValue,
  useWatch,
} from 'react-hook-form';
import useGetCities from '../../api/cities';
import useDebounce from '../../hooks/useDebounce';
import useFilter from '../../hooks/useFilter';
import useGetElementPosition, {
  TUseGetElementPositionReturn,
} from '../../hooks/useGetElementPosition';
import { idTitle } from '../../types/idTitleType';
import SearchSelect from './SearchSelect';

export interface ISearchInput {
  id: string;
  label: string;
  placeholder?: string;
  i: number;
  setValue: UseFormSetValue<FieldValues> | any;
  control: Control<FieldValues> | any;
  clearErrors: any;
  formState: FormState<FieldValues> | any;
  options: idTitle[] | undefined;
}

const SearchInput = ({
  id,
  label,
  placeholder,
  i,
  clearErrors,
  formState,
  setValue,
  control,
  options: optionsParam,
}: ISearchInput) => {
  const [options, setOptions] = useState(optionsParam);
  const [optionsFiltered, setOptionsFiltered] = useState(optionsParam);

  useEffect(() => {
    setOptions(optionsParam);
  }, [optionsParam]);

  useEffect(() => {
    setOptionsFiltered(options);
  }, [options]);

  const [buttonBounding, setButtonBounding] =
    useState<TUseGetElementPositionReturn>({
      top: 0,
      left: 0,
      height: 0,
      width: 0,
    });

  const refButton = useRef<HTMLButtonElement>(null);
  const refInput = useRef<HTMLInputElement>(null);
  const [showSelect, setShowSelect] = useState(false);

  const openSelect = () => {
    const target = refButton.current;

    setShowSelect(true);
    setButtonBounding(useGetElementPosition(target, true, [0, 10]));

    refInput.current?.focus();
  };

  const optionsSelectedFormValue = useWatch<FieldValues>({
    control,
    name: id,
  });

  const [inputValue, setInputValue] = useState('');
  const filter = useFilter();
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (id === 'city') {
      setInputValue(target?.value);
    } else {
      setInputValue(target?.value);
      setOptionsFiltered(filter(options, 'title', target?.value));
    }
  };

  const debouncedSearchQuery = useDebounce(inputValue, 600);
  const getCities = useGetCities(debouncedSearchQuery, id === 'city');

  useEffect(() => {
    if (optionsSelectedFormValue?.id) {
      setInputValue(optionsSelectedFormValue?.title);
      setShowSelect(false);
      if (id === 'city' && formState.errors.city) {
        clearErrors('city');
      }
      if (id === 'occupation' && formState.errors.occupation) {
        clearErrors('occupation');
      }
    }

    // quando o input cidade estiver vazio
    if (!optionsSelectedFormValue?.title && id === 'city') {
      setOptions([]);
    }

    // reset quando trocar a profissão
    if (
      !optionsSelectedFormValue?.id &&
      (id === 'specialization' || id === 'healthInsurance')
    ) {
      setInputValue('');
    }
  }, [optionsSelectedFormValue, formState]);

  useEffect(() => {
    if (id === 'city') {
      if (getCities.data) {
        setOptions([...getCities.data.cities]);
      }
      if (getCities.isError) {
        setOptions([]);
      }
    }
  }, [getCities.isSuccess, getCities.isError]);

  const router = useRouter();
  useEffect(() => {
    const queryId = router.query[`${id}Id`];
    const queryTitle = router.query[id];
    setValue(`${id}.title`, queryTitle);
    setValue(`${id}.id`, queryId);
  }, [router.query]);

  const [inputHasFocus, setInputHasFocus] = useState(false);

  // focar se enviar com a cidade ou profissão vazias
  useEffect(() => {
    if (id === 'city' || id === 'occupation') {
      if (formState.errors.city && id === 'city') {
        openSelect();
      } else if (
        !formState.errors.city &&
        formState.errors.occupation &&
        id === 'occupation'
      ) {
        openSelect();
      }
    }
  }, [formState]);
  return (
    <div className={`relative flex-1 ${i === 0 && 'flex-2'}`}>
      <button
        type="button"
        ref={refButton}
        onClick={openSelect}
        className="relative flex h-full items-center text-left focus:outline-none"
      >
        <div
          className={`border-r border-solid border-gray-200 px-6 ${
            i === 0 && 'px-0'
          } ${i === 3 && 'border-none'}`}
        >
          <input
            ref={refInput}
            value={inputValue}
            onChange={e => handleChangeInput(e)}
            placeholder={inputHasFocus ? placeholder : undefined}
            onFocus={() => setInputHasFocus(true)}
            onBlur={() => setInputHasFocus(false)}
            className="peer w-full pt-4 text-sm font-medium text-gray-800 placeholder:font-normal focus:outline-none"
          />
          <div
            className={`absolute bottom-[20px] text-sm text-gray-500 transition-all duration-[50]
              ${
                inputHasFocus &&
                '!bottom-[32px] !text-xs font-semibold !text-gray-800'
              }
              ${
                !inputHasFocus &&
                inputValue &&
                '!bottom-[32px] !text-xs !font-semibold text-gray-800'
              } 
            `}
          >
            {label}
          </div>
        </div>
      </button>
      {showSelect && (
        <SearchSelect
          buttonBounding={buttonBounding}
          setShowSelect={setShowSelect}
          setValue={setValue}
          // @ts-ignore: não consegui arrumar
          origin={id}
          options={optionsFiltered}
          control={control}
        />
      )}
    </div>
  );
};

export default SearchInput;
