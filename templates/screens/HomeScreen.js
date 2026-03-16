import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import CountrySelector from '../../shared/components/CountrySelector';
import { SpendingSavingsTabs, TAB_IDS } from '../../shared/components/SpendingSavingsTabs';
import { useTranslation } from '../../shared/hooks/useTranslation';
import { colors, spacing, fontSizes, fontWeights } from '../../shared/tokens';

import MoneyVisibilitySection from '../../shared/components/sections/MoneyVisibilitySection';
import SetAsideSection from '../../shared/components/sections/SetAsideSection';
import TransactionalActionsSection from '../../shared/components/sections/TransactionalActionsSection';
import TransactionsFeedSection from '../../shared/components/sections/TransactionsFeedSection';
import MoreFromBalancesSection from '../../shared/components/sections/MoreFromBalancesSection';
import MoneyBoxesSection from '../../shared/components/sections/MoneyBoxesSection';
import SavingsGoalsSection from '../../shared/components/sections/SavingsGoalsSection';
import BalanceBottomSheet from '../../shared/components/sections/BalanceBottomSheet';

const INITIAL_ACCOUNTS = [
  { id: 'balance', label: 'Account balance', amount: 300.00, enabled: true },
  { id: 'setAside', label: 'Set aside', amount: 650.00, enabled: true },
  { id: 'other', label: 'Other accounts', subtitle: 'To use it, bring it to Nu first', amount: 0, enabled: false },
];

function formatBalance(value) {
  if (value === 0) return '$0';
  return `$${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

const ICON_VISIBILITY_ON = require('../assets/visibility_on.png');
const ICON_VISIBILITY_OFF = require('../assets/visibility_off.png');

export default function HomeScreen({ onBack, onNavigateToTransactions }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(TAB_IDS.spending);
  const [showBalanceSheet, setShowBalanceSheet] = useState(false);
  const [accounts, setAccounts] = useState(INITIAL_ACCOUNTS);
  const [valuesVisible, setValuesVisible] = useState(true);

  const displayedBalance = accounts
    .filter((acc) => acc.enabled)
    .reduce((sum, acc) => sum + acc.amount, 0);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.headerSide} onPress={onBack}>
            <Text style={styles.backArrow}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.screenTitle}>
            {activeTab === TAB_IDS.spending ? 'Account' : 'Total · $61,224.05'}
          </Text>
          <TouchableOpacity
            style={styles.headerSide}
            onPress={() => setValuesVisible((v) => !v)}
          >
            <Image
              source={valuesVisible ? ICON_VISIBILITY_ON : ICON_VISIBILITY_OFF}
              style={styles.visibilityIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Abas */}
      <View style={styles.tabsWrapper}>
        <SpendingSavingsTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          labels={{ spending: 'Spending', savings: 'Savings' }}
        />
      </View>

      {/* Conteúdo */}
      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollContentInner}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === TAB_IDS.spending && (
          <View style={styles.sectionsContainer}>
            {/* Section: Money Visibility */}
            <MoneyVisibilitySection
              balance={formatBalance(displayedBalance)}
              onAccountsPress={() => setShowBalanceSheet(true)}
              valuesVisible={valuesVisible}
            />

            {/* Section: Set Aside */}
            <SetAsideSection valuesVisible={valuesVisible} />

            {/* Section: Transactional Actions */}
            <TransactionalActionsSection />

            {/* Section: Transactions Feed */}
            <TransactionsFeedSection variant="spending" showSearch onTitlePress={onNavigateToTransactions} valuesVisible={valuesVisible} />

            {/* Section: More from your balances */}
            <MoreFromBalancesSection />
          </View>
        )}

        {activeTab === TAB_IDS.savings && (
          <View style={styles.sectionsContainer}>
            {/* Section: Money Boxes */}
            <MoneyBoxesSection />

            {/* Section: Savings Goals */}
            <SavingsGoalsSection />

            {/* Section: Transactions Feed */}
            <TransactionsFeedSection variant="savings" showMoreButton onTitlePress={onNavigateToTransactions} valuesVisible={valuesVisible} />
          </View>
        )}
      </ScrollView>

      <BalanceBottomSheet
        visible={showBalanceSheet}
        onClose={() => setShowBalanceSheet(false)}
        accounts={accounts}
        onAccountsChange={setAccounts}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerSide: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 28,
    color: colors.textPrimary,
    fontWeight: '300',
  },
  screenTitle: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
    flex: 1,
    textAlign: 'center',
  },
  visibilityIcon: {
    width: 44,
    height: 44,
    resizeMode: 'contain',
  },
  tabsWrapper: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
    alignItems: 'center',
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentInner: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.section,
  },
  sectionsContainer: {
    gap: 24,
  },
});
