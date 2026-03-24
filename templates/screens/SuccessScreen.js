import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import ArrowBackIcon from '../../assets/icons/arrow_back_icon.svg';
import HelpIcon from '../../assets/icons/help_icon.svg';
import PlaceholderIcon from '../../assets/icons/placeholder_icon.svg';
import CheckIcon from '../../assets/icons/check_icon.svg';
import WellDoneIllustration from '../../assets/illustrations/well_done_ilustra.svg';
import { colors, spacing, borderRadius } from '../../shared/tokens';

// =============================================================================
// Valores extraídos do Figma — node 803:22645 (Success screen) — única fonte de verdade
// https://www.figma.com/design/Hc52lXjGUDP5PPRIGN53IJ/Super-draft?node-id=803-22645
//
// === Frame Success screen ===
// Dimensões: 375×812 | Cor de fundo: var(--color.background.default, white) → #FFFFFF
//
// === Header (803:22646) ===
// Dimensões: 375×371
// Contém: TopBar + Artwork (ilustração Well Done 803:23122) + título + subtítulo
//
// === Tipografia (get_design_context) ===
// Title/Medium: Graphik Medium, size 28, weight 500, lineHeight 1.2000000476837158 (34px), letterSpacing -3, cor Content/Default #000000
// Subtitle/Medium/Default: Graphik Regular, size 18, weight 400, lineHeight 1.2999999523162842 (23.4px), letterSpacing -1, cor secundária #666666
// Label/Medium/Strong: Graphik Medium, size 16, weight 500, lineHeight 1.2999999523162842 (~20.8), letterSpacing -1
// Label/Medium/Default: Graphik Regular, size 16, weight 400, lineHeight 1.2999999523162842, letterSpacing -1
// Paragraph/Small/Default: Graphik Regular, size 14, weight 400, lineHeight 1.5 (21), letterSpacing -1
//
// === List Row (803:23062, 803:23088) ===
// Dimensões: 375×78 cada | Alinhamento: ícone à esquerda, primary label + description, secondary + check à direita
//
// === Bottom Bar (803:23113) ===
// Dimensões: 375×80 | Botão primary: fundo roxo (NuDS/brand), texto branco, bordas bem arredondadas
// =============================================================================

const FIGMA = {
  background: '#FFFFFF',
  title: {
    fontFamily: 'Graphik-Medium',
    fontFamilyWeb: "'Graphik Medium', 'Graphik-Medium', sans-serif",
    fontSize: 28,
    fontWeight: '500',
    lineHeight: 34,
    letterSpacing: -3,
    color: '#000000',
  },
  subtitle: {
    fontFamily: 'Graphik-Regular',
    fontFamilyWeb: "'Graphik Regular', 'Graphik-Regular', sans-serif",
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 23.4,
    letterSpacing: -1,
    color: '#666666',
  },
  labelStrong: {
    fontFamily: 'Graphik-Medium',
    fontFamilyWeb: "'Graphik Medium', 'Graphik-Medium', sans-serif",
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20.8,
    letterSpacing: -1,
    color: '#000000',
  },
  labelDefault: {
    fontFamily: 'Graphik-Regular',
    fontFamilyWeb: "'Graphik Regular', 'Graphik-Regular', sans-serif",
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 20.8,
    letterSpacing: -1,
    color: '#666666',
  },
  paragraphSmall: {
    fontFamily: 'Graphik-Regular',
    fontFamilyWeb: "'Graphik Regular', 'Graphik-Regular', sans-serif",
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    letterSpacing: -1,
    color: '#666666',
  },
};


const PRIMARY_BUTTON_BG = colors.nubankPurple;

/**
 * Template Success Screen.
 * Tela genérica de sucesso com ilustração, título, subtítulo, lista de itens e botão de ação.
 * Todos os textos e a ação principal são configuráveis via props.
 */
