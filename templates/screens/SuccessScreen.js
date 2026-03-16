import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Image,
  ScrollView,
} from 'react-native';
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
    color: colors.textSecondary,
  },
  paragraphSmall: {
    fontFamily: 'Graphik-Regular',
    fontFamilyWeb: "'Graphik Regular', 'Graphik-Regular', sans-serif",
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    letterSpacing: -1,
    color: colors.textSecondary,
  },
};

// Ícones — header: #000000 64% (rgba(0,0,0,0.64)) | lista: #000000 96% (rgba(0,0,0,0.96))
const ICON_HEADER = 'rgba(0,0,0,0.64)';
const ICON_LIST = 'rgba(0,0,0,0.96)';

const ARROW_BACK_SVG =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.29341 11.2938L14.2942 3.29297L15.7086 4.70733L8.41495 12.001L15.7086 19.2946L14.2942 20.709L6.29341 12.7081C5.90285 12.3176 5.90285 11.6843 6.29341 11.2938Z" fill="' + ICON_HEADER + '"/></svg>';
const ARROW_BACK_URI = `data:image/svg+xml,${encodeURIComponent(ARROW_BACK_SVG)}`;

const CHECK_ICON_SVG =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.8106 17.5566C10.4201 17.9471 9.78693 17.9471 9.3964 17.5566L3.73973 11.8999L5.15394 10.4857L10.1035 15.4352L20.003 5.53575L21.4172 6.94996L10.8106 17.5566Z" fill="' + ICON_LIST + '"/></svg>';
const ROW_CHECK_URI = `data:image/svg+xml,${encodeURIComponent(CHECK_ICON_SVG)}`;

const PLACEHOLDER_ICON_SVG =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.15381 21H3.15381V19H5.15381V21ZM9.15381 21H7.15381V19H9.15381V21ZM13.1538 21H11.1538V19H13.1538V21ZM17.1538 21H15.1538V19H17.1538V21ZM21.1538 19V21H19.1538V19H21.1538ZM5.15381 17H3.15381V15H5.15381V17ZM21.1538 17H19.1538V15H21.1538V17ZM5.15381 13H3.15381V11H5.15381V13ZM21.1538 13H19.1538V11H21.1538V13ZM5.15381 9H3.15381V7H5.15381V9ZM21.1538 9H19.1538V7H21.1538V9ZM5.15381 5H3.15381V3H5.15381V5ZM9.15381 5H7.15381V3H9.15381V5ZM13.1538 5H11.1538V3H13.1538V5ZM17.1538 5H15.1538V3H17.1538V5ZM21.1538 5H19.1538V3H21.1538V5Z" fill="' + ICON_LIST + '"/></svg>';
const PLACEHOLDER_ICON_URI = `data:image/svg+xml,${encodeURIComponent(PLACEHOLDER_ICON_SVG)}`;

const HELP_ICON_SVG =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.1549 8.26859C12.7736 8.04843 12.3303 7.96025 11.8938 8.01773C11.4572 8.0752 11.0518 8.27511 10.7405 8.58646C10.4291 8.89781 10.2292 9.30319 10.1717 9.73974C10.1455 9.93866 10.1496 10.139 10.1826 10.3342L8.21038 10.6676C8.14438 10.2771 8.13627 9.87647 8.18865 9.47866C8.30359 8.60557 8.70342 7.7948 9.32612 7.1721C9.94881 6.54941 10.7596 6.14958 11.6327 6.03463C12.5058 5.91969 13.3924 6.09605 14.155 6.53636C14.9177 6.97668 15.5137 7.65634 15.8507 8.46993C16.1877 9.28352 16.2468 10.1856 16.0189 11.0362C15.791 11.8868 15.2888 12.6385 14.5901 13.1746C14.1674 13.4989 13.7908 13.8146 13.5203 14.1461C13.254 14.4725 13.1549 14.736 13.1549 14.9648V15.0013H11.1547V14.9648C11.1547 14.1091 11.5387 13.4108 11.9705 12.8816C12.3982 12.3575 12.9348 11.9235 13.3725 11.5877C13.7218 11.3196 13.9729 10.9438 14.0869 10.5185C14.2008 10.0932 14.1713 9.64217 14.0028 9.23537C13.8343 8.82858 13.5363 8.48875 13.1549 8.26859Z" fill="' + ICON_HEADER + '"/><path d="M13.1549 18.0016V16.0014H11.1547V18.0016H13.1549Z" fill="' + ICON_HEADER + '"/><path d="M12.1548 22.002C17.6782 22.002 22.1558 17.5244 22.1558 12.001C22.1558 6.47761 17.6782 2 12.1548 2C6.63142 2 2.15381 6.47761 2.15381 12.001C2.15381 17.5244 6.63142 22.002 12.1548 22.002ZM12.1548 20.0018C7.7361 20.0018 4.15401 16.4197 4.15401 12.001C4.15401 7.58229 7.7361 4.0002 12.1548 4.0002C16.5736 4.0002 20.1556 7.58229 20.1556 12.001C20.1556 16.4197 16.5736 20.0018 12.1548 20.0018Z" fill="' + ICON_HEADER + '"/></svg>';
const HELP_ICON_URI = `data:image/svg+xml,${encodeURIComponent(HELP_ICON_SVG)}`;

