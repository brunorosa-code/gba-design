import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  Platform,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { colors, spacing, borderRadius, fontSizes } from '../../shared/tokens';

// Ícone placeholder para list rows (assets/icons/placeholder_icon.svg)
const PLACEHOLDER_ICON_SVG = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.15381 21H3.15381V19H5.15381V21ZM9.15381 21H7.15381V19H9.15381V21ZM13.1538 21H11.1538V19H13.1538V21ZM17.1538 21H15.1538V19H17.1538V21ZM21.1538 19V21H19.1538V19H21.1538ZM5.15381 17H3.15381V15H5.15381V17ZM21.1538 17H19.1538V15H21.1538V17ZM5.15381 13H3.15381V11H5.15381V13ZM21.1538 13H19.1538V11H21.1538V13ZM5.15381 9H3.15381V7H5.15381V9ZM21.1538 9H19.1538V7H21.1538V9ZM5.15381 5H3.15381V3H5.15381V5ZM9.15381 5H7.15381V3H9.15381V5ZM13.1538 5H11.1538V3H13.1538V5ZM17.1538 5H15.1538V3H17.1538V5ZM21.1538 5H19.1538V3H21.1538V5Z" fill="black" fill-opacity="0.96"/></svg>';
const PLACEHOLDER_ICON_URI = `data:image/svg+xml,${encodeURIComponent(PLACEHOLDER_ICON_SVG)}`;

// Ícones (check, close) em data URI — list row genérico alinhado ao Figma (List Row NuDS)
const CHECK_ICON_SVG = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#000000"/></svg>';
const CHECK_ICON_URI = `data:image/svg+xml,${encodeURIComponent(CHECK_ICON_SVG)}`;
const CLOSE_ICON_SVG = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.0009 13.4152L18.2944 19.7087L19.7087 18.2944L13.4152 12.0009L19.7087 5.70733L18.2944 4.29297L12.0009 10.5865L5.70733 4.29297L4.29297 5.70733L10.5865 12.0009L4.29297 18.2944L5.70733 19.7087L12.0009 13.4152Z" fill="#000000" fill-opacity="0.64"/></svg>';
const CLOSE_ICON_URI = `data:image/svg+xml,${encodeURIComponent(CLOSE_ICON_SVG)}`;

/**
 * Bottom sheet "Selecionar conta beneficiária".
 * Clique em "Selecionar conta beneficiária" → open overlay. Overlay: bottom sheet + backdrop #000000 50%.
 * Position: bottom center. Close: toque fora ou no "x". Animation: move in / direction up / curve ease-in.
 */
