import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, fontSizes, fontWeights, borderRadius } from '../../tokens';

const SPENDING_TRANSACTIONS = [
  { id: '1', icon: '📄', description: 'Payment from Bills set aside', time: '11:08', date: 'Mar 17', amountSymbol: '$', amountValue: '250.00', isIncoming: false },
  { id: '2', icon: '🚗', description: 'Uber', time: '11:08', date: 'Mar 17', amountSymbol: '$', amountValue: '67.91', isIncoming: false },
  { id: '3', icon: '📦', description: 'Amazon', time: '11:08', date: 'Mar 17', amountSymbol: '$', amountValue: '79.99', isIncoming: false },
];

const SAVINGS_TRANSACTIONS = [
  { id: '1', icon: '💰', description: 'Deposit · Trip to Italy', time: '11:08', date: 'Mar 17', amountSymbol: '+$', amountValue: '79.99', isIncoming: true },
  { id: '2', icon: '💰', description: 'Deposit · Turbo Money Box', time: '11:08', date: 'Mar 17', amountSymbol: '+$', amountValue: '700.00', isIncoming: true },
  { id: '3', icon: '↩️', description: 'Withdrawal · Safety Net', time: '11:08', date: 'Mar 17', amountSymbol: '-$', amountValue: '20.00', isIncoming: false },
];

export default function TransactionsFeedSection({
  variant = 'spending',
  title = 'Transactions',
  showSearch = false,
  showMoreButton = false,
  moreLabel = 'More transactions',
  onTitlePress,
  valuesVisible = true,
}) {
  const transactions = variant === 'savings' ? SAVINGS_TRANSACTIONS : SPENDING_TRANSACTIONS;
  const isLatest = variant === 'savings';

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity activeOpacity={0.7} onPress={onTitlePress}>
          <Text style={styles.title}>
            {isLatest ? 'Latest transactions' : title}
            {!isLatest ? ' ›' : ''}
          </Text>
        </TouchableOpacity>
        {showSearch && <Text style={styles.searchIcon}>🔍</Text>}
      </View>

      {/* Transaction list card */}
      <View style={styles.listCard}>
        {transactions.map((tx, index) => (
          <View key={tx.id}>
            <View style={styles.row}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>{tx.icon}</Text>
              </View>
              <View style={styles.content}>
                {valuesVisible ? (
                  <>
                    <Text style={styles.description} numberOfLines={1}>{tx.description}</Text>
                    <Text style={styles.timestamp}>{tx.time} · {tx.date}</Text>
                  </>
                ) : (
                  <>
                    <View style={styles.skeletonPrimary} />
                    <View style={styles.skeletonSecondary} />
                  </>
                )}
              </View>
              {valuesVisible ? (
                <View style={styles.amountContainer}>
                  <Text style={[styles.amountSymbol, tx.isIncoming && styles.amountGreen]}>
                    {tx.amountSymbol}
                  </Text>
                  <Text style={[styles.amountValue, tx.isIncoming && styles.amountGreen]}>
                    {tx.amountValue}
                  </Text>
                </View>
              ) : (
                <View style={styles.skeletonAmount} />
              )}
            </View>
            {index < transactions.length - 1 && (
              <View style={styles.dividerWrapper}>
                <View style={styles.divider} />
              </View>
            )}
          </View>
        ))}
      </View>

      {/* More transactions button */}
      {showMoreButton && (
        <TouchableOpacity style={styles.moreButton} activeOpacity={0.7}>
          <Text style={styles.moreText}>{moreLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
    color: colors.textPrimary,
  },
  searchIcon: {
    fontSize: 16,
  },
  listCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(31, 2, 48, 0.08)',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#1F002F',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 0,
    elevation: 1,
    paddingVertical: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    gap: spacing.md,
  },
  avatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 64,
    backgroundColor: colors.gray200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 14,
  },
  content: {
    flex: 1,
    gap: 2,
  },
  description: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
    letterSpacing: 0.12,
    lineHeight: 16,
  },
  timestamp: {
    fontSize: fontSizes.xs,
    color: 'rgba(31, 2, 48, 0.62)',
    letterSpacing: 0.12,
    lineHeight: 16,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  amountSymbol: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
    letterSpacing: 0.12,
  },
  amountValue: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
  },
  amountGreen: {
    color: '#00a86b',
  },
  dividerWrapper: {
    paddingHorizontal: spacing.lg,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(31, 2, 48, 0.08)',
  },
  moreButton: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  moreText: {
    fontSize: fontSizes.base,
    color: colors.nubankPurple,
    fontWeight: fontWeights.medium,
  },
  skeletonPrimary: {
    width: 112,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(31, 2, 48, 0.08)',
  },
  skeletonSecondary: {
    width: 80,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(31, 2, 48, 0.08)',
  },
  skeletonAmount: {
    width: 64,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(31, 2, 48, 0.08)',
  },
});
