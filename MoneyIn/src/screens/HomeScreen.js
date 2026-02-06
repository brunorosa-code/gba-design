import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import CountrySelector from '../components/CountrySelector';
import { useTranslation } from '../hooks/useTranslation';

export default function HomeScreen({ onBack }) {
  const { t, currentCountry } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header com botão voltar e seletor de país */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backArrow}>‹</Text>
            <Text style={styles.backText}>Voltar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.headerTitle}>
          <Text style={styles.screenTitle}>🌎 Global Bank Account</Text>
        </View>
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
    paddingTop: 10,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 28,
    color: '#820AD1',
    marginRight: 4,
    fontWeight: '300',
  },
  backText: {
    fontSize: 16,
    color: '#820AD1',
  },
  headerTitle: {
    marginBottom: 16,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
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
