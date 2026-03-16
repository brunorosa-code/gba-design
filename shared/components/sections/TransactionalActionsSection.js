import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, fontSizes, fontWeights } from '../../tokens';

const DEFAULT_ACTIONS = [
  { id: 'bring', label: 'Bring', icon: '+' },
  { id: 'transfer', label: 'Transfer', icon: '↗' },
  { id: 'pay', label: 'Pay', icon: '↑' },
];

export default function TransactionalActionsSection({ actions = DEFAULT_ACTIONS }) {
  return (
    <View style={styles.container}>
      {actions.map((action) => (
        <TouchableOpacity key={action.id} style={styles.actionItem} activeOpacity={0.7}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>{action.icon}</Text>
          </View>
          <Text style={styles.label}>{action.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xxl,
    paddingVertical: spacing.lg,
  },
  actionItem: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  iconText: {
    fontSize: 22,
    color: colors.textPrimary,
    fontWeight: fontWeights.medium,
  },
  label: {
    fontSize: fontSizes.sm,
    color: colors.textPrimary,
    fontWeight: fontWeights.medium,
  },
});
