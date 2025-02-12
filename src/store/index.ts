import create from 'zustand';

export interface AuthState {
  isLoggedIn: boolean;
  isCheckingLoggedIn: boolean;
  token: string | null;
}

export interface CurrentMenuState {
  title: string;
  url: string;
}

interface AppState {
  auth: AuthState;
  setAuth: (auth: AuthState) => void;
  currentMenu?: CurrentMenuState;
  setCurrentMenu: (menu: CurrentMenuState) => void;
  triggerRefresh?: boolean;
  setRefresh?: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // auth state
  auth: {
    isLoggedIn: false,
    isCheckingLoggedIn: false,
    token: null,
  },
  setAuth: (auth) => set(() => ({ auth: auth })),

  // currentMenu state
  currentMenu: undefined,
  setCurrentMenu: (menu) => set(() => ({ currentMenu: menu })),

  // refresh state
  triggerRefresh: false,
  setRefresh: () => set((state) => ({ triggerRefresh: !state.triggerRefresh })),
}));
