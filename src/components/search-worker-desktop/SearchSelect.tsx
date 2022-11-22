/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { Control, FieldValues, useWatch } from 'react-hook-form';
import { IoLocationSharp } from 'react-icons/io5';
import { TUseGetElementPositionReturn } from '../../hooks/useGetElementPosition';
import { idTitle } from '../../types/idTitleType';
import { IOrigin } from './Search';
import { ISearchInput } from './SearchInput';

interface ISearchSelect {
  origin: IOrigin['origin'];
  buttonBounding: TUseGetElementPositionReturn;
  options: idTitle[] | undefined;
  setShowSelect: Dispatch<SetStateAction<boolean>>;
  setValue: ISearchInput['setValue'];
  control: Control<FieldValues> | any;
}

const SearchSelect = ({
  buttonBounding,
  origin,
  options,
  setValue,
  setShowSelect,
  control,
}: ISearchSelect) => {
  const refSelect = useRef<HTMLDivElement>(null);

  const optionsSelectedFormValue = useWatch<FieldValues>({
    control,
    name: origin,
  });

  useEffect(() => {
    // clicar fora para fechar
    const handleClick = (e: MouseEvent) => {
      if (!refSelect.current?.contains(e.target as Element)) {
        setShowSelect(false);
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  const handleSelectOption = (o: idTitle) => {
    setValue(`${origin}.title`, o.title);
    setValue(`${origin}.id`, o.id);
  };

  const handleClearOptionSelected = () => {
    if (origin === 'specialization' || origin === 'healthInsurance') {
      setValue(`${origin}`, { title: '', id: '' });
      setShowSelect(false);
    }
  };

  return (
    <div>
      {options?.length ? (
        <div
          style={{
            top: `${buttonBounding.height + 10}px`,
            left: buttonBounding.left,
          }}
          className="absolute z-50 w-[350px]"
          ref={refSelect}
        >
          <div className="rounded-2xl bg-white py-3 shadow-[0_6px_20px_#00000033]">
            <div className="max-h-[215px] overflow-y-auto">
              {options.map(o => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => handleSelectOption(o)}
                  className="flex w-full"
                >
                  <label className="flex w-full cursor-pointer">
                    <div className="flex w-full items-center space-x-3 px-5 py-2 text-sm hover:bg-blue-50">
                      {origin === 'city' && (
                        <div className="grid place-items-center rounded-full bg-gray-500 p-1">
                          <IoLocationSharp className="text-white" />
                        </div>
                      )}
                      <span>{o.title}</span>
                    </div>
                  </label>
                </button>
              ))}
            </div>

            {/* clear field */}
            {optionsSelectedFormValue.id &&
            (origin === 'specialization' || origin === 'healthInsurance') ? (
              <button
                type="button"
                onClick={handleClearOptionSelected}
                className="mt-2 w-full border-t border-solid border-gray-200 px-5 pt-3 text-left text-sm font-semibold
               text-gray-500 transition-colors hover:text-gray-600"
              >
                Limpar campo
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SearchSelect;
