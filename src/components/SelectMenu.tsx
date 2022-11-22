import {
  ChangeEvent,
  Dispatch,
  memo,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TUseGetElementPositionReturn } from '../hooks/useGetElementPosition';
import SelectMenuItem from './SelectMenuItem';
import useFilter from '../hooks/useFilter';
import { IInputSelect } from './InputSelect';
import { idTitle } from '../types/idTitleType';
import useGetCities from '../api/cities';
import ContactPopup from './ContactPopup';
import useDebounce from '../hooks/useDebounce';

interface ISelectMenu {
  buttonBounding: TUseGetElementPositionReturn;
  setShowSelectMenu: Dispatch<SetStateAction<boolean>>;
  setOptions: Dispatch<SetStateAction<idTitle[] | undefined>>;
  options: idTitle[] | undefined;
  name: IInputSelect['name'];
  register: IInputSelect['register'];
  type: IInputSelect['type'];
  backendSearch: IInputSelect['backendSearch'];
  sugestOption: IInputSelect['sugestOption'];
  label: string;
}
const SelectMenu = ({
  name,
  type,
  label,
  buttonBounding,
  setShowSelectMenu,
  setOptions,
  sugestOption,
  backendSearch,
  register,
  options,
}: ISelectMenu) => {
  const refSelectMenu = useRef<HTMLDivElement>(null);
  const refContactPoup = useRef<HTMLDivElement>(null);
  const [optionsFiltered, setOptionsFiltered] = useState(options);

  useEffect(() => {
    if (options) setOptionsFiltered(options);
  }, [options]);

  const filter = useFilter();

  useEffect(() => {
    // clicar fora para fechar
    const handleClick = (e: MouseEvent) => {
      if (
        !refSelectMenu.current?.contains(e.target as Element) &&
        !refContactPoup.current?.contains(e.target as Element)
      ) {
        setShowSelectMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  const [inputValue, setInputValue] = useState('');

  const debouncedSearchQuery = useDebounce(inputValue, 600);
  const getCities = useGetCities(debouncedSearchQuery);

  const handleChangeInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (backendSearch) {
      setInputValue(target.value);
    } else {
      setOptionsFiltered(filter(options, 'title', target.value));
    }
  };

  useEffect(() => {
    if (!inputValue && backendSearch) {
      setOptions([]);
    }
  }, [inputValue]);

  useEffect(() => {
    if (backendSearch) {
      if (getCities.data) {
        setOptions([...getCities.data.cities]);
      }
      if (getCities.isError) {
        setOptions([]);
      }
    }
  }, [getCities.data, getCities.isError, backendSearch]);

  const [showContactPopup, setShowContactPopup] = useState(false);

  return (
    <div
      ref={refSelectMenu}
      style={{
        top: `${buttonBounding.height + 3}px`,
        width: buttonBounding.width,
      }}
      className="absolute z-50"
    >
      <div className="max-h-56 overflow-auto overflow-x-hidden rounded-md  bg-white shadow-[0px_7px_16px_0_#d1d5db]">
        {/* input pesquisa  */}
        <div className="border-b border-solid border-gray-200">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none"
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            onChange={e => handleChangeInputSearch(e)}
          />
        </div>

        <div
          className={` ${
            type === 'Tag' && 'flex max-w-full flex-wrap gap-2 px-3 py-2'
          }`}
        >
          {/* botao de sugestao  */}
          {sugestOption && (
            <div className="w-full cursor-default px-3 py-2 text-left">
              <button
                type="button"
                onClick={() => setShowContactPopup(true)}
                className="inline-block text-sky-600 hover:text-sky-700"
              >
                Sugerir {label.replace(/ .*/, '').toLowerCase()}...
              </button>
            </div>
          )}

          {optionsFiltered?.map((o, i) => (
            <SelectMenuItem
              title={o.title}
              id={o.id}
              key={o.id}
              i={i}
              type={type}
              name={name}
              register={register}
            />
          ))}
          {/* {[...Array(800)].map(() => (
            <>
              {[
                (Math.random() + 1).toString(36).substring(7),
                (Math.random() + 1).toString(36).substring(7),
                (Math.random() + 1).toString(36).substring(7),
                (Math.random() + 1).toString(36).substring(7),
                (Math.random() + 1).toString(36).substring(7),
              ].map(p => (
                <SelectMenuItem label={p} id={p} key={p} type={type} />
              ))}
            </>
          ))} */}
        </div>
      </div>
      <div className="h-12 w-full bg-transparent" />

      {showContactPopup && (
        <ContactPopup
          setShowContactPopup={setShowContactPopup}
          popupTitle={`Sugerir ${label.replace(/ .*/, '').toLowerCase()}`}
          type="Suggestion"
          isEmailRequired={false}
          ref={refContactPoup}
        />
      )}
    </div>
  );
};

export default memo(SelectMenu);
