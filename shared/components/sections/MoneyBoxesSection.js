import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, fontSizes, fontWeights } from '../../tokens';

export default function MoneyBoxesSection({
  balance = '$200.00',
  label = 'Savings balance',
  earnedToday = '+ $1.0 earned today',
  apy = '0.00% APY',
  saveLabel = '+ Save money',
}) {
  return (
    <View style={styles.container}>
      <View style={styles.avatarRow}>
        <View style={[styles.avatar, { backgroundColor: '#E8D5F5' }]}>
          <Text style={styles.avatarText}>🌊</Text>
        </View>
        <View style={[styles.avatar, { backgroundColor: '#F5E0C5', marginLeft: -10 }]}>
          <Text style={styles.avatarText}>🏖</Text>
        </View>
        <View style={[styles.avatar, { backgroundColor: '#D5E8F5', marginLeft: -10 }]}>
          <Text style={styles.avatarText}>🎹</Text>
        </View>
      </View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.balance}>{balance}</Text>
      <View style={styles.infoRow}>
        <Text style={styles.earned}>{earnedToday}</Text>
        <View style={styles.apyBadge}>
          <Text style={styles.apyText}>{apy}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.saveButton} activeOpacity={0.7}>
        <Text style={styles.saveButtonText}>{saveLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  avatarRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  avatarText: {
    fontSize: 18,
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
    marginBottom: spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xl,
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
  saveButton: {
    borderWidth: 1,
    borderColor: colors.gray300,
    borderRadius: 24,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xxl,
  },
  saveButtonText: {
    fontSize: fontSizes.base,
    color: colors.textPrimary,
    fontWeight: fontWeights.medium,
  },
});
