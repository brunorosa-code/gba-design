import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { CountryProvider } from './shared/contexts/CountryContext';
import AppHomeScreen from './screens/AppHomeScreen';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('appHome');

  return (
    <CountryProvider>
      <StatusBar style={currentScreen === 'appHome' ? 'light' : 'auto'} />
      
      {currentScreen === 'appHome' && (
        <AppHomeScreen onNavigateToGBA={() => setCurrentScreen('gba')} />
      )}
      
      {currentScreen === 'gba' && (
        <HomeScreen onBack={() => setCurrentScreen('appHome')} />
      )}
    </CountryProvider>
  );
}
