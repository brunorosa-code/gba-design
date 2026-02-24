// Arquivo de traduções para cada país
// Adicione novos textos aqui conforme necessário

export const translations = {
  brasil: {
    // Geral
    welcome: 'Bem-vindo',
    selectCountry: 'Selecionar país',
    continue: 'Continuar',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    back: 'Voltar',
    
    // GBA Dashboard
    dashboard: {
      title: 'Minha Conta Global',
      balance: 'Saldo disponível',
      moneyIn: 'Depositar',
      transferOut: 'Transferir',
      paymentAssistant: 'Assistente de Pagamento',
      moneyBoxes: 'Cofrinhos',
    },
    
    // Money In
    moneyIn: {
      title: 'Depositar dinheiro',
      selectMethod: 'Selecione como depositar',
      pix: 'PIX',
      bankTransfer: 'Transferência bancária',
      boleto: 'Boleto',
    },
    
    // Transfer Out
    transferOut: {
      title: 'Transferir dinheiro',
      selectDestination: 'Para onde deseja transferir?',
    },
  },
  
  mexico: {
    // Geral
    welcome: 'Bienvenido',
    selectCountry: 'Seleccionar país',
    continue: 'Continuar',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    back: 'Volver',
    
    // GBA Dashboard
    dashboard: {
      title: 'Mi Cuenta Global',
      balance: 'Saldo disponible',
      moneyIn: 'Depositar',
      transferOut: 'Transferir',
      paymentAssistant: 'Asistente de Pago',
      moneyBoxes: 'Alcancías',
    },
    
    // Money In
    moneyIn: {
      title: 'Depositar dinero',
      selectMethod: 'Selecciona cómo depositar',
      spei: 'SPEI',
      oxxo: 'OXXO',
      bankTransfer: 'Transferencia bancaria',
    },
    
    // Transfer Out
    transferOut: {
      title: 'Transferir dinero',
      selectDestination: '¿A dónde deseas transferir?',
    },
  },
  
  colombia: {
    // Geral
    welcome: 'Bienvenido',
    selectCountry: 'Seleccionar país',
    continue: 'Continuar',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    back: 'Volver',
    
    // GBA Dashboard
    dashboard: {
      title: 'Mi Cuenta Global',
      balance: 'Saldo disponible',
      moneyIn: 'Depositar',
      transferOut: 'Transferir',
      paymentAssistant: 'Asistente de Pago',
      moneyBoxes: 'Alcancías',
    },
    
    // Money In
    moneyIn: {
      title: 'Depositar dinero',
      selectMethod: 'Selecciona cómo depositar',
      pse: 'PSE',
      efecty: 'Efecty',
      bankTransfer: 'Transferencia bancaria',
    },
    
    // Transfer Out
    transferOut: {
      title: 'Transferir dinero',
      selectDestination: '¿A dónde deseas transferir?',
    },
  },
  
  usa: {
    // Geral
    welcome: 'Welcome',
    selectCountry: 'Select country',
    continue: 'Continue',
    cancel: 'Cancel',
    confirm: 'Confirm',
    back: 'Back',
    
    // GBA Dashboard
    dashboard: {
      title: 'My Global Account',
      balance: 'Available balance',
      moneyIn: 'Deposit',
      transferOut: 'Transfer',
      paymentAssistant: 'Payment Assistant',
      moneyBoxes: 'Money Boxes',
    },
    
    // Money In
    moneyIn: {
      title: 'Deposit money',
      selectMethod: 'Select deposit method',
      ach: 'ACH Transfer',
      wire: 'Wire Transfer',
      debitCard: 'Debit Card',
    },
    
    // Transfer Out
    transferOut: {
      title: 'Transfer money',
      selectDestination: 'Where would you like to transfer?',
    },
  },
};

// Hook helper para pegar tradução do país atual
export function getTranslation(country, key) {
  const keys = key.split('.');
  let value = translations[country.code];
  
  for (const k of keys) {
    if (value && value[k]) {
      value = value[k];
    } else {
      return key; // Retorna a chave se não encontrar tradução
    }
  }
  
  return value;
}
