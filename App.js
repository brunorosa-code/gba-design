import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { CountryProvider } from './shared/contexts/CountryContext';
import AppHomeScreen from './screens/AppHomeScreen';
import HomeScreen from './screens/HomeScreen';
import BaseScreen from './templates/BaseScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('baseScreen');

  return (
    <CountryProvider>
      <StatusBar style={currentScreen === 'appHome' ? 'light' : 'auto'} />

      {currentScreen === 'baseScreen' && (
        <BaseScreen />
      )}
      
      {currentScreen === 'appHome' && (
        <AppHomeScreen onNavigateToGBA={() => setCurrentScreen('gba')} />
      )}
      
      {currentScreen === 'gba' && (
        <HomeScreen onBack={() => setCurrentScreen('appHome')} />
      )}
    </CountryProvider>
  );
}
