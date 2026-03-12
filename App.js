import React, { useState, useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { CountryProvider } from './shared/contexts/CountryContext';
import AppHomeScreen from './screens/AppHomeScreen';
import HomeScreen from './screens/HomeScreen';
import BaseScreen from './templates/BaseScreen';
import InputAmountScreen from './sandbox/bruno/InputAmountScreen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('inputAmount');

  const [fontsLoaded] = useFonts({
    'Graphik-Thin': require('./assets/fonts/Graphik-Thin-Trial.otf'),
    'Graphik-Extralight': require('./assets/fonts/Graphik-Extralight-Trial.otf'),
    'Graphik-Light': require('./assets/fonts/Graphik-Light-Trial.otf'),
    'Graphik-Regular': require('./assets/fonts/Graphik-Regular-Trial.otf'),
    'Graphik-Medium': require('./assets/fonts/Graphik-Medium-Trial.otf'),
    'Graphik-Semibold': require('./assets/fonts/Graphik-Semibold-Trial.otf'),
    'Graphik-Bold': require('./assets/fonts/Graphik-Bold-Trial.otf'),
    'Graphik-Black': require('./assets/fonts/Graphik-Black-Trial.otf'),
    'Graphik-Super': require('./assets/fonts/Graphik-Super-Trial.otf'),
    'Graphik-ThinItalic': require('./assets/fonts/Graphik-ThinItalic-Trial.otf'),
    'Graphik-ExtralightItalic': require('./assets/fonts/Graphik-ExtralightItalic-Trial.otf'),
    'Graphik-LightItalic': require('./assets/fonts/Graphik-LightItalic-Trial.otf'),
    'Graphik-RegularItalic': require('./assets/fonts/Graphik-RegularItalic-Trial.otf'),
    'Graphik-MediumItalic': require('./assets/fonts/Graphik-MediumItalic-Trial.otf'),
    'Graphik-SemiboldItalic': require('./assets/fonts/Graphik-SemiboldItalic-Trial.otf'),
    'Graphik-BoldItalic': require('./assets/fonts/Graphik-BoldItalic-Trial.otf'),
    'Graphik-BlackItalic': require('./assets/fonts/Graphik-BlackItalic-Trial.otf'),
    'Graphik-SuperItalic': require('./assets/fonts/Graphik-SuperItalic-Trial.otf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <CountryProvider>
        <StatusBar style={currentScreen === 'appHome' ? 'light' : 'auto'} />

        {currentScreen === 'inputAmount' && (
          <InputAmountScreen />
        )}

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
    </View>
  );
}
