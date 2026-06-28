import React, { createContext, useContext, useState, useEffect } from 'react';

type LanguageType = 'hi' | 'en' | 'mr' | 'pa' | 'bn' | 'ta' | 'te' | 'gu';

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const [highContrast, setHighContrast] = useState<boolean>(() => {
    const saved = localStorage.getItem('highContrast');
    return saved ? JSON.parse(saved) : false;
  });

  const [language, setLanguageState] = useState<LanguageType>(() => {
    return (localStorage.getItem('language') as LanguageType) || 'en';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    localStorage.setItem('highContrast', JSON.stringify(highContrast));
  }, [highContrast]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleHighContrast = () => setHighContrast(!highContrast);
  const setLanguage = (lang: LanguageType) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        highContrast,
        toggleHighContrast,
        language,
        setLanguage,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
