import { translations, type Lang } from '@/translations';

const LANG_KEY = 'margadarshi_lang';

export function getCurrentLang(): Lang {
  return (localStorage.getItem(LANG_KEY) as Lang) || 'en';
}

export function setCurrentLang(lang: Lang): void {
  localStorage.setItem(LANG_KEY, lang);
}

export function getTranslations(lang: Lang) {
  return translations[lang];
}
