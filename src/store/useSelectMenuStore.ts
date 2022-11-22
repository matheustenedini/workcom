import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { IInputSelect } from '../components/InputSelect';

interface ISelectMenuInfo {
  name: IInputSelect['name'];
  type: IInputSelect['type'] | '';
}

export interface IOptions {
  title: string;
  id: string;
}

interface ISelectMenuStore {
  selectMenuInfo: ISelectMenuInfo;
  isDirty: boolean;

  optionHoveredId: string;
  handleOptionHover: (optionId: string) => void;

  optionsSelected: IOptions[];
  handleSelectOption: (option: IOptions) => void;
  handleSelectOptions: (options: IOptions[]) => void;
  handleKeyDown: (key: string, options: IOptions[]) => void;

  checkHasError: () => boolean;
  clearStore: () => void;
}

const useSelectMenuStore = create<ISelectMenuStore>(
  subscribeWithSelector((set, get) => ({
    selectMenuInfo: {
      name: '',
      type: '',
    },

    // verifica se tem algum menu ainda aberto
    checkHasError: () => {
      if (get().selectMenuInfo.name !== '') {
        return true;
      }
      return false;
    },

    // isDirty é utilizado na hora do setValue (inputSelect)
    isDirty: false,

    // showing hover state
    optionHoveredId: '',
    handleOptionHover: optionId => {
      set(() => ({
        optionHoveredId: optionId,
      }));
    },

    optionsSelected: [],

    handleSelectOption: option => {
      if (get().selectMenuInfo.type === 'Single') {
        set(() => ({ optionsSelected: [option] }));
      }

      if (
        get().selectMenuInfo.type === 'Multiple' ||
        get().selectMenuInfo.type === 'Tag'
      ) {
        // AQUI
        if (
          get()
            .optionsSelected.map(o => o.id)
            .includes(option.id)
        ) {
          set(state => ({
            optionsSelected: state.optionsSelected.filter(
              i => i.id !== option.id
            ),
          }));
        } else {
          set(state => ({
            optionsSelected: [...state.optionsSelected, option],
          }));
        }
      }
      set(() => ({ isDirty: true }));
    },
    // usada para ativar os checkbox quando fecha e abre um menu do tipo multiplo
    handleSelectOptions: options => {
      set(() => ({ optionsSelected: [...options] }));
    },

    // handle key event
    handleKeyDown: (key, options) => {
      const hoveredOptionIndex = options.findIndex(
        o => o.id === get().optionHoveredId
      );

      if (key === 'ArrowUp') {
        set(() => ({ optionHoveredId: options[hoveredOptionIndex - 1].id }));
      } else if (key === 'ArrowDown') {
        set(() => ({ optionHoveredId: options[hoveredOptionIndex + 1].id }));
      }
    },

    clearStore: () =>
      set({
        selectMenuInfo: {
          name: '',
          type: '',
        },
        isDirty: false,
        optionHoveredId: '',
        optionsSelected: [],
      }),
  }))
);
// if (process.env.NODE_ENV === 'development') {
// mountStoreDevtool('Store', useSelectMenuStore);
// }

export default useSelectMenuStore;
