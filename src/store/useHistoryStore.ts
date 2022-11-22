import create from 'zustand';

interface IHistory {
  history: string[];
  addHistory: (path: string) => void;
}

const useHistoryStore = create<IHistory>((set, get) => ({
  history: [],

  addHistory: (path: string) => {
    const copy = [...get().history];
    copy.push(path);
    set(() => ({ history: copy }));
  },
}));

export default useHistoryStore;
