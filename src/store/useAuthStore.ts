import create from 'zustand';

type TAuth = {
  token: string | null;
  status: 'idle' | 'signOut' | 'signIn';
};

const useAuthStore = create<TAuth>((set, get) => ({
  status: 'idle',
  token: null,
}));

export default useAuthStore;
