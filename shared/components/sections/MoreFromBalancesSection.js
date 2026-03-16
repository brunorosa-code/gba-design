import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, fontSizes, fontWeights, borderRadius } from '../../tokens';

const CARDS = [
  { id: 'bring', icon: '🏦', title: 'Bring your money\nin seconds', subtitle: 'Connect other bank' },
  { id: 'debit', icon: '💳', title: 'Debit cards', subtitle: 'Manage your cards' },
  { id: 'currencies', icon: '🌐', title: 'Other\ncurrencies', subtitle: '40+ currencies' },
  { id: 'documents', icon: '📄', title: 'Documents', subtitle: 'Statements, taxes...' },
];

export default function MoreFromBalancesSection({ title = 'More from your balances' }) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.grid}>
        {CARDS.map((card) => (
          <TouchableOpacity key={card.id} style={styles.card} activeOpacity={0.7}>
            <Text style={styles.cardIcon}>{card.icon}</Text>
            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSizes.base,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  card: {
    width: '47%',
    backgroundColor: colors.gray100,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    minHeight: 120,
    justifyContent: 'flex-end',
  },
  cardIcon: {
    fontSize: 24,
    marginBottom: spacing.sm,
  },
  cardTitle: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  cardSubtitle: {
    fontSize: fontSizes.xs,
    color: colors.textSecondary,
  },
});
