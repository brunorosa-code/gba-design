import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { CountryProvider } from './shared/contexts/CountryContext';
import AppHomeScreen from './screens/AppHomeScreen';
import HomeScreen from './screens/HomeScreen';
import ReviewScreen from './screens/ReviewScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('review');

  const [fontsLoaded] = useFonts({
    'NuSansDisplay-Regular': require('./assets/fonts/NuSansDisplay-Regular.otf'),
    'NuSansDisplay-Medium': require('./assets/fonts/NuSansDisplay-Medium.otf'),
    'NuSansDisplay-Semibold': require('./assets/fonts/NuSansDisplay-Semibold.otf'),
    'NuSansText-Regular': require('./assets/fonts/NuSansText-Regular.otf'),
    'NuSansText-Medium': require('./assets/fonts/NuSansText-Medium.otf'),
    'NuSansText-Semibold': require('./assets/fonts/NuSansText-Semibold.otf'),
    'NuSansText-Bold': require('./assets/fonts/NuSansText-Bold.otf'),
    'Nu Sans': require('./assets/fonts/Nu Sans-Regular.otf'),
    'Nu Sans Medium': require('./assets/fonts/Nu Sans-Medium.otf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#820AD1" />
      </View>
    );
  }

  return (
    <CountryProvider>
      <StatusBar style={currentScreen === 'appHome' ? 'light' : 'auto'} />
      
      {currentScreen === 'appHome' && (
        <AppHomeScreen onNavigateToGBA={() => setCurrentScreen('gba')} />
      )}
      
      {currentScreen === 'gba' && (
        <HomeScreen onBack={() => setCurrentScreen('appHome')} />
      )}

      {currentScreen === 'review' && (
        <ReviewScreen onClose={() => setCurrentScreen('appHome')} />
      )}
    </CountryProvider>
  );
}
