import { idTitle } from '../types/idTitleType';

const useFilter = () => {
  const filter = (
    arr: idTitle[] | undefined,
    prop: 'title' | 'id',
    term: string
  ) => {
    const filtered = arr?.filter(e =>
      e[prop]
        .toUpperCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .includes(term.toUpperCase())
    );
    return filtered;
  };

  return filter;
};

export default useFilter;
