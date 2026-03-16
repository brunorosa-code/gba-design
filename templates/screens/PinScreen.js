import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Animated,
  Dimensions,
} from 'react-native';
import { colors, spacing, fontSizes } from '../../shared/tokens';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const KEYPAD_BUTTON_SIZE = (SCREEN_WIDTH - spacing.sm * 4) / 3;
const KEYPAD_HEIGHT = (46 * 4) + (spacing.sm * 3) + spacing.sm + spacing.xxxl;

const PIN_LENGTH = 4;

const KEYPAD_ROWS = [
  [
    { label: '1', sub: '' },
    { label: '2', sub: 'ABC' },
    { label: '3', sub: 'DEF' },
  ],
  [
    { label: '4', sub: 'GHI' },
    { label: '5', sub: 'JKL' },
    { label: '6', sub: 'MNO' },
  ],
  [
    { label: '7', sub: 'PQRS' },
    { label: '8', sub: 'TUV' },
    { label: '9', sub: 'WXYZ' },
  ],
  [
    { label: '', sub: '' },
    { label: '0', sub: '' },
    { label: 'backspace', sub: '' },
  ],
];

function PinDot({ filled }) {
  return (
    <View style={styles.pinDotContainer}>
      <View style={[styles.pinDot, filled && styles.pinDotFilled]} />
    </View>
  );
}

function KeypadButton({ item, onPress }) {
  if (item.label === '') {
    return <View style={styles.keypadButton} />;
  }

  if (item.label === 'backspace') {
    return (
      <TouchableOpacity
        style={styles.keypadButton}
        onPress={() => onPress('backspace')}
        activeOpacity={0.6}
      >
        <Text style={styles.backspaceIcon}>⌫</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={styles.keypadButton}
      onPress={() => onPress(item.label)}
      activeOpacity={0.6}
    >
      <View style={styles.keypadButtonInner}>
        <Text style={styles.keypadNumber}>{item.label}</Text>
        {item.sub !== '' && (
          <Text style={styles.keypadSub}>{item.sub}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function PinScreen({ onBack, onComplete }) {
  const [pin, setPin] = useState('');
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const keypadAnim = useRef(new Animated.Value(0)).current;

  const showKeyboard = useCallback(() => {
    if (keyboardOpen) return;
    setKeyboardOpen(true);
    Animated.spring(keypadAnim, {
      toValue: 1,
      useNativeDriver: false,
      friction: 10,
      tension: 65,
    }).start();
  }, [keyboardOpen, keypadAnim]);

  const handleOverlayPress = useCallback(() => {
    if (keyboardOpen) {
      setKeyboardOpen(false);
      Animated.spring(keypadAnim, {
        toValue: 0,
        useNativeDriver: false,
        friction: 10,
        tension: 65,
      }).start();
    } else {
      onBack();
    }
  }, [keyboardOpen, keypadAnim, onBack]);

  const handleKeyPress = useCallback((key) => {
    if (key === 'backspace') {
      setPin((prev) => prev.slice(0, -1));
      return;
    }
    setPin((prev) => {
      if (prev.length >= PIN_LENGTH) return prev;
      const next = prev + key;
      if (next.length === PIN_LENGTH && onComplete) {
        setTimeout(() => onComplete(next), 300);
      }
      return next;
    });
  }, [onComplete]);

  const animatedKeypadHeight = keypadAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, KEYPAD_HEIGHT],
  });

  return (
    <Pressable style={styles.overlay} onPress={handleOverlayPress}>
      <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
        <View style={styles.sheetBody}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeButton} onPress={onBack}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          <Pressable style={styles.content} onPress={showKeyboard}>
            <Text style={styles.title}>Digite sua senha de 4 digitos</Text>

            <View style={styles.pinRow}>
              {Array.from({ length: PIN_LENGTH }).map((_, i) => (
                <PinDot key={i} filled={i < pin.length} />
              ))}
            </View>
          </Pressable>
        </View>

        <Animated.View style={[styles.keypadWrapper, { height: animatedKeypadHeight }]}>
          <View style={styles.keypadContainer}>
            {KEYPAD_ROWS.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.keypadRow}>
                {row.map((item, colIndex) => (
                  <KeypadButton
                    key={colIndex}
                    item={item}
                    onPress={handleKeyPress}
                  />
                ))}
              </View>
            ))}
          </View>
        </Animated.View>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.64)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  sheetBody: {
    height: 500,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    height: 56,
  },
  closeButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 18,
    color: colors.textPrimary,
    fontFamily: 'Graphik-Regular',
  },

  content: {
    flex: 1,
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.lg,
  },
  title: {
    fontSize: fontSizes.xl,
    fontFamily: 'Graphik-Medium',
    color: colors.textPrimary,
    lineHeight: 28,
    marginBottom: spacing.section,
  },

  pinRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
  },
  pinDotContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#B7BAC3',
  },
  pinDotFilled: {
    backgroundColor: colors.textPrimary,
  },

  keypadWrapper: {
    overflow: 'hidden',
  },
  keypadContainer: {
    backgroundColor: '#D0D5DB',
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxxl,
    paddingHorizontal: spacing.xs,
    gap: spacing.sm,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  keypadButton: {
    width: KEYPAD_BUTTON_SIZE,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keypadButtonInner: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 0,
    elevation: 1,
  },
  keypadNumber: {
    fontSize: 25,
    color: '#030303',
    fontFamily: 'Graphik-Regular',
    lineHeight: 30,
  },
  keypadSub: {
    fontSize: 11,
    color: '#030303',
    letterSpacing: 1,
    fontFamily: 'Graphik-Regular',
    lineHeight: 13,
  },
  backspaceIcon: {
    fontSize: 22,
    color: '#030303',
  },
});
