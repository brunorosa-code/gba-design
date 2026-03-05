/**
 * Header Component
 *
 * TODO: Substituir este componente pelo Header oficial da biblioteca de
 * componentes React do Nubank quando ela for instalada no projeto.
 *
 * Formado por duas partes:
 *   1. Navigation Bar — botão voltar/fechar (esquerda) + opções (direita)
 *   2. Title Container — título da tela + subtítulo opcional
 *
 * Props:
 *   type        "back" | "close"  (padrão: "back")
 *   onBack      função ao clicar no botão esquerdo
 *   title       texto do título (obrigatório)
 *   subtitle    texto do subtítulo (opcional — omitir para ocultar)
 *   showOptions boolean — exibir botão ··· à direita (padrão: false)
 *   onOptions   função ao clicar no botão de opções
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';
import { fontSizes, fontWeights } from '../tokens/typography';

export default function Header({
  type = 'back',
  onBack,
  title,
  subtitle,
  showOptions = false,
  onOptions,
}) {
  const leftIcon = type === 'close' ? '✕' : '‹';
  const leftIconStyle = type === 'close' ? styles.closeIcon : styles.backIcon;

  return (
    <View style={styles.container}>
      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={onBack}
          activeOpacity={0.6}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Text style={leftIconStyle}>{leftIcon}</Text>
        </TouchableOpacity>

        {showOptions ? (
          <TouchableOpacity
            style={styles.navButton}
            onPress={onOptions}
            activeOpacity={0.6}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Text style={styles.optionsIcon}>···</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.navButton} />
        )}
      </View>

      {/* Title Container */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? (
          <Text style={styles.subtitle}>{subtitle}</Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  // Navigation Bar
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    height: 48,
  },
  navButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 32,
    color: colors.textPrimary,
    fontWeight: fontWeights.regular,
    lineHeight: 36,
  },
  closeIcon: {
    fontSize: 20,
    color: colors.textPrimary,
    fontWeight: fontWeights.regular,
  },
  optionsIcon: {
    fontSize: 20,
    color: colors.textPrimary,
    fontWeight: fontWeights.bold,
    letterSpacing: 2,
  },

  // Title Container
  titleContainer: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl,
  },
  title: {
    fontSize: fontSizes.xxl,
    fontWeight: fontWeights.bold,
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.regular,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
});
