import React, { createContext, useContext, useState } from 'react';

// Lista de países disponíveis
export const COUNTRIES = {
  brasil: {
    code: 'brasil',
    name: 'Brasil',
    flag: '🇧🇷',
    language: 'pt-BR',
    currency: 'BRL',
    currencySymbol: 'R$',
  },
  mexico: {
    code: 'mexico',
    name: 'México',
    flag: '🇲🇽',
    language: 'es-MX',
    currency: 'MXN',
    currencySymbol: '$',
  },
  colombia: {
    code: 'colombia',
    name: 'Colombia',
    flag: '🇨🇴',
    language: 'es-CO',
    currency: 'COP',
    currencySymbol: '$',
  },
  usa: {
    code: 'usa',
    name: 'United States',
    flag: '🇺🇸',
    language: 'en-US',
    currency: 'USD',
    currencySymbol: '$',
  },
};

// Contexto para compartilhar o país selecionado em todo o app
const CountryContext = createContext();

// Provider que envolve o app e disponibiliza o país selecionado
export function CountryProvider({ children }) {
  const [currentCountry, setCurrentCountry] = useState(COUNTRIES.brasil);

  const selectCountry = (countryCode) => {
    if (COUNTRIES[countryCode]) {
      setCurrentCountry(COUNTRIES[countryCode]);
    }
  };

  return (
    <CountryContext.Provider value={{ currentCountry, selectCountry, countries: COUNTRIES }}>
      {children}
    </CountryContext.Provider>
  );
}

// Hook para usar o contexto de país em qualquer componente
export function useCountry() {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error('useCountry deve ser usado dentro de um CountryProvider');
  }
  return context;
}