export default function SelectBeneficiaryAccountScreen({
  visible = false,
  onClose,
  onSelectAccount,
  onChooseOtherContact,
}) {
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: Dimensions.get('window').height,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      slideAnim.setValue(Dimensions.get('window').height);
      backdropOpacity.setValue(0);
      onClose?.();
    });
  };

  useEffect(() => {
    if (visible) {
      const height = Dimensions.get('window').height;
      slideAnim.setValue(height);
      backdropOpacity.setValue(0);
      const startAnim = () => {
        Animated.parallel([
          Animated.timing(backdropOpacity, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),
        ]).start();
      };
      if (Platform.OS === 'web' && typeof requestAnimationFrame !== 'undefined') {
        requestAnimationFrame(startAnim);
      } else {
        startAnim();
      }
    } else {
      slideAnim.setValue(Dimensions.get('window').height);
      backdropOpacity.setValue(0);
    }
  }, [visible]);

  // No web: aplica a fonte Graphik no DOM do tray para o "ú" herdar corretamente
  useEffect(() => {
    if (Platform.OS !== 'web' || !visible || typeof document === 'undefined') return;
    const applyFont = () => {
      const el = document.querySelector('[data-testid="select-beneficiary-tray"]');
      if (el) el.style.fontFamily = "'Graphik Medium', 'Graphik-Medium', sans-serif";
    };
    applyFont();
    const t = setTimeout(applyFont, 100);
    return () => clearTimeout(t);
  }, [visible]);

  // List row genérico: os 3 com o mesmo ícone placeholder e mesmas características
  const accounts = [
    {
      id: 'row1',
      primaryLabel: 'Primary label',
      description: 'Description',
      secondary: 'Secondary',
    },
    {
      id: 'row2',
      primaryLabel: 'Primary label',
      description: 'Description',
      secondary: 'Secondary',
    },
    {
      id: 'row3',
      primaryLabel: 'Primary label',
      description: 'Description',
      secondary: 'Secondary',
    },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      {/* Overlay no fundo do bottom sheet: backdrop #000000 50%; sheet por cima. Toque fora ou "x" fecha. */}
      <View style={styles.modalContainer} pointerEvents="box-none">
        <Pressable style={[StyleSheet.absoluteFillObject, styles.backdropTouch]} onPress={handleClose}>
          <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]} pointerEvents="none" />
        </Pressable>
        <Animated.View
          style={[styles.tray, { transform: [{ translateY: slideAnim }] }]}
          pointerEvents="box-none"
          testID="select-beneficiary-tray"
        >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerClose}
            onPress={handleClose}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Image source={{ uri: CLOSE_ICON_URI }} style={styles.headerCloseIconImage} resizeMode="contain" />
          </TouchableOpacity>
          <View style={styles.headerTextBlock}>
            <Text style={styles.headerTitle}>Header title</Text>
            <Text style={styles.headerSubtitle}>Sub title</Text>
          </View>
        </View>

        {/* List Title */}
        <View style={styles.listTitle}>
          <Text style={styles.listTitleText}>List title</Text>
        </View>

        {/* List Rows */}
        <ScrollView
          style={styles.listScroll}
          contentContainerStyle={styles.listScrollContent}
          showsVerticalScrollIndicator={false}
        >
          {accounts.map((account) => (
            <TouchableOpacity
              key={account.id}
              style={styles.listRow}
              onPress={() => onSelectAccount?.(account)}
              activeOpacity={0.7}
            >
              <View style={styles.listRowAvatar}>
                <Image source={{ uri: PLACEHOLDER_ICON_URI }} style={styles.listRowPlaceholderIcon} resizeMode="contain" />
              </View>
              <View style={styles.listRowContent}>
                <Text style={styles.listRowPrimary}>{account.primaryLabel}</Text>
                <Text style={styles.listRowDescription}>{account.description}</Text>
              </View>
              <View style={styles.listRowRight}>
                <Text style={styles.listRowSecondaryRight}>{account.secondary}</Text>
                <Image source={{ uri: CHECK_ICON_URI }} style={styles.listRowCheckImage} resizeMode="contain" />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Bottom Bar - Button */}
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.button}
            onPress={onChooseOtherContact ?? handleClose}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Primary action</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  backdropTouch: {
    zIndex: 0,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  tray: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignSelf: 'center',
    zIndex: 1,
    backgroundColor: colors.backgroundCard,
    borderTopLeftRadius: borderRadius.lg,
    borderTopRightRadius: borderRadius.lg,
    overflow: 'hidden',
    maxHeight: '85%',
  },
  // Header — 24px entre o topo do bottom sheet e o ícone "x"
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: 24,
    paddingBottom: spacing.md,
  },
  headerClose: {
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
  },
  headerCloseIconImage: {
    width: 24,
    height: 24,
  },
  headerTextBlock: {
    marginTop: 24,
    marginBottom: spacing.xs,
  },
  headerTitle: {
    fontFamily: Platform.OS === 'web' ? 'Graphik Medium, Graphik-Medium, sans-serif' : 'Graphik-Medium',
    fontSize: 28,
    color: colors.textPrimary,
    letterSpacing: -1,
    lineHeight: 34,
  },
  headerSubtitle: {
    fontFamily: Platform.OS === 'web' ? 'Graphik Regular, Graphik-Regular, sans-serif' : 'Graphik-Regular',
    fontSize: 18,
    color: colors.textSecondary,
    marginTop: 2,
    letterSpacing: -0.5,
  },
  // List Title — espaço entre CPF e "Qual a conta?" reduzido em 8px (era 30px, agora 22px)
  listTitle: {
    paddingTop: 22,
    paddingBottom: 16,
    paddingHorizontal: spacing.lg,
  },
  listTitleText: {
    fontFamily: Platform.OS === 'web' ? 'Graphik Medium, Graphik-Medium, sans-serif' : 'Graphik-Medium',
    fontSize: 14,
    color: 'rgba(0,0,0,0.64)',
    letterSpacing: -0.5,
  },
  // List
  listScroll: {
    maxHeight: 280,
  },
  listScrollContent: {
    paddingBottom: spacing.md,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  listRowAvatar: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: '#EFEFEF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  listRowPlaceholderIcon: {
    width: 24,
    height: 24,
  },
  listRowContent: {
    flex: 1,
    justifyContent: 'center',
    minWidth: 0,
  },
  listRowPrimary: {
    fontFamily: Platform.OS === 'web' ? 'Graphik Medium, Graphik-Medium, sans-serif' : 'Graphik-Medium',
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    letterSpacing: -1,
    lineHeight: 21,
  },
  listRowDescription: {
    fontFamily: Platform.OS === 'web' ? 'Graphik Regular, Graphik-Regular, sans-serif' : 'Graphik-Regular',
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    letterSpacing: -1,
    lineHeight: 21,
    marginTop: 2,
  },
  listRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  listRowSecondaryRight: {
    fontFamily: Platform.OS === 'web' ? 'Graphik Regular, Graphik-Regular, sans-serif' : 'Graphik-Regular',
    fontSize: 16,
    fontWeight: '400',
    color: colors.textSecondary,
    letterSpacing: -1,
    marginRight: spacing.sm,
  },
  listRowCheckImage: {
    width: 24,
    height: 24,
  },
  // Bottom Bar - Button — espaço abaixo do botão reduzido em 8px (era 40px, agora 32px)
  bottomBar: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: 32,
  },
  button: {
    backgroundColor: '#EFEFEF',
    height: 48,
    borderRadius: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: Platform.OS === 'web' ? 'Graphik Medium, Graphik-Medium, sans-serif' : 'Graphik-Medium',
    fontSize: fontSizes.base,
    color: '#000000',
  },
});
