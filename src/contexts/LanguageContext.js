import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTranslations } from '../localization';
import { API_CONFIG } from '../constants/api';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(API_CONFIG.DEFAULT_LANGUAGE);
  const [translations, setTranslations] = useState(getTranslations(API_CONFIG.DEFAULT_LANGUAGE));

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
      if (savedLanguage) {
        changeLanguage(savedLanguage);
      }
    } catch (error) {
      console.log('Error loading language:', error);
    }
  };

  const changeLanguage = async (newLanguage) => {
    try {
      setLanguage(newLanguage);
      setTranslations(getTranslations(newLanguage));
      await AsyncStorage.setItem('selectedLanguage', newLanguage);
    } catch (error) {
      console.log('Error saving language:', error);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, translations, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
