import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Language } from '@teif/shared/types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to get saved language preference from localStorage
    const saved = localStorage.getItem('language') as Language | null;
    return saved || 'en';
  });

  // Sync HTML attributes with language state
  useEffect(() => {
    const html = document.documentElement;
    const dir = language === 'ar' ? 'rtl' : 'ltr';
    
    html.lang = language;
    html.dir = dir;
    html.setAttribute('lang', language);
    html.setAttribute('dir', dir);
    
    // Update document body direction for proper text flow
    document.body.dir = dir;
    document.body.lang = language;
    
    // Save language preference
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
