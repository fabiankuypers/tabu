import { useState, useEffect } from 'react';
import { languageStore, type Language } from '../stores/languageStore';

export const useGlobalLanguage = () => {
  const [language, setLanguage] = useState<Language>(languageStore.language);

  useEffect(() => {
    // Subscribe to language changes
    const unsubscribe = languageStore.subscribe((newLanguage) => {
      setLanguage(newLanguage);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  const setGlobalLanguage = (lang: Language) => {
    languageStore.setLanguage(lang);
  };

  const t = (key: string): string => {
    return languageStore.t(key);
  };

  return {
    language,
    setLanguage: setGlobalLanguage,
    t
  };
};