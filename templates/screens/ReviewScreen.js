import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { colors, spacing, fontSizes, fontWeights, borderRadius } from '../../shared/tokens';

export default function ReviewScreen({ onBack, onConfirm }) {
  const handleLearnMore = () => {
    Linking.openURL('https://example.com/fees').catch(() => {});
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Botão voltar - canto superior esquerdo */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Título da tela */}
        <Text style={styles.title}>Review</Text>

        {/* Valor principal e origem */}
        <View style={styles.amountBlock}>
          <View style={styles.amountLeft}>
            <Text style={styles.amountValue}>$187.45</Text>
            <Text style={styles.amountLabel}>From account balance</Text>
          </View>
          <TouchableOpacity style={styles.editButton} activeOpacity={0.7}>
            <Text style={styles.editIcon}>✎</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        {/* Taxa de saque */}
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Withdrawal fee</Text>
          <Text style={styles.rowValue}>$0.40</Text>
        </View>

        <View style={styles.divider} />

        {/* Total */}
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Total including fee</Text>
          <Text style={styles.rowValueTotal}>$187.85</Text>
        </View>

        <View style={styles.divider} />

        {/* Informações adicionais */}
        <View style={styles.infoBlock}>
          <Text style={styles.infoText}>More information about fees.</Text>
          <TouchableOpacity onPress={handleLearnMore} activeOpacity={0.7}>
            <Text style={styles.link}>Learn more about this tax</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Botão Confirmar - fixo na parte inferior */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={onConfirm}
          activeOpacity={0.8}
        >
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.gray200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 28,
    color: colors.textPrimary,
    fontWeight: '300',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  title: {
    fontSize: 36,
    fontWeight: fontWeights.medium,
    color: colors.textPrimary,
    marginBottom: spacing.xxl,
    letterSpacing: 0,
  },
  amountBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  amountLeft: {
    flex: 1,
  },
  amountValue: {
    fontSize: 28,
    fontWeight: fontWeights.medium,
    color: colors.nubankPurple,
    marginBottom: spacing.xs,
  },
  amountLabel: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.regular,
    color: colors.nubankPurple,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    fontSize: 18,
    color: colors.nubankPurple,
  },
  divider: {
    height: 1,
    backgroundColor: '#efefef',
    marginVertical: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLabel: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.regular,
    color: colors.textPrimary,
  },
  rowValue: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
    color: colors.textPrimary,
  },
  rowValueTotal: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.medium,
    color: colors.textPrimary,
  },
  infoBlock: {
    marginTop: spacing.lg,
  },
  infoText: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.regular,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  link: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.regular,
    color: colors.nubankPurple,
    textDecorationLine: 'underline',
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    paddingBottom: spacing.xxl + spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  confirmButton: {
    backgroundColor: colors.nubankPurple,
    height: 56,
    borderRadius: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
    color: colors.white,
  },
});