// Ilustração Well Done — well_done_ilustra.svg | alinhamento à esquerda, espaçamento 24px
const WELL_DONE_ILUSTRA_SVG =
  '<svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_803_22853)"><mask id="mask0_803_22853" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="-7" y="13" width="119" height="132"><path d="M19.7891 138.145C19.7891 138.145 37.6191 61.8355 102.709 39.3555" stroke="url(#paint0_linear_803_22853)" stroke-width="55" stroke-miterlimit="10"/></mask><g mask="url(#mask0_803_22853)"><path d="M19.7891 138.145C19.7891 138.145 37.6191 61.8355 102.709 39.3555" stroke="#00AA1E" stroke-width="55" stroke-miterlimit="10"/></g><path d="M102.5 67C117.684 67 130 54.6845 130 39.5C130 24.3155 117.684 12 102.5 12C87.3155 12 75 24.3155 75 39.5C75 54.6845 87.3155 67 102.5 67Z" fill="#00AA1E"/><path fill-rule="evenodd" clip-rule="evenodd" d="M118.39 32.4403L98.4398 51.8003L87.5898 41.0803L90.3998 38.2403L98.4598 46.2103L115.6 29.5703L118.39 32.4403Z" fill="white"/></g><defs><linearGradient id="paint0_linear_803_22853" x1="25.6837" y1="129.623" x2="96.7303" y2="39.3555" gradientUnits="userSpaceOnUse"><stop stop-opacity="0"/><stop offset="1" stop-opacity="0.6"/></linearGradient><clipPath id="clip0_803_22853"><rect width="150" height="150" fill="white"/></clipPath></defs></svg>';
const WELL_DONE_ILUSTRA_URI = `data:image/svg+xml,${encodeURIComponent(WELL_DONE_ILUSTRA_SVG)}`;

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
  const titleFontFamily = Platform.OS === 'web' ? FIGMA.title.fontFamilyWeb : FIGMA.title.fontFamily;
  const subtitleFontFamily = Platform.OS === 'web' ? FIGMA.subtitle.fontFamilyWeb : FIGMA.subtitle.fontFamily;
  const labelStrongFontFamily = Platform.OS === 'web' ? FIGMA.labelStrong.fontFamilyWeb : FIGMA.labelStrong.fontFamily;
  const labelDefaultFontFamily = Platform.OS === 'web' ? FIGMA.labelDefault.fontFamilyWeb : FIGMA.labelDefault.fontFamily;
  const paragraphFontFamily = Platform.OS === 'web' ? FIGMA.paragraphSmall.fontFamilyWeb : FIGMA.paragraphSmall.fontFamily;

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
            <Image source={{ uri: ARROW_BACK_URI }} style={styles.topBarIcon} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={[styles.topBarTitle, { fontFamily: labelStrongFontFamily }]} numberOfLines={1}>
            {screenTitle}
          </Text>
          <TouchableOpacity
            style={styles.topBarButton}
            onPress={onHelp}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            accessibilityLabel="Ajuda"
            accessibilityRole="button"
          >
            <Image source={{ uri: HELP_ICON_URI }} style={styles.topBarIcon} resizeMode="contain" />
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
          <Image source={{ uri: WELL_DONE_ILUSTRA_URI }} style={styles.wellDoneImage} resizeMode="contain" />
        </View>

        {/* Título e subtítulo */}
        <View style={styles.headerTextBlock}>
          <Text style={[styles.headerTitle, { fontFamily: titleFontFamily }]}>{title}</Text>
          <Text style={[styles.headerSubtitle, { fontFamily: subtitleFontFamily }]}>{subtitle}</Text>
        </View>

        {/* List rows — 78px height cada (Figma) */}
        {items && items.length > 0 && (
          <View style={styles.list}>
            {items.map((item, index) => (
              <View
                key={item.id || index}
                style={[styles.listRow, index < items.length - 1 && styles.listRowBorder]}
              >
                <Image source={{ uri: PLACEHOLDER_ICON_URI }} style={styles.listRowIcon} resizeMode="contain" />
                <View style={styles.listRowContent}>
                  <Text style={[styles.listRowPrimary, { fontFamily: labelStrongFontFamily }]}>
                    {item.primaryLabel}
                  </Text>
                  <Text style={[styles.listRowDescription, { fontFamily: paragraphFontFamily }]}>
                    {item.description}
                  </Text>
                </View>
                <View style={styles.listRowRight}>
                  <Text style={[styles.listRowSecondary, { fontFamily: labelDefaultFontFamily }]}>
                    {item.secondaryLabel}
                  </Text>
                  <Image source={{ uri: ROW_CHECK_URI }} style={styles.listRowCheck} resizeMode="contain" />
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
          <Text style={[styles.primaryButtonText, { fontFamily: labelStrongFontFamily }]}>
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
  topBarChevron: {
    fontSize: 28,
    color: FIGMA.title.color,
    lineHeight: 32,
  },
  topBarHelp: {
    fontSize: 18,
    color: FIGMA.title.color,
    fontWeight: '500',
  },
  topBarTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: FIGMA.title.color,
    letterSpacing: -1,
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
    fontSize: FIGMA.title.fontSize,
    fontWeight: FIGMA.title.fontWeight,
    lineHeight: FIGMA.title.lineHeight,
    letterSpacing: FIGMA.title.letterSpacing,
    color: FIGMA.title.color,
  },
  headerSubtitle: {
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
    fontSize: FIGMA.labelStrong.fontSize,
    fontWeight: FIGMA.labelStrong.fontWeight,
    lineHeight: FIGMA.labelStrong.lineHeight,
    letterSpacing: FIGMA.labelStrong.letterSpacing,
    color: FIGMA.labelStrong.color,
  },
  listRowDescription: {
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
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    letterSpacing: -1,
  },
});
