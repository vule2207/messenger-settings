import create from 'zustand';

interface CurrentMenu {
  title: string;
  url: string;
}

interface AppState {
  currentMenu?: CurrentMenu;
  setCurrentMenu: (menu: CurrentMenu) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // currentMenu state
  currentMenu: undefined,
  setCurrentMenu: (menu) => set(() => ({ currentMenu: menu })),
}));
