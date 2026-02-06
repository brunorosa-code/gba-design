import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { CountryProvider } from './src/contexts/CountryContext';
import AppHomeScreen from './src/screens/AppHomeScreen';
import HomeScreen from './src/screens/HomeScreen';

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
