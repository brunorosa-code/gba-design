import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

// Cores do Nubank
const NUBANK_PURPLE = '#820AD1';
const NUBANK_PURPLE_DARK = '#6B07AB';
const NUBANK_PURPLE_LIGHT = '#9B2DE5';

export default function AppHomeScreen({ onNavigateToGBA }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={NUBANK_PURPLE} />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileIcon}>
          <Text style={styles.profileInitial}>B</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>👁</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>❓</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>📧</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Greeting */}
      <View style={styles.greeting}>
        <Text style={styles.greetingText}>Olá, Bruno</Text>
      </View>

      {/* Main Card - Account Balance */}
      <View style={styles.mainCard}>
        <Text style={styles.cardLabel}>Conta</Text>
        <Text style={styles.balanceAmount}>R$ 1.234,56</Text>
      </View>

      {/* GBA Entry Point */}
      <TouchableOpacity 
        style={styles.gbaCard}
        onPress={onNavigateToGBA}
        activeOpacity={0.8}
      >
        <View style={styles.gbaIconContainer}>
          <Text style={styles.gbaIcon}>🌎</Text>
        </View>
        <View style={styles.gbaContent}>
          <Text style={styles.gbaTitle}>Global Bank Account</Text>
          <Text style={styles.gbaSubtitle}>Sua conta internacional</Text>
        </View>
        <Text style={styles.gbaArrow}>›</Text>
      </TouchableOpacity>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionIcon}>
            <Text style={styles.actionIconText}>📱</Text>
          </View>
          <Text style={styles.actionLabel}>Pix</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionIcon}>
            <Text style={styles.actionIconText}>💳</Text>
          </View>
          <Text style={styles.actionLabel}>Pagar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionIcon}>
            <Text style={styles.actionIconText}>↗️</Text>
          </View>
          <Text style={styles.actionLabel}>Transferir</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionIcon}>
            <Text style={styles.actionIconText}>💰</Text>
          </View>
          <Text style={styles.actionLabel}>Depositar</Text>
        </TouchableOpacity>
      </View>

      {/* Credit Card Section */}
      <View style={styles.section}>
        <Text style={styles.sectionIcon}>💳</Text>
        <View style={styles.sectionContent}>
          <Text style={styles.sectionTitle}>Cartão de crédito</Text>
          <Text style={styles.sectionSubtitle}>Fatura atual</Text>
          <Text style={styles.sectionValue}>R$ 890,00</Text>
        </View>
      </View>

      {/* Loans Section */}
      <View style={styles.section}>
        <Text style={styles.sectionIcon}>💵</Text>
        <View style={styles.sectionContent}>
          <Text style={styles.sectionTitle}>Empréstimo</Text>
          <Text style={styles.sectionSubtitle}>Valor disponível de até</Text>
          <Text style={styles.sectionValue}>R$ 25.000,00</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NUBANK_PURPLE,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  profileIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: NUBANK_PURPLE_DARK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: NUBANK_PURPLE_DARK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 18,
  },
  greeting: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  greetingText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  mainCard: {
    backgroundColor: NUBANK_PURPLE_DARK,
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  cardLabel: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 4,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },
  gbaCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gbaIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  gbaIcon: {
    fontSize: 24,
  },
  gbaContent: {
    flex: 1,
  },
  gbaTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  gbaSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  gbaArrow: {
    fontSize: 24,
    color: '#999',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: NUBANK_PURPLE_DARK,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionIconText: {
    fontSize: 24,
  },
  actionLabel: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  section: {
    backgroundColor: NUBANK_PURPLE_DARK,
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionIcon: {
    fontSize: 28,
    marginRight: 16,
  },
  sectionContent: {
    flex: 1,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
    marginTop: 2,
  },
  sectionValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },
});
