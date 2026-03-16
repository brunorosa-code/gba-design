import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, borderRadius, fontSizes, fontWeights } from '../tokens';

const TAB_IDS = { spending: 'spending', savings: 'savings' };

/**
 * Barra de abas Spending / Savings.
 * Recebe o id da aba ativa e um callback ao trocar de aba.
 */
export function SpendingSavingsTabs({ activeTab, onTabChange, labels = {} }) {
  const spendingLabel = labels.spending ?? 'Spending';
  const savingsLabel = labels.savings ?? 'Savings';

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, activeTab === TAB_IDS.spending && styles.tabActive]}
        onPress={() => onTabChange(TAB_IDS.spending)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === TAB_IDS.spending && styles.tabTextActive,
          ]}
        >
          {spendingLabel}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === TAB_IDS.savings && styles.tabActive]}
        onPress={() => onTabChange(TAB_IDS.savings)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === TAB_IDS.savings && styles.tabTextActive,
          ]}
        >
          {savingsLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export { TAB_IDS };

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  tab: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.gray200,
  },
  tabActive: {
    backgroundColor: colors.nubankPurple,
  },
  tabText: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
    color: colors.gray500,
  },
  tabTextActive: {
    color: colors.white,
    fontWeight: fontWeights.semibold,
  },
});
