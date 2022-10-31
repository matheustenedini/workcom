import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import { IoLocationSharp } from 'react-icons/io5';
import useGetCities from '../../api/cities';
import { IResponsePostIpLocation } from '../../api/ip-location';
import useDebounce from '../../hooks/useDebounce';
import useFilter from '../../hooks/useFilter';
import { idTitle } from '../../types/idTitleType';

interface ISearchOptions {
  name: string;
  options: idTitle[] | undefined;
  setStepIndex: Dispatch<SetStateAction<number>>;
  setShowSearch: Dispatch<SetStateAction<boolean>>;
  setValue: UseFormSetValue<FieldValues> | any;
  isEditing?: boolean;
  inputSearchValue: string;
  ipLocation: IResponsePostIpLocation | undefined;
}

const SearchOptions = ({
  name,
  options,
  setStepIndex,
  setValue,
  isEditing,
  setShowSearch,
  inputSearchValue,
  ipLocation,
}: ISearchOptions) => {
  const [optionsFiltered, setOptionsFiltered] = useState(options);

  useEffect(() => {
    setOptionsFiltered(options);
  }, [options]);

  const handleSelectOption = (option: idTitle | undefined) => {
    if (option) {
      setStepIndex(prev => prev + 1);

      setValue(`${name}.id`, option.id);
      setValue(`${name}.title`, option.title);
    }
    if (isEditing) {
      setShowSearch(false);
    }
  };

  const debouncedSearchQuery = useDebounce(inputSearchValue, 600);
  const getCities = useGetCities(debouncedSearchQuery, name === 'city');

  useEffect(() => {
    if (name === 'city') {
      if (getCities.data) {
        setOptionsFiltered([...getCities.data.cities]);
      }
      if (getCities.isError) {
        setOptionsFiltered([]);
      }
    }
  }, [getCities.data, getCities.isError, options]);

  const filter = useFilter();
  useEffect(() => {
    if (name !== 'city') {
      setOptionsFiltered(filter(options, 'title', inputSearchValue));
    }
  }, [inputSearchValue]);
  return (
    <div
      className={`mt-8 space-y-4 overflow-y-auto ${
        name === 'city' ? 'pl-4' : 'pl-11'
      }`}
    >
      {name === 'city' && ipLocation && (
        <div className="border-b border-solid border-gray-200 pb-4">
          <span className="text-sm font-semibold text-gray-800">Sugestão</span>
          <button
            type="button"
            onClick={() => handleSelectOption(ipLocation)}
            className="mt-2 flex h-full w-full items-center space-x-4 truncate active:bg-gray-100"
          >
            {name === 'city' && (
              <div className="grid place-items-center rounded-full bg-gray-500 p-3">
                <IoLocationSharp className="text-lg text-white" />
              </div>
            )}
            <div className="font-thin">{ipLocation?.title}</div>
          </button>
        </div>
      )}

      {optionsFiltered?.map(o => (
        <button
          type="button"
          onClick={() => handleSelectOption(o)}
          className="flex h-full w-full items-center space-x-4 truncate active:bg-gray-100"
          key={o.id}
        >
          {name === 'city' && (
            <div className="grid place-items-center rounded-full bg-gray-500 p-3">
              <IoLocationSharp className="text-lg text-white" />
            </div>
          )}
          <div className="font-thin">{o.title}</div>
        </button>
      ))}
    </div>
  );
};

export default SearchOptions;
