import en from './en';
import fr from './fr';
import es from './es';
import de from './de';
import ru from './ru';
import el from './el';
import ar from './ar';

const translations = {
  en,
  fr,
  es,
  de,
  ru,
  el,
  ar
};

export const getTranslations = (languageCode) => {
  return translations[languageCode] || translations.en;
};

export default translations;
