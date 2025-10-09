export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English (US)', nativeName: 'English' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' }
];

export const getLanguageName = (code) => {
  const language = SUPPORTED_LANGUAGES.find(lang => lang.code === code);
  return language ? language.nativeName : 'English';
};
