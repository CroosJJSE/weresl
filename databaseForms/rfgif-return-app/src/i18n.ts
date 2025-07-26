import en from './locales/en.json';
import ta from './locales/ta.json';
import si from './locales/si.json';
import { reactive, watchEffect } from 'vue';

const LANGS = ['en', 'ta', 'si'] as const;
type Lang = typeof LANGS[number];

const translations: Record<Lang, Record<string, string>> = { en, ta, si };

// Reactive language state
const state = reactive({
  currentLang: (localStorage.getItem('lang') as Lang) || 'en',
});

export function setLang(lang: Lang) {
  if (LANGS.includes(lang)) {
    state.currentLang = lang;
    localStorage.setItem('lang', lang);
    // Update body class for font
    document.body.classList.remove('lang-en', 'lang-ta', 'lang-si');
    document.body.classList.add(`lang-${lang}`);
  }
}

export function getLang(): Lang {
  return state.currentLang;
}

export function t(key: string): string {
  const lang = state.currentLang;
  const value = translations[lang][key];
  if (value && value.length > 0) {
    return value;
  }
  // fallback to English
  const enValue = translations['en'][key];
  if (enValue && enValue.length > 0) {
    return enValue;
  }
  // fallback to key itself
  return key;
}

// Ensure body class is set on load
watchEffect(() => {
  document.body.classList.remove('lang-en', 'lang-ta', 'lang-si');
  document.body.classList.add(`lang-${state.currentLang}`);
}); 