export default function SuccessScreen({
  title = 'Header title',
  subtitle = 'Sub title',
  items = [
    { id: '1', primaryLabel: 'Primary label', description: 'Description', secondaryLabel: 'Secondary' },
    { id: '2', primaryLabel: 'Primary label', description: 'Description', secondaryLabel: 'Secondary' },
  ],
  primaryActionLabel = 'Primary action',
  onPrimaryAction,
  showTopBar = true,
  screenTitle = 'Screen Title',
  onBack,
  onHelp,
}) {
  return (
    <SafeAreaView style={styles.container}>
      {showTopBar && (
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.topBarButton}
            onPress={onBack}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            accessibilityLabel="Voltar"
            accessibilityRole="button"
          >
            <ArrowBackIcon width={24} height={24} />
          </TouchableOpacity>
          <Text style={styles.topBarTitle} numberOfLines={1}>
            {screenTitle}
          </Text>
          <TouchableOpacity
            style={styles.topBarButton}
            onPress={onHelp}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            accessibilityLabel="Ajuda"
            accessibilityRole="button"
          >
            <HelpIcon width={24} height={24} />
          </TouchableOpacity>
        </View>
      )}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Ilustração Well Done — alinhamento à esquerda, espaçamento 24px */}
        <View style={styles.illustrationWrap}>
          <WellDoneIllustration width={150} height={150} />
        </View>

        {/* Título e subtítulo */}
        <View style={styles.headerTextBlock}>
          <Text style={styles.headerTitle}>{title}</Text>
          <Text style={styles.headerSubtitle}>{subtitle}</Text>
        </View>

        {/* List rows — 78px height cada (Figma) */}
        {items && items.length > 0 && (
          <View style={styles.list}>
            {items.map((item, index) => (
              <View
                key={item.id || index}
                style={[styles.listRow, styles.listRowBorder]}
              >
                <View style={styles.listRowIcon}>
                  <PlaceholderIcon width={24} height={24} />
                </View>
                <View style={styles.listRowContent}>
                  <Text style={styles.listRowPrimary}>
                    {item.primaryLabel}
                  </Text>
                  <Text style={styles.listRowDescription}>
                    {item.description}
                  </Text>
                </View>
                <View style={styles.listRowRight}>
                  <Text style={styles.listRowSecondary}>
                    {item.secondaryLabel}
                  </Text>
                  <View style={styles.listRowCheck}>
                    <CheckIcon width={24} height={24} />
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Bottom Bar — botão primary */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={onPrimaryAction}
          activeOpacity={0.8}
          accessibilityLabel={primaryActionLabel}
          accessibilityRole="button"
        >
          <Text style={styles.primaryButtonText}>
            {primaryActionLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: FIGMA.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minHeight: 48,
  },
  topBarButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarIcon: {
    width: 24,
    height: 24,
  },
  topBarTitle: {
    fontFamily: Platform.OS === 'web' ? FIGMA.labelStrong.fontFamilyWeb : FIGMA.labelStrong.fontFamily,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20.8,
    letterSpacing: -1,
    color: FIGMA.title.color,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: spacing.sm,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.xxl,
    paddingBottom: spacing.xxl,
  },
  illustrationWrap: {
    alignItems: 'flex-start',
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxl,
  },
  wellDoneImage: {
    width: 150,
    height: 150,
  },
  headerTextBlock: {
    marginBottom: spacing.xl,
  },
  headerTitle: {
    fontFamily: Platform.OS === 'web' ? FIGMA.title.fontFamilyWeb : FIGMA.title.fontFamily,
    fontSize: FIGMA.title.fontSize,
    fontWeight: FIGMA.title.fontWeight,
    lineHeight: FIGMA.title.lineHeight,
    letterSpacing: FIGMA.title.letterSpacing,
    color: FIGMA.title.color,
  },
  headerSubtitle: {
    fontFamily: Platform.OS === 'web' ? FIGMA.subtitle.fontFamilyWeb : FIGMA.subtitle.fontFamily,
    fontSize: FIGMA.subtitle.fontSize,
    fontWeight: FIGMA.subtitle.fontWeight,
    lineHeight: FIGMA.subtitle.lineHeight,
    letterSpacing: FIGMA.subtitle.letterSpacing,
    color: FIGMA.subtitle.color,
    marginTop: spacing.sm,
  },
  list: {
    marginHorizontal: -spacing.xxl,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 78,
    paddingHorizontal: spacing.xxl,
  },
  listRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  listRowIcon: {
    width: 24,
    height: 24,
    marginRight: spacing.lg,
  },
  listRowContent: {
    flex: 1,
    justifyContent: 'center',
    minWidth: 0,
  },
  listRowPrimary: {
    fontFamily: Platform.OS === 'web' ? FIGMA.labelStrong.fontFamilyWeb : FIGMA.labelStrong.fontFamily,
    fontSize: FIGMA.labelStrong.fontSize,
    fontWeight: FIGMA.labelStrong.fontWeight,
    lineHeight: FIGMA.labelStrong.lineHeight,
    letterSpacing: FIGMA.labelStrong.letterSpacing,
    color: FIGMA.labelStrong.color,
  },
  listRowDescription: {
    fontFamily: Platform.OS === 'web' ? FIGMA.paragraphSmall.fontFamilyWeb : FIGMA.paragraphSmall.fontFamily,
    fontSize: FIGMA.paragraphSmall.fontSize,
    fontWeight: FIGMA.paragraphSmall.fontWeight,
    lineHeight: FIGMA.paragraphSmall.lineHeight,
    letterSpacing: FIGMA.paragraphSmall.letterSpacing,
    color: FIGMA.paragraphSmall.color,
    marginTop: 2,
  },
  listRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  listRowSecondary: {
    fontFamily: Platform.OS === 'web' ? FIGMA.labelDefault.fontFamilyWeb : FIGMA.labelDefault.fontFamily,
    fontSize: FIGMA.labelDefault.fontSize,
    fontWeight: FIGMA.labelDefault.fontWeight,
    lineHeight: FIGMA.labelDefault.lineHeight,
    letterSpacing: FIGMA.labelDefault.letterSpacing,
    color: FIGMA.labelDefault.color,
    marginRight: spacing.sm,
  },
  listRowCheck: {
    width: 24,
    height: 24,
  },
  bottomBar: {
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxxl,
    backgroundColor: FIGMA.background,
  },
  primaryButton: {
    backgroundColor: PRIMARY_BUTTON_BG,
    height: 48,
    borderRadius: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontFamily: Platform.OS === 'web' ? FIGMA.labelStrong.fontFamilyWeb : FIGMA.labelStrong.fontFamily,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20.8,
    letterSpacing: -1,
    color: '#FFFFFF',
  },
});
