/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useRef, useState } from 'react';
import {
  Control,
  FieldName,
  FieldValues,
  UseFormRegister,
  useWatch,
} from 'react-hook-form';
import { HiSelector } from 'react-icons/hi';
import { IoIosCloseCircle } from 'react-icons/io';
import TextareaAutosize from 'react-textarea-autosize';
import useGetElementPosition, {
  TUseGetElementPositionReturn,
} from '../hooks/useGetElementPosition';
import InputLabel from './InputLabel';
import SelectMenu from './SelectMenu';

export interface IInputSelect {
  label: string;
  name: FieldName<FieldValues>;
  type: 'Single' | 'Multiple' | 'Tag';
  onClickClose?: null | (() => void);
  hasError?: boolean;
  register: UseFormRegister<FieldValues> | any;
  control?: Control<FieldValues> | any;
  options?: { id: string; title: string }[];
  backendSearch?: boolean;
  sugestOption?: boolean;
  showAsterisk?: boolean;
}

const InputSelect = ({
  label,
  name,
  type,
  onClickClose,
  hasError,
  register,
  control,
  options: optionsParam,
  backendSearch,
  sugestOption,
  showAsterisk,
}: IInputSelect) => {
  const [options, setOptions] = useState(optionsParam);

  useEffect(() => {
    setOptions(optionsParam);
  }, [optionsParam]);

  const optionsSelected = useWatch({ control, name });

  const [showSelectMenu, setShowSelectMenu] = useState(false);

  const [buttonSelectBounding, setButtonSelectBounding] =
    useState<TUseGetElementPositionReturn>({
      top: 0,
      left: 0,
      height: 0,
      width: 0,
    });

  const refButtonSelect = useRef<HTMLButtonElement>(null);

  const openMenu = () => {
    setShowSelectMenu(true);
    setButtonSelectBounding(useGetElementPosition(refButtonSelect.current));
  };

  // fix position if select multiple breaks line(text area  )
  useEffect(() => {
    if (type === 'Single' && optionsSelected) {
      setShowSelectMenu(false);
    }
    setButtonSelectBounding(useGetElementPosition(refButtonSelect.current));
  }, [optionsSelected]);

  const handleSetInputValue = () => {
    if (type === 'Single') {
      return options
        ?.filter(o => optionsSelected === o.id)
        .map(o => o.title)
        .join(', ');
    }
    if (type === 'Multiple') {
      return options
        ?.filter(o => optionsSelected?.includes(o.id))
        .map(o => o.title)
        .join(', ');
    }
    return 'Erro';
  };

  useEffect(() => {
    if (hasError) {
      refButtonSelect.current?.focus();
    }
  }, [hasError]);

  return (
    <div className="w-full">
      <div className="relative w-full text-sm">
        <div className="mb-2.5 flex items-center justify-between">
          <InputLabel name={name} showAsterisk={showAsterisk} className="mb-0">
            {label}
          </InputLabel>

          {onClickClose && (
            <button
              type="button"
              onClick={onClickClose}
              className="flex items-center space-x-2 pr-2 text-sm text-gray-500 hover:text-gray-600"
            >
              <span>Excluir {label.replace(/ .*/, '').toLowerCase()}</span>
              <IoIosCloseCircle className="text-lg" />
            </button>
          )}
        </div>

        <HiSelector className="absolute top-[calc(50%-6px)] right-2 h-5 w-5 translate-y-1/2 text-gray-700" />
        <div className="relative">
          <button
            type="button"
            className={`flex min-h-[38px] w-full items-center rounded-md border border-solid border-gray-300 pr-9
            shadow-md ${hasError && 'border-red-500'}`}
            ref={refButtonSelect}
            onFocus={openMenu}
          >
            {type === 'Tag' ? (
              <div className="flex w-full flex-wrap gap-2 overflow-hidden px-3 py-2">
                {/* {optionsSelected?.map(o => (
                      <div
                        key={o}
                        className="flex items-center rounded-lg bg-blue-100 py-1 px-2 text-gray-800"
                      >
                        {o}
                        <IoClose className="ml-1 h-4 w-4 pt-0.5 text-gray-500" />
                      </div>
                    ))} */}
              </div>
            ) : (
              <TextareaAutosize
                disabled
                aria-label="Selecione sua profissão"
                className="h-full w-full resize-none rounded-md bg-transparent py-2 px-3 text-left hover:cursor-pointer
                 focus:outline-none"
                id={name}
                value={handleSetInputValue()}
                onChange={() => null}
              />
            )}
          </button>

          {showSelectMenu && (options?.length || backendSearch) && (
            <SelectMenu
              type={type}
              name={name}
              register={register}
              options={options}
              label={label}
              buttonBounding={buttonSelectBounding}
              setShowSelectMenu={setShowSelectMenu}
              setOptions={setOptions}
              backendSearch={backendSearch}
              sugestOption={sugestOption}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default InputSelect;
