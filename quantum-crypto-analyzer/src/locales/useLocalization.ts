import { useState, useEffect } from 'react';
import en from './en.json';
import ar from './ar.json';

const translations = { en, ar };

export const useLocalization = () => {
  const [language, setLanguage] = useState('ar');

  const t = (key, params = {}) => {
    let translation = translations[language][key] || key;
    Object.keys(params).forEach(param => {
      translation = translation.replace(`{${param}}`, params[param]);
    });
    return translation;
  };

  return { language, setLanguage, t };
};
