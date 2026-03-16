import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { CountryProvider } from './shared/contexts/CountryContext';
import AppHomeScreen from './templates/screens/AppHomeScreen';
import HomeScreen from './templates/screens/HomeScreen';
import ReviewScreen from './templates/screens/ReviewScreen';
import TransactionsScreen from './templates/screens/TransactionsScreen';
import DownloadStatementScreen from './templates/screens/DownloadStatementScreen';
import SearchTemplateScreen from './templates/screens/SearchTemplateScreen';
import PinScreen from './templates/screens/PinScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('pinScreen');
  const [showDownloadToast, setShowDownloadToast] = useState(false);

  const [fontsLoaded] = useFonts({
    'Graphik-Regular': require('./assets/fonts/Graphik-Regular-Trial.otf'),
    'Graphik-Medium': require('./assets/fonts/Graphik-Medium-Trial.otf'),
    'Graphik-Semibold': require('./assets/fonts/Graphik-Semibold-Trial.otf'),
    'Graphik-Bold': require('./assets/fonts/Graphik-Bold-Trial.otf'),
  });

  if (!fontsLoaded) return null;

  const handleDownloadComplete = () => {
    setShowDownloadToast(true);
    setCurrentScreen('transactions');
    setTimeout(() => setShowDownloadToast(false), 4000);
  };

  return (
    <CountryProvider>
      <StatusBar style={currentScreen === 'appHome' ? 'light' : 'auto'} />
      
      {currentScreen === 'appHome' && (
        <AppHomeScreen onNavigateToGBA={() => setCurrentScreen('gba')} />
      )}
      
      {currentScreen === 'gba' && (
        <HomeScreen
          onBack={() => setCurrentScreen('appHome')}
          onNavigateToReview={() => setCurrentScreen('review')}
          onNavigateToTransactions={() => setCurrentScreen('transactions')}
        />
      )}

      {currentScreen === 'review' && (
        <ReviewScreen
          onBack={() => setCurrentScreen('gba')}
          onConfirm={() => setCurrentScreen('gba')}
        />
      )}

      {currentScreen === 'transactions' && (
        <TransactionsScreen
          onBack={() => setCurrentScreen('gba')}
          onNavigateToDownload={() => setCurrentScreen('downloadStatement')}
          showToast={showDownloadToast}
        />
      )}

      {currentScreen === 'downloadStatement' && (
        <DownloadStatementScreen
          onBack={() => setCurrentScreen('transactions')}
          onDownloadComplete={handleDownloadComplete}
        />
      )}

      {currentScreen === 'searchTemplate' && (
        <SearchTemplateScreen
          onBack={() => setCurrentScreen('gba')}
        />
      )}

      {currentScreen === 'pinScreen' && (
        <PinScreen
          onBack={() => setCurrentScreen('gba')}
          onComplete={(pin) => setCurrentScreen('gba')}
        />
      )}
    </CountryProvider>
  );
}
