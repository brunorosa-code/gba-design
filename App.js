import React, { useState, useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { CountryProvider } from './shared/contexts/CountryContext';
import AppHomeScreen from './templates/screens/AppHomeScreen';
import HomeScreen from './templates/screens/HomeScreen';
import SelectBeneficiaryAccountScreen from './templates/screens/SelectBeneficiaryAccountScreen';
import SuccessScreen from './templates/screens/SuccessScreen';
import PinScreen from './templates/screens/PinScreen';
import SearchTemplateScreen from './templates/screens/SearchTemplateScreen';
import ReviewScreen from './templates/screens/ReviewScreen';
import InputAmountScreen from './templates/screens/InputAmountScreen';
import TemplatesArea from './templates/screens/TemplatesArea';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('templatesArea');
  const [showSelectBeneficiaryAccount, setShowSelectBeneficiaryAccount] = useState(false);
  const [successScreenBackTo, setSuccessScreenBackTo] = useState('templatesArea');

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
        <StatusBar hidden />

        {currentScreen === 'templatesArea' && (
          <TemplatesArea
            onNavigate={(screen) => {
              if (screen === 'selectBeneficiaryAccount') {
                setShowSelectBeneficiaryAccount(true);
              } else {
                if (screen === 'success') setSuccessScreenBackTo('templatesArea');
                setCurrentScreen(screen);
              }
            }}
            onBackPress={() => {}}
            onActionPress={() => {}}
          />
        )}

        {currentScreen === 'inputAmount' && (
          <InputAmountScreen onBack={() => setCurrentScreen('templatesArea')} />
        )}

        {currentScreen === 'pin' && (
          <PinScreen
            onBack={() => setCurrentScreen('templatesArea')}
            onComplete={() => setCurrentScreen('templatesArea')}
          />
        )}

        {currentScreen === 'searchTemplate' && (
          <SearchTemplateScreen onBack={() => setCurrentScreen('templatesArea')} />
        )}

        {currentScreen === 'review' && (
          <ReviewScreen onClose={() => setCurrentScreen('templatesArea')} />
        )}

        {currentScreen === 'appHome' && (
          <AppHomeScreen onNavigateToGBA={() => setCurrentScreen('gba')} />
        )}

        {currentScreen === 'gba' && (
          <HomeScreen
            onBack={() => setCurrentScreen('appHome')}
            onOpenSelectBeneficiaryAccount={() => setShowSelectBeneficiaryAccount(true)}
            onOpenSuccessScreen={() => {
              setSuccessScreenBackTo('gba');
              setCurrentScreen('success');
            }}
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
            onPrimaryAction={() => setCurrentScreen(successScreenBackTo)}
            showTopBar={true}
            screenTitle="Screen Title"
            onBack={() => setCurrentScreen(successScreenBackTo)}
            onHelp={() => {}}
          />
        )}

        <SelectBeneficiaryAccountScreen
          visible={showSelectBeneficiaryAccount}
          onClose={() => setShowSelectBeneficiaryAccount(false)}
          onChooseOtherContact={() => setShowSelectBeneficiaryAccount(false)}
        />
      </CountryProvider>
    </View>
  );
}
