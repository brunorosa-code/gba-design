import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';

// Valores extraídos do Figma — node 592:56697 — única fonte de verdade
// https://www.figma.com/design/Hc52lXjGUDP5PPRIGN53IJ/Super-draft?node-id=592-56697
//
// === Container do Header (BottomSheetHeader) ===
// Cor de fundo: var(--color.background.default, white) → #FFFFFF
// Padding: frame 791:23069 tem top-[8px] → paddingTop 8; left/right/bottom do layout (24, 12)
// Alinhamento: flex row, space-between, alignItems center (TitleGroup à esquerda, CloseButton à direita)
// Borda inferior: nenhuma no design
// Border radius: herda do sheet — var(--border.radius.geometry.medium, 16px)
// Metadata: Header 791:22349 → 375×153
//
// === SheetTitle (Title/Medium) ===
// Família: Graphik | Peso: 500 | Tamanho: 28px
// Line-height: 1.2000000476837158 (34px) | Letter-spacing: -3 | Cor: Content/Default #000000
//
// === SheetSubtitle (Subtitle/Medium/Default) ===
// Família: Graphik | Peso: 400 | Tamanho: 18px
// Line-height: 1.2999999523162842 (23.4px) | Letter-spacing: -1
// Cor: não retornada no node → token secundário #666666
//
// === CloseButton (Icon Action) ===
// Tamanho do ícone: 24×24 | Cor: rgba(0,0,0,0.64) | Sem fundo/radius
// Área clicável: padding 8 + hitSlop 12 | Posicionamento: à direita, centralizado verticalmente
const SPACING = 24;

const FIGMA_HEADER = {
  containerBg: '#FFFFFF',
  titleFontFamily: 'Graphik-Medium',
  titleFontFamilyWeb: "'Graphik Medium', 'Graphik-Medium', sans-serif",
  titleFontSize: 28,
  titleWeight: '500',
  titleLineHeight: 34, // 28 * 1.2000000476837158
  titleLetterSpacing: -3,
  titleColor: '#000000',
  subtitleFontFamily: 'Graphik-Regular',
  subtitleFontFamilyWeb: "'Graphik Regular', 'Graphik-Regular', sans-serif",
  subtitleFontSize: 18,
  subtitleWeight: '400',
  subtitleLineHeight: 23.4, // 18 * 1.2999999523162842
  subtitleLetterSpacing: -1,
  subtitleColor: '#666666',
  closeIconSize: 24,
  closeIconColor: 'rgba(0,0,0,0.64)',
};

// Ícone close (outlined/ui actions/navigation/close.svg)
const CLOSE_ICON_SVG =
  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.0009 13.4152L18.2944 19.7087L19.7087 18.2944L13.4152 12.0009L19.7087 5.70733L18.2944 4.29297L12.0009 10.5865L5.70733 4.29297L4.29297 5.70733L10.5865 12.0009L4.29297 18.2944L5.70733 19.7087L12.0009 13.4152Z" fill="black" fill-opacity="0.64"/></svg>';
const CLOSE_ICON_URI = `data:image/svg+xml,${encodeURIComponent(CLOSE_ICON_SVG)}`;

/**
 * Header do Bottom Sheet.
 * Layout em coluna: CloseButton (esquerda) → 24px → TitleGroup (título e subtítulo).
 * Alinhamento à esquerda e espaçamento 24px em todo o header.
 */
export function BottomSheetHeader({ title, subtitle, onClose }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={onClose}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        accessibilityLabel="Fechar"
        accessibilityRole="button"
      >
        {Platform.OS === 'web' ? (
          <Text style={styles.closeIconText}>×</Text>
        ) : (
          <Image source={{ uri: CLOSE_ICON_URI }} style={styles.closeIconImage} resizeMode="contain" />
        )}
      </TouchableOpacity>
      <View style={styles.titleGroup}>
        {title != null && title !== '' && (
          <Text style={styles.sheetTitle}>
            {title}
          </Text>
        )}
        {subtitle != null && subtitle !== '' && (
          <Text style={styles.sheetSubtitle}>
            {subtitle}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: FIGMA_HEADER.containerBg,
    padding: SPACING,
    flexShrink: 0,
    overflow: 'visible',
  },
  closeButton: {
    alignSelf: 'flex-start',
    marginBottom: SPACING,
  },
  titleGroup: {
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    flexShrink: 0,
    overflow: 'visible',
  },
  sheetTitle: {
    fontFamily: Platform.OS === 'web' ? FIGMA_HEADER.titleFontFamilyWeb : FIGMA_HEADER.titleFontFamily,
    fontSize: FIGMA_HEADER.titleFontSize,
    fontWeight: FIGMA_HEADER.titleWeight,
    lineHeight: FIGMA_HEADER.titleLineHeight,
    letterSpacing: FIGMA_HEADER.titleLetterSpacing,
    color: FIGMA_HEADER.titleColor,
    flexShrink: 0,
  },
  sheetSubtitle: {
    marginTop: 8,
    fontFamily: Platform.OS === 'web' ? FIGMA_HEADER.subtitleFontFamilyWeb : FIGMA_HEADER.subtitleFontFamily,
    fontSize: FIGMA_HEADER.subtitleFontSize,
    fontWeight: FIGMA_HEADER.subtitleWeight,
    lineHeight: FIGMA_HEADER.subtitleLineHeight,
    letterSpacing: FIGMA_HEADER.subtitleLetterSpacing,
    color: FIGMA_HEADER.subtitleColor,
    flexShrink: 0,
  },
  closeIconImage: {
    width: FIGMA_HEADER.closeIconSize,
    height: FIGMA_HEADER.closeIconSize,
  },
  closeIconText: {
    fontSize: 22,
    lineHeight: FIGMA_HEADER.closeIconSize,
    color: FIGMA_HEADER.closeIconColor,
    fontFamily: Platform.OS === 'web' ? FIGMA_HEADER.subtitleFontFamilyWeb : FIGMA_HEADER.subtitleFontFamily,
  },
});
