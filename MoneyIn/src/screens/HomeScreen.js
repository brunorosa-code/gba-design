import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import CountrySelector from '../components/CountrySelector';
import { useTranslation } from '../hooks/useTranslation';

export default function HomeScreen() {
  const { t, currentCountry } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header com seletor de país */}
      <View style={styles.header}>
        <CountrySelector />
      </View>

      {/* Conteúdo principal */}
      <View style={styles.content}>
        <Text style={styles.welcomeText}>
          {t('welcome')}, {currentCountry.flag}
        </Text>
        
        <Text style={styles.infoText}>
          País: {currentCountry.name}
        </Text>
        
        <Text style={styles.infoText}>
          Moeda: {currentCountry.currency} ({currentCountry.currencySymbol})
        </Text>

        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>
            {t('dashboard.title')}
          </Text>
          <Text style={styles.placeholderSubtext}>
            Aqui ficarão as telas do protótipo
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    marginTop: 30,
    padding: 40,
  },
  placeholderText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  placeholderSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});
