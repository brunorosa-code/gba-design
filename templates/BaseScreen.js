/**
 * BaseScreen Template
 *
 * Template base para criar novas telas no GBA.
 * Copie este arquivo para a pasta do seu país ou fluxo e adapte.
 *
 * Como usar:
 *   1. Copie este arquivo para gba-{país}/screens/NomeDaSuaTela.js
 *   2. Renomeie a função de "BaseScreen" para o nome da sua tela
 *   3. Altere title, subtitle e o conteúdo dentro do ScrollView
 *   4. Remova o placeholder e comece a desenhar!
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import Header from '../shared/components/Header';
import { colors } from '../shared/tokens/colors';
import { spacing } from '../shared/tokens/spacing';
import { fontSizes, fontWeights } from '../shared/tokens/typography';

export default function BaseScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <Header
        type="back"
        onBack={() => {}}
        title="Título da tela"
        subtitle="Subtítulo opcional — remova se não precisar"
        showOptions={false}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        {/* ========================================= */}
        {/* CONTEÚDO DA TELA — comece a desenhar aqui */}
        {/* ========================================= */}

        <View style={styles.placeholder}>
          <Text style={styles.placeholderIcon}>✏️</Text>
          <Text style={styles.placeholderTitle}>Sua tela começa aqui</Text>
          <Text style={styles.placeholderText}>
            Substitua este bloco pelo conteúdo da sua tela.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.xl,
    flexGrow: 1,
  },

  // Placeholder — remova ao criar sua tela
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundLight,
    borderRadius: 16,
    padding: spacing.section,
  },
  placeholderIcon: {
    fontSize: 48,
    marginBottom: spacing.lg,
  },
  placeholderTitle: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  placeholderText: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.regular,
    color: colors.textTertiary,
    textAlign: 'center',
  },
});
