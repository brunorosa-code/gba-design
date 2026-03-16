import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, fontSizes, fontWeights } from '../../tokens';
import ConnectedAccountsSelector from './ConnectedAccountsSelector';

function SkeletonBar({ width = 112, height = 18, style }) {
  return (
    <View
      style={[
        { width, height, borderRadius: height / 2, backgroundColor: 'rgba(31, 2, 48, 0.08)' },
        style,
      ]}
    />
  );
}

export default function MoneyVisibilitySection({
  balance = '$300.00',
  label = 'Main balance',
  earnedToday = '$10 today',
  apy = '3.50% APY',
  onAccountsPress,
  valuesVisible = true,
}) {
  return (
    <View style={styles.container}>
      <ConnectedAccountsSelector onPress={onAccountsPress} />
      {valuesVisible ? (
        <Text style={styles.balance}>{balance}</Text>
      ) : (
        <SkeletonBar width={180} height={32} />
      )}
      {valuesVisible ? (
        <View style={styles.infoRow}>
          <Text style={styles.earned}>▲ {earnedToday}</Text>
          <View style={styles.apyBadge}>
            <Text style={styles.apyText}>{apy}</Text>
          </View>
        </View>
      ) : (
        <SkeletonBar width={120} height={18} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    gap: 16,
  },
  label: {
    fontSize: fontSizes.md,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  balance: {
    fontSize: 36,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  earned: {
    fontSize: fontSizes.sm,
    color: '#00a86b',
    fontWeight: fontWeights.medium,
  },
  apyBadge: {
    backgroundColor: colors.gray200,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 4,
  },
  apyText: {
    fontSize: fontSizes.xs,
    color: colors.nubankPurple,
    fontWeight: fontWeights.semibold,
  },
});
