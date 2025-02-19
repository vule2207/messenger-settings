import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';

import Storages from '@/utils/storages/ls';

import translationENG from '../assets/lang/en.json';
import translationKO from '../assets/lang/ko.json';
import translationVI from '../assets/lang/vi.json';

const Ls = new Storages();

const resources = {
  en: {
    translation: translationENG,
  },
  ko: {
    translation: translationKO,
  },
  vi: {
    translation: translationVI,
  },
};

export const getCurrentLang = () => {
  return Ls.get('hanbiro.admin.lang') ? (Ls.get('hanbiro.admin.lang') as string) : 'ko';
};

i18n.use(initReactI18next).init({
  resources: resources,
  lng: getCurrentLang(),
  fallbackLng: 'ko',
});

window.i18n = i18n;
export default i18n;
