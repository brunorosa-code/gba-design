import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from '../hooks/useTranslation';

const SCREEN_WIDTH = 375;
const SCREEN_HEIGHT = 812;

export default function GBADashboardUSAScreen({ onBack }) {
  const { t } = useTranslation();

  const transactions = [
    {
      id: '1',
      name: 'American Airlines',
      subtitle: '11:08 · Description',
      amount: '- $ 100.00',
      amountColor: '#1a1a1a',
      logoBg: '#0078D2',
      logoText: 'AA',
    },
    {
      id: '2',
      name: 'Chase checking',
      subtitle: '11:08 · Description',
      amount: '+ $ 100.00',
      amountColor: '#16a34a',
      logoBg: '#117ACA',
      logoText: 'Ch',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.headerIcon} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
            <Ionicons name="chevron-back" size={28} color="#1a1a1a" />
          </TouchableOpacity>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerIcon}>
              <Ionicons name="eye-outline" size={24} color="#1a1a1a" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIcon}>
              <Ionicons name="ellipsis-horizontal" size={24} color="#1a1a1a" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs: Spending | Savings */}
        <View style={styles.tabs}>
          <TouchableOpacity style={[styles.tab, styles.tabActive]} activeOpacity={0.8}>
            <Text style={styles.tabActiveText}>{t('dashboard.spending')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, styles.tabInactive]} activeOpacity={0.8}>
            <Text style={styles.tabInactiveText}>{t('dashboard.savings')}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Available balance */}
          <View style={styles.balanceRow}>
            <View style={styles.balanceLeft}>
              <Text style={styles.balanceLabel}>{t('dashboard.balance')}</Text>
              <Text style={styles.balanceAmount}>$100.00</Text>
              <View style={styles.interestRow}>
                <Text style={styles.interestText}>↑ $0.00 </Text>
                <Text style={styles.interestLabel}>{t('dashboard.interestEarned')}</Text>
              </View>
            </View>
            <View style={styles.apyBadge}>
              <Text style={styles.apyText}>3.50% {t('dashboard.apy')}</Text>
              <TouchableOpacity>
                <Ionicons name="information-circle" size={18} color="#6B21A8" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Action buttons */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
              <View style={styles.actionCircle}>
                <Ionicons name="add" size={28} color="#6B21A8" />
              </View>
              <Text style={styles.actionLabel}>{t('dashboard.moneyIn')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
              <View style={styles.actionCircle}>
                <Ionicons name="swap-horizontal" size={24} color="#6B21A8" />
              </View>
              <Text style={styles.actionLabel}>{t('dashboard.transferOut')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
              <View style={styles.actionCircle}>
                <Ionicons name="arrow-up" size={24} color="#6B21A8" />
              </View>
              <Text style={styles.actionLabel}>{t('dashboard.send')}</Text>
            </TouchableOpacity>
          </View>

          {/* Link account */}
          <TouchableOpacity style={styles.linkAccount} activeOpacity={0.7}>
            <Ionicons name="add" size={20} color="#6B21A8" />
            <Text style={styles.linkAccountText}>{t('dashboard.linkAccount')}</Text>
          </TouchableOpacity>

          {/* Transactions */}
          <Text style={styles.sectionTitle}>{t('dashboard.transactions')}</Text>
          <View style={styles.searchWrapper}>
            <Ionicons name="search" size={20} color="#9ca3af" />
            <TextInput
              style={styles.searchInput}
              placeholder={t('dashboard.search')}
              placeholderTextColor="#9ca3af"
              editable={false}
            />
          </View>

          <Text style={styles.dateLabel}>May 5</Text>
          {transactions.map((item) => (
            <View key={item.id} style={styles.transactionRow}>
              <View style={[styles.transactionLogo, { backgroundColor: item.logoBg }]}>
                <Text style={styles.transactionLogoText}>{item.logoText}</Text>
              </View>
              <View style={styles.transactionBody}>
                <Text style={styles.transactionName}>{item.name}</Text>
                <Text style={styles.transactionSubtitle}>{item.subtitle}</Text>
              </View>
              <Text style={[styles.transactionAmount, { color: item.amountColor }]}>
                {item.amount}
              </Text>
            </View>
          ))}

          {/* Footer disclaimer */}
          <Text style={styles.disclaimer}>{t('dashboard.disclaimer')}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: SCREEN_WIDTH,
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  headerIcon: {
    padding: 4,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 0,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  tabInactive: {
    backgroundColor: '#f3e8ff',
    marginLeft: 8,
  },
  tabActiveText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  tabInactiveText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B21A8',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 24,
  },
  balanceLeft: {
    flex: 1,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  interestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  interestText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#16a34a',
  },
  interestLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  apyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  apyText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B21A8',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 28,
    paddingHorizontal: 8,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '500',
  },
  linkAccount: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    gap: 6,
  },
  linkAccountText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#374151',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginTop: 28,
    marginBottom: 12,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1a1a1a',
    padding: 0,
  },
  dateLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 20,
    marginBottom: 12,
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  transactionLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionLogoText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
  transactionBody: {
    flex: 1,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  transactionSubtitle: {
    fontSize: 13,
    color: '#9ca3af',
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  disclaimer: {
    fontSize: 11,
    color: '#9ca3af',
    lineHeight: 16,
    marginTop: 32,
    textAlign: 'center',
  },
});
