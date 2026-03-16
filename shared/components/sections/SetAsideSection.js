import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { colors, spacing, fontSizes, fontWeights, borderRadius } from '../../tokens';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function UnfoldMoreIcon() {
  return (
    <View style={iconStyles.container}>
      <Text style={iconStyles.arrowUp}>▴</Text>
      <Text style={iconStyles.arrowDown}>▾</Text>
    </View>
  );
}

function UnfoldLessIcon() {
  return (
    <View style={iconStyles.container}>
      <Text style={iconStyles.arrowDown}>▾</Text>
      <Text style={iconStyles.arrowUp}>▴</Text>
    </View>
  );
}

const iconStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: -6,
  },
  arrowUp: {
    fontSize: 16,
    color: colors.nubankPurple,
    lineHeight: 16,
  },
  arrowDown: {
    fontSize: 16,
    color: colors.nubankPurple,
    lineHeight: 16,
  },
});

const COMMITMENTS = [
  { id: '1', icon: '💳', label: 'Credit card', description: 'Pending payment', amount: 1100.00, due: 'Due 25 OCT' },
  { id: '2', icon: '📶', label: 'FiberNet', description: 'Pending payment', amount: 200.00, due: 'Due 26 OCT' },
];

function formatCurrency(value) {
  return `$${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

export default function SetAsideSection({
  label = 'Set aside for commitments',
  amount = 650.00,
  totalNeeded = 1300.00,
  monthLabel = 'March bills',
  buttonLabel = 'Set aside money',
  withdrawLabel = 'Withdraw',
  commitments = COMMITMENTS,
  valuesVisible = true,
}) {
  const [expanded, setExpanded] = useState(false);

  const progressPercent = Math.min(amount / totalNeeded, 1);
  const stillNeeded = totalNeeded - amount;

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      {/* Top: label + amount + unfold icon */}
      <View style={styles.topSection}>
        <View style={styles.headerRow}>
          <View style={styles.headerContent}>
            <Text style={styles.label}>{label}</Text>
            {valuesVisible ? (
              <Text style={styles.amount}>{formatCurrency(amount)}</Text>
            ) : (
              <View style={styles.skeletonBar} />
            )}
          </View>
          <TouchableOpacity
            style={styles.unfoldButton}
            onPress={toggleExpand}
            activeOpacity={0.7}
          >
            {expanded ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
          </TouchableOpacity>
        </View>
      </View>

      {/* Buttons: Set aside money + Withdraw */}
      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.setAsideButton} activeOpacity={0.7}>
          <Text style={styles.setAsideButtonText}>{buttonLabel}</Text>
        </TouchableOpacity>
        {expanded && (
          <TouchableOpacity style={styles.withdrawButton} activeOpacity={0.7}>
            <Text style={styles.withdrawButtonText}>{withdrawLabel}</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Progress bar */}
      <View style={styles.middleSection}>
        <Text style={styles.progressLabel}>
          {valuesVisible && (
            <Text style={styles.progressLabelBold}>{formatCurrency(stillNeeded)} </Text>
          )}
          {!valuesVisible && (
            <View style={styles.skeletonBarSmall} />
          )}
          still needed for {monthLabel}
        </Text>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progressPercent * 100}%` }]} />
        </View>
      </View>

      {/* Expanded: commitment cards */}
      {expanded && (
        <View style={styles.commitmentList}>
          {commitments.map((item) => (
            <View key={item.id} style={styles.commitmentCard}>
              <View style={styles.commitmentIconCircle}>
                <Text style={styles.commitmentIcon}>{item.icon}</Text>
              </View>
              <View style={styles.commitmentContent}>
                <Text style={styles.commitmentLabel}>{item.label}</Text>
                <Text style={styles.commitmentDescription}>{item.description}</Text>
              </View>
              <View style={styles.commitmentRight}>
                {valuesVisible ? (
                  <Text style={styles.commitmentAmount}>{formatCurrency(item.amount)}</Text>
                ) : (
                  <View style={styles.skeletonBarSmall} />
                )}
                <Text style={styles.commitmentDue}>{item.due}</Text>
              </View>
            </View>
          ))}

          {/* Access all bills */}
          <TouchableOpacity style={styles.accessAllCard} activeOpacity={0.7}>
            <View style={styles.accessAllIconCircle}>
              <Text style={styles.accessAllIcon}>📅</Text>
            </View>
            <Text style={styles.accessAllText}>Access all bills</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  topSection: {
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerContent: {
    flex: 1,
    gap: 4,
  },
  label: {
    fontSize: fontSizes.md,
    color: 'rgba(31, 2, 48, 0.62)',
    lineHeight: 18,
  },
  amount: {
    fontSize: 28,
    fontWeight: fontWeights.medium,
    color: colors.textPrimary,
    lineHeight: 34,
  },
  unfoldButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e8e0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xs,
    gap: 4,
  },
  setAsideButton: {
    backgroundColor: '#f8f6f8',
    borderRadius: 64,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    height: 36,
    justifyContent: 'center',
  },
  setAsideButtonText: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
    letterSpacing: 0.12,
  },
  withdrawButton: {
    borderRadius: 64,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    height: 40,
    justifyContent: 'center',
  },
  withdrawButtonText: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold,
    color: colors.nubankPurple,
    letterSpacing: 0.12,
  },
  middleSection: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
    gap: spacing.sm,
  },
  progressLabel: {
    fontSize: fontSizes.md,
    color: 'rgba(31, 2, 48, 0.62)',
    lineHeight: 18,
  },
  progressLabelBold: {
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#e3e0e5',
    borderRadius: 64,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 6,
    backgroundColor: colors.nubankPurple,
    borderRadius: 8,
  },
  commitmentList: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    gap: spacing.sm,
  },
  commitmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(31, 2, 48, 0.08)',
    borderRadius: 16,
    padding: spacing.md,
    gap: spacing.md,
    height: 56,
  },
  commitmentIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 64,
    backgroundColor: '#f8f6f8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commitmentIcon: {
    fontSize: 16,
  },
  commitmentContent: {
    flex: 1,
    gap: 2,
  },
  commitmentLabel: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    color: 'rgba(31, 2, 48, 0.62)',
    lineHeight: 18,
  },
  commitmentDescription: {
    fontSize: fontSizes.xs,
    color: 'rgba(31, 2, 48, 0.62)',
    letterSpacing: 0.12,
    lineHeight: 16,
  },
  commitmentRight: {
    alignItems: 'flex-end',
    gap: 2,
  },
  commitmentAmount: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    color: 'rgba(31, 2, 48, 0.62)',
  },
  commitmentDue: {
    fontSize: fontSizes.xs,
    color: 'rgba(31, 2, 48, 0.62)',
    letterSpacing: 0.12,
    lineHeight: 16,
  },
  accessAllCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(31, 2, 48, 0.08)',
    borderRadius: 16,
    padding: spacing.md,
    gap: spacing.md,
    height: 56,
  },
  accessAllIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 64,
    backgroundColor: '#e8e0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accessAllIcon: {
    fontSize: 16,
  },
  accessAllText: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    color: colors.nubankPurple,
    lineHeight: 18,
  },
  skeletonBar: {
    width: 140,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(31, 2, 48, 0.08)',
  },
  skeletonBarSmall: {
    width: 80,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(31, 2, 48, 0.08)',
  },
});
