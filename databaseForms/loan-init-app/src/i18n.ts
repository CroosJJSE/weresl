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
    // console.log('[i18n] Language set to:', lang); // Removed for cleaner console
  }
}

export function getLang(): Lang {
  return state.currentLang;
}

export function t(key: string): string {
  const lang = state.currentLang;
  const value = translations[lang][key];
  if (value && value.length > 0) {
    // console.log(`[i18n] t('${key}') -> '${value}' [${lang}]`); // Removed for cleaner console
    return value;
  }
  // fallback to English
  const enValue = translations['en'][key];
  if (enValue && enValue.length > 0) {
    // console.log(`[i18n] t('${key}') -> '${enValue}' [en fallback]`); // Removed for cleaner console
    return enValue;
  }
  // fallback to key itself
  // console.log(`[i18n] t('${key}') -> '${key}' [missing in all languages]`); // Removed for cleaner console
  return key;
}

// Ensure body class is set on load
watchEffect(() => {
  document.body.classList.remove('lang-en', 'lang-ta', 'lang-si');
  document.body.classList.add(`lang-${state.currentLang}`);
}); 