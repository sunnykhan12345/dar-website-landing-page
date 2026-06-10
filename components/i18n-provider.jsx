'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { defaultLocale, getDictionary, locales } from '@/lib/i18n';

const I18nContext = createContext(null);

function detectLocale() {
  if (typeof window === 'undefined') return defaultLocale;
  const saved = window.localStorage.getItem('dar_locale');
  if (locales.includes(saved)) return saved;
  const browser = window.navigator.language?.toLowerCase() || '';
  return browser.startsWith('fr') ? 'fr' : defaultLocale;
}

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(defaultLocale);

  useEffect(() => {
    setLocaleState(detectLocale());
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') document.documentElement.lang = locale;
    if (typeof window !== 'undefined') window.localStorage.setItem('dar_locale', locale);
  }, [locale]);

  const value = useMemo(() => ({
    locale,
    t: getDictionary(locale),
    setLocale: (nextLocale) => setLocaleState(locales.includes(nextLocale) ? nextLocale : defaultLocale),
    toggleLocale: () => setLocaleState((current) => (current === 'en' ? 'fr' : 'en')),
  }), [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used inside I18nProvider');
  return context;
}
