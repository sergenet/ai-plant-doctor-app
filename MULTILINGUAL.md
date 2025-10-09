# Multilingual Support

The AI Plant Doctor app now supports 7 languages to serve users worldwide.

## Supported Languages

1. **English (en)** 🇬🇧 - Default language
2. **Spanish (es)** 🇪🇸 - Español
3. **French (fr)** 🇫🇷 - Français
4. **German (de)** 🇩🇪 - Deutsch
5. **Portuguese (pt)** 🇵🇹 - Português
6. **Italian (it)** 🇮🇹 - Italiano
7. **Japanese (ja)** 🇯🇵 - 日本語

## How to Use

### For Users
1. Open the app and navigate to the Home screen
2. Tap the **🌐 Language** button in the top-right corner
3. Select your preferred language from the list
4. The app will immediately switch to the selected language
5. Your language preference is saved and will be remembered next time you open the app

### For Developers

#### Project Structure
```
src/
├── i18n/
│   └── index.js           # i18n configuration
├── locales/
│   ├── en.json            # English translations
│   ├── es.json            # Spanish translations
│   ├── fr.json            # French translations
│   ├── de.json            # German translations
│   ├── pt.json            # Portuguese translations
│   ├── it.json            # Italian translations
│   └── ja.json            # Japanese translations
└── components/
    └── LanguageSelector.js # Language selection modal
```

#### Using Translations in Components

1. Import the `useTranslation` hook:
```javascript
import { useTranslation } from 'react-i18next';
```

2. Use the hook in your component:
```javascript
export default function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <Text>{t('home.title')}</Text>
  );
}
```

3. For translations with variables:
```javascript
const message = t('results.shareMessage', {
  disease: 'Leaf spot',
  treatment: 'Apply fungicide'
});
```

#### Adding a New Translation Key

1. Add the key to all language files in `src/locales/`
2. Use the key in your component with `t('category.key')`

Example:
```json
// en.json
{
  "myCategory": {
    "myKey": "My English text"
  }
}

// es.json
{
  "myCategory": {
    "myKey": "Mi texto en español"
  }
}
```

#### Adding a New Language

1. Create a new JSON file in `src/locales/` (e.g., `zh.json` for Chinese)
2. Add all translation keys with values in the new language
3. Import the file in `src/i18n/index.js`:
```javascript
const zh = require('../locales/zh.json');
```
4. Add it to the resources object:
```javascript
resources: {
  // ... existing languages
  zh: { translation: zh }
}
```
5. Add the language to the `LANGUAGES` array in `src/components/LanguageSelector.js`:
```javascript
{ code: 'zh', name: '中文', flag: '🇨🇳' }
```

## Technical Details

- **i18n Library**: i18next with react-i18next
- **Storage**: Language preference is stored in AsyncStorage
- **Detection**: Automatically loads the saved language on app start
- **Fallback**: English (en) is used if a translation is missing

## Translation Coverage

All user-facing text in the following screens is translated:
- ✅ Home Screen
- ✅ Camera Screen
- ✅ Premium Screen
- ✅ Profile Screen
- ✅ Results Screen
- ✅ Navigation titles
- ✅ Alert messages
- ✅ Button labels

## Future Enhancements

- Add more languages based on user demand
- Implement RTL (Right-to-Left) support for Arabic and Hebrew
- Add language auto-detection based on device settings
- Provide in-app language switching animation
