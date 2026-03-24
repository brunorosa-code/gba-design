import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
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
import PlaceholderIconSvg from '../../assets/icons/placeholder_icon.svg';
import CheckIconSvg from '../../assets/icons/check_icon.svg';
import CloseIconSvg from '../../assets/icons/close.svg';
import { colors, spacing, borderRadius, fontSizes } from '../../shared/tokens';


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
            <CloseIconSvg width={24} height={24} />
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
                <PlaceholderIconSvg width={24} height={24} />
              </View>
              <View style={styles.listRowContent}>
                <Text style={styles.listRowPrimary}>{account.primaryLabel}</Text>
                <Text style={styles.listRowDescription}>{account.description}</Text>
              </View>
              <View style={styles.listRowRight}>
                <Text style={styles.listRowSecondaryRight}>{account.secondary}</Text>
                <CheckIconSvg width={24} height={24} />
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
    fontWeight: '500',
    color: '#000000',
    letterSpacing: -3,
    lineHeight: 34,
  },
  headerSubtitle: {
    fontFamily: Platform.OS === 'web' ? 'Graphik Regular, Graphik-Regular, sans-serif' : 'Graphik-Regular',
    fontSize: 18,
    fontWeight: '400',
    color: colors.textSecondary,
    letterSpacing: -1,
    lineHeight: 23,
    marginTop: 4,
  },
  listTitle: {
    paddingTop: 24,
    paddingBottom: 24,
    paddingHorizontal: spacing.lg,
  },
  listTitleText: {
    fontFamily: Platform.OS === 'web' ? 'Graphik Medium, Graphik-Medium, sans-serif' : 'Graphik-Medium',
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.64)',
    letterSpacing: -1,
    lineHeight: 18,
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
    height: 78,
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
    fontFamily: Platform.OS === 'web' ? 'Graphik-Medium, Graphik Medium, sans-serif' : 'Graphik-Medium',
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    letterSpacing: -0.16,
    lineHeight: 20.8,
  },
  listRowDescription: {
    fontFamily: Platform.OS === 'web' ? 'Graphik-Regular, Graphik Regular, sans-serif' : 'Graphik-Regular',
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
    letterSpacing: -0.14,
    lineHeight: 21,
    marginTop: 2,
  },
  listRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  listRowSecondaryRight: {
    fontFamily: Platform.OS === 'web' ? 'Graphik-Regular, Graphik Regular, sans-serif' : 'Graphik-Regular',
    fontSize: 16,
    fontWeight: '400',
    color: '#666666',
    letterSpacing: -0.16,
    lineHeight: 20.8,
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
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: Platform.OS === 'web' ? 'Graphik Medium, Graphik-Medium, sans-serif' : 'Graphik-Medium',
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
});
