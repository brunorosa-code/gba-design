import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, fontSizes, fontWeights, borderRadius } from '../../tokens';

const GOALS = [
  { id: '1', name: 'Vacations', amount: '$000,000.000', apy: '3.50% APY', color: '#E8D5F5' },
  { id: '2', name: 'Vacations', amount: '$000,000.000', apy: '3.50% APY', color: '#F5E0C5' },
  { id: '3', name: 'Vacations', amount: '$000,000.000', apy: '3.50% APY', color: '#D5E8F5' },
];

export default function SavingsGoalsSection({ title = 'Savings goals' }) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {GOALS.map((goal) => (
        <TouchableOpacity key={goal.id} style={styles.card} activeOpacity={0.7}>
          <View style={[styles.imagePlaceholder, { backgroundColor: goal.color }]}>
            <View style={styles.apyBadge}>
              <Text style={styles.apyText}>{goal.apy}</Text>
            </View>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.goalName}>{goal.name}</Text>
            <Text style={styles.goalAmount}>{goal.amount}</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.addMoney}>Add money</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.sm,
  },
  sectionTitle: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray100,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    minHeight: 100,
  },
  imagePlaceholder: {
    width: 100,
    height: 80,
    borderRadius: borderRadius.md,
    justifyContent: 'flex-end',
    padding: spacing.sm,
    marginRight: spacing.md,
  },
  apyBadge: {
    backgroundColor: colors.nubankPurple,
    borderRadius: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  apyText: {
    fontSize: fontSizes.xs,
    color: colors.white,
    fontWeight: fontWeights.semibold,
  },
  cardContent: {
    flex: 1,
  },
  goalName: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  goalAmount: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  addMoney: {
    fontSize: fontSizes.md,
    color: colors.nubankPurple,
    fontWeight: fontWeights.medium,
  },
  chevron: {
    fontSize: 24,
    color: colors.textTertiary,
    marginLeft: spacing.sm,
  },
});
