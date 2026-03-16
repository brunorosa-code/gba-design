import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { CountryProvider } from './shared/contexts/CountryContext';
import AppHomeScreen from './templates/screens/AppHomeScreen';
import HomeScreen from './templates/screens/HomeScreen';
import SelectBeneficiaryAccountScreen from './templates/screens/SelectBeneficiaryAccountScreen';
import SuccessScreen from './templates/screens/SuccessScreen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('appHome');
  const [showSelectBeneficiaryAccount, setShowSelectBeneficiaryAccount] = useState(false);

  // Graphik completa (arquivos .otf em assets/fonts/)
  const [fontsLoaded, fontError] = useFonts({
    'Graphik-Thin': require('./assets/fonts/Graphik-Thin.otf'),
    'Graphik-Extralight': require('./assets/fonts/Graphik-Extralight.otf'),
    'Graphik-Light': require('./assets/fonts/Graphik-Light.otf'),
    'Graphik-Regular': require('./assets/fonts/Graphik-Regular.otf'),
    'Graphik Regular': require('./assets/fonts/Graphik-Regular.otf'),
    'Graphik-Medium': require('./assets/fonts/Graphik-Medium.otf'),
    'Graphik Medium': require('./assets/fonts/Graphik-Medium.otf'),
    'GraphikMedium': require('./assets/fonts/Graphik-Medium.otf'),
    'Graphik-Semibold': require('./assets/fonts/Graphik-Semibold.otf'),
    'Graphik-Bold': require('./assets/fonts/Graphik-Bold.otf'),
    'Graphik-Black': require('./assets/fonts/Graphik-Black.otf'),
    'Graphik-Super': require('./assets/fonts/Graphik-Super.otf'),
    'Graphik-ThinItalic': require('./assets/fonts/Graphik-ThinItalic.otf'),
    'Graphik-ExtralightItalic': require('./assets/fonts/Graphik-ExtralightItalic.otf'),
    'Graphik-LightItalic': require('./assets/fonts/Graphik-LightItalic.otf'),
    'Graphik-RegularItalic': require('./assets/fonts/Graphik-RegularItalic.otf'),
    'Graphik-MediumItalic': require('./assets/fonts/Graphik-MediumItalic.otf'),
    'Graphik-SemiboldItalic': require('./assets/fonts/Graphik-SemiboldItalic.otf'),
    'Graphik-BoldItalic': require('./assets/fonts/Graphik-BoldItalic.otf'),
    'Graphik-BlackItalic': require('./assets/fonts/Graphik-BlackItalic.otf'),
    'Graphik-SuperItalic': require('./assets/fonts/Graphik-SuperItalic.otf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
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
        <HomeScreen
          onBack={() => setCurrentScreen('appHome')}
          onOpenSelectBeneficiaryAccount={() => setShowSelectBeneficiaryAccount(true)}
          onOpenSuccessScreen={() => setCurrentScreen('success')}
        />
      )}

      {currentScreen === 'success' && (
        <SuccessScreen
          title="Header title"
          subtitle="Sub title"
          items={[
            { id: '1', primaryLabel: 'Primary label', description: 'Description', secondaryLabel: 'Secondary' },
            { id: '2', primaryLabel: 'Primary label', description: 'Description', secondaryLabel: 'Secondary' },
          ]}
          primaryActionLabel="Primary action"
          onPrimaryAction={() => setCurrentScreen('gba')}
          showTopBar={true}
          screenTitle="Screen Title"
          onBack={() => setCurrentScreen('gba')}
          onHelp={() => {}}
        />
      )}

      {/* Modal tipo Bottom Sheet: overlay + bottom sheet sobre a tela atual, sem nova rota */}
      <SelectBeneficiaryAccountScreen
        visible={showSelectBeneficiaryAccount}
        onClose={() => setShowSelectBeneficiaryAccount(false)}
        onChooseOtherContact={() => setShowSelectBeneficiaryAccount(false)}
      />
    </CountryProvider>
  );
}
