import { useCountry } from '../contexts/CountryContext';
import { translations } from '../i18n/translations';

// Hook para usar traduções facilmente em qualquer componente
export function useTranslation() {
  const { currentCountry } = useCountry();

  // Função para pegar uma tradução
  // Uso: t('dashboard.title') retorna o título traduzido para o país atual
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[currentCountry.code];

    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        console.warn(`Tradução não encontrada: ${key} para ${currentCountry.code}`);
        return key;
      }
    }

    return value;
  };

  return { t, currentCountry };
}
