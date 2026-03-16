import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Animated,
  Easing,
  Dimensions,
  BackHandler,
} from 'react-native';
import { BottomSheetHeader } from './BottomSheetHeader';
// UI do sheet usa apenas valores extraídos do Figma (const FIGMA abaixo)

// Nomes das fontes Graphik carregadas pelo App (expo-font) — uso explícito para herança no Modal
const FONT_GRAPHIK_MEDIUM = Platform.OS === 'web' ? "'Graphik Medium', 'Graphik-Medium', sans-serif" : 'Graphik-Medium';
const FONT_GRAPHIK_REGULAR = Platform.OS === 'web' ? "'Graphik Regular', 'Graphik-Regular', sans-serif" : 'Graphik-Regular';

/**
 * Generic Bottom Sheet component.
 * - Overlay: full screen #000 50%; close on tap overlay, "×" button, or Escape.
 * - Open animation: slide up 300ms ease-in; overlay fade-in 300ms.
 */
export default function BottomSheet({ isOpen, onClose, title, subtitle, children, triggerRef }) {
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const ANIM_DURATION = 300;
  const easing = Easing.in(Easing.ease);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: ANIM_DURATION,
        easing,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: Dimensions.get('window').height,
        duration: ANIM_DURATION,
        easing,
        useNativeDriver: true,
      }),
    ]).start(() => {
      slideAnim.setValue(Dimensions.get('window').height);
      overlayOpacity.setValue(0);
      onClose?.();
      if (Platform.OS === 'web' && triggerRef?.current?.focus) {
        try {
          triggerRef.current.focus();
        } catch (_) {}
      }
    });
  };

  useEffect(() => {
    if (!isOpen) return;
    const height = Dimensions.get('window').height;
    slideAnim.setValue(height);
    overlayOpacity.setValue(0);
    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: ANIM_DURATION,
        easing,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: ANIM_DURATION,
        easing,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onBack = () => {
      handleClose();
      return true;
    };
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', onBack);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBack);
    }
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      const onKeyDown = (e) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          handleClose();
        }
      };
      document.addEventListener('keydown', onKeyDown);
      return () => document.removeEventListener('keydown', onKeyDown);
    }
  }, [isOpen]);

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return;
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  // No web: aplica Graphik no DOM do sheet para título e subtítulo herdarem (Modal não herda fontes do app)
  useEffect(() => {
    if (Platform.OS !== 'web' || !isOpen || typeof document === 'undefined') return;
    const applyFont = () => {
      const el = document.querySelector('[data-testid="bottom-sheet-panel"]');
      if (el) el.style.fontFamily = FONT_GRAPHIK_REGULAR;
    };
    applyFont();
    const t = setTimeout(applyFont, 100);
    return () => clearTimeout(t);
  }, [isOpen]);

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="none"
      onRequestClose={handleClose}
      statusBarTranslucent
      accessibilityViewIsModal
      accessibilityRole="dialog"
    >
      <View style={styles.overlayContainer} pointerEvents="box-none">
        <Pressable
          style={StyleSheet.absoluteFillObject}
          onPress={handleClose}
          accessibilityLabel="Close"
          accessibilityRole="button"
        >
          <Animated.View
            style={[styles.overlay, { opacity: overlayOpacity }]}
            pointerEvents="none"
          />
        </Pressable>
        <Animated.View
          style={[styles.sheet, styles.sheetFont, { transform: [{ translateY: slideAnim }] }]}
          pointerEvents="box-none"
          accessibilityViewIsModal
          accessibilityRole="dialog"
          testID="bottom-sheet-panel"
        >
          <BottomSheetHeader title={title} subtitle={subtitle} onClose={handleClose} />
          <ScrollView
            style={styles.body}
            contentContainerStyle={styles.bodyContent}
            showsVerticalScrollIndicator={true}
            keyboardShouldPersistTaps="handled"
          >
            {children}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

// Valores extraídos do Figma (node 791:22348) — sheet e body apenas (header em BottomSheetHeader)
const FIGMA = {
  sheetBg: '#FFFFFF',
  sheetRadius: 16,
  paddingHorizontal: 24,
  paddingBodyVertical: 16,
  paddingBodyBottom: 24,
};

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignSelf: 'center',
    backgroundColor: FIGMA.sheetBg,
    borderTopLeftRadius: FIGMA.sheetRadius,
    borderTopRightRadius: FIGMA.sheetRadius,
    overflow: 'hidden',
    maxHeight: '85%',
  },
  sheetFont: {
    fontFamily: FONT_GRAPHIK_REGULAR,
  },
  body: {
    flexGrow: 0,
    flexShrink: 1,
  },
  bodyContent: {
    paddingHorizontal: FIGMA.paddingHorizontal,
    paddingTop: FIGMA.paddingBodyVertical,
    paddingBottom: FIGMA.paddingBodyBottom,
  },
});
