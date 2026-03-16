import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Switch,
  Pressable,
} from 'react-native';
import { colors, spacing, fontSizes, fontWeights } from '../../tokens';

function formatCurrency(value) {
  if (value === 0) return '$0';
  return `$${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

export default function BalanceBottomSheet({ visible, onClose, accounts, onAccountsChange }) {
  const toggleAccount = (id) => {
    onAccountsChange(
      accounts.map((acc) =>
        acc.id === id ? { ...acc, enabled: !acc.enabled } : acc
      )
    );
  };

  const total = accounts
    .filter((acc) => acc.enabled)
    .reduce((sum, acc) => sum + acc.amount, 0);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          {/* Top Bar */}
          <View style={styles.topBar}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.topBarTitle}>Set up balance displayed</Text>
            <View style={styles.closeButton} />
          </View>

          {/* Total */}
          <Text style={styles.totalAmount}>
            {formatCurrency(total)}
          </Text>

          {/* Description */}
          <Text style={styles.description}>
            This will also change the amount shown on the home of the app.
          </Text>

          {/* Account rows */}
          <View style={styles.accountList}>
            {accounts.map((account) => (
              <View key={account.id} style={styles.accountRow}>
                <View style={styles.accountContent}>
                  <Text
                    style={[
                      styles.accountLabel,
                      !account.enabled && styles.accountLabelDisabled,
                    ]}
                  >
                    {account.label}
                  </Text>
                  {account.subtitle && (
                    <Text style={styles.accountSubtitle}>{account.subtitle}</Text>
                  )}
                </View>
                <Text
                  style={[
                    styles.accountAmount,
                    !account.enabled && styles.accountAmountDisabled,
                  ]}
                >
                  {formatCurrency(account.amount)}
                </Text>
                <Switch
                  value={account.enabled}
                  onValueChange={() => toggleAccount(account.id)}
                  trackColor={{
                    false: '#bdb5c2',
                    true: colors.nubankPurple,
                  }}
                  thumbColor={colors.white}
                  ios_backgroundColor="#bdb5c2"
                />
              </View>
            ))}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(31, 2, 48, 0.62)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingBottom: spacing.xxxl,
    overflow: 'hidden',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    height: 64,
  },
  closeButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 18,
    color: colors.textPrimary,
  },
  topBarTitle: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
    textAlign: 'center',
    flex: 1,
  },
  totalAmount: {
    fontSize: 36,
    fontWeight: fontWeights.medium,
    color: '#1f002f',
    textAlign: 'center',
    paddingVertical: spacing.sm,
  },
  description: {
    fontSize: fontSizes.md,
    color: 'rgba(31, 2, 48, 0.62)',
    textAlign: 'center',
    paddingHorizontal: spacing.xxl,
    paddingBottom: spacing.xxl,
    lineHeight: 18,
  },
  accountList: {
    paddingHorizontal: 0,
  },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(31, 2, 48, 0.08)',
    gap: spacing.md,
  },
  accountContent: {
    flex: 1,
  },
  accountLabel: {
    fontSize: fontSizes.md,
    color: colors.textPrimary,
    lineHeight: 18,
  },
  accountLabelDisabled: {
    color: 'rgba(31, 2, 48, 0.62)',
  },
  accountSubtitle: {
    fontSize: fontSizes.xs,
    color: 'rgba(31, 2, 48, 0.62)',
    marginTop: 2,
    letterSpacing: 0.12,
    lineHeight: 16,
  },
  accountAmount: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
  },
  accountAmountDisabled: {
    color: 'rgba(31, 2, 48, 0.3)',
  },
});
