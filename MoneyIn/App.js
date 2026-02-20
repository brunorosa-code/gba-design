import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { CountryProvider } from './src/contexts/CountryContext';
import HomeScreen from './src/screens/HomeScreen';
import GBADashboardUSAScreen from './src/screens/GBADashboardUSAScreen';

export default function App() {
  const [screen, setScreen] = useState('home'); // 'home' | 'gba-dashboard-usa'

  return (
    <CountryProvider>
      <StatusBar style="auto" />
      {screen === 'home' && (
        <HomeScreen
          onOpenGBADashboardUSA={() => setScreen('gba-dashboard-usa')}
        />
      )}
      {screen === 'gba-dashboard-usa' && (
        <GBADashboardUSAScreen onBack={() => setScreen('home')} />
      )}
    </CountryProvider>
  );
}
