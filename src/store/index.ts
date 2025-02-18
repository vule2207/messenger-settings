import create from 'zustand';

export interface GlobalConfig {
  admin_interface: {
    messenger: {
      message_mysql: boolean;
      message_token_api: boolean;
    };
  };
}

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
  globalConfig: GlobalConfig | null;
  setGlobalConfig: (config: GlobalConfig) => void;
  auth: AuthState;
  setAuth: (auth: AuthState) => void;
  currentMenu?: CurrentMenuState;
  setCurrentMenu: (menu: CurrentMenuState) => void;
  triggerRefresh?: boolean;
  setRefresh?: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  globalConfig: null,
  setGlobalConfig: (config: GlobalConfig) => set(() => ({ globalConfig: config })),
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
