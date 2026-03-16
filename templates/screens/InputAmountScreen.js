import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Animated,
  StyleSheet,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {
  TopBar,
  CalloutBox,
  Button,
  ArrowRightIcon,
  useNuDSTheme,
} from '@nubank/nuds-vibecode-react-native';

function formatCurrency(raw) {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 0) return '';
  const cents = parseInt(digits, 10);
  const value = (cents / 100).toFixed(2);
  const [intPart, decPart] = value.split('.');
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${formattedInt},${decPart}`;
}

export default function InputAmountScreen({ onBack }) {
  const [rawDigits, setRawDigits] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const focusAnim = useRef(new Animated.Value(0)).current;
  const theme = useNuDSTheme();

  const handleChange = (text) => {
    setRawDigits(text.replace(/\D/g, ''));
  };

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(focusAnim, { toValue: 1, duration: 200, useNativeDriver: false }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(focusAnim, { toValue: 0, duration: 200, useNativeDriver: false }).start();
  };

  const displayValue = formatCurrency(rawDigits);

  const dividerColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.color.border.secondary, theme.color.accent],
  });

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <TopBar
        title=""
        show1stAction={false}
        show2ndAction={false}
        onBackPress={onBack ?? (() => {})}
      />

      <View style={styles.body}>
        <Text style={[styles.screenTitle, { color: theme.color.content.primary }]}>
          How much would you like to deposit?
        </Text>

        <Pressable
          onPress={() => inputRef.current?.focus()}
          style={[styles.textField, { gap: theme.spacing[3] }]}
        >
          <View style={styles.inputRow}>
            <Text style={[styles.currencyPrefix, { color: theme.color.content.primary }]}>
              $
            </Text>
            <Text
              style={[
                styles.amountDisplay,
                {
                  color: displayValue
                    ? theme.color.content.primary
                    : theme.color.content.disabled,
                },
              ]}
            >
              {displayValue || '0,00'}
            </Text>
          </View>
          <Animated.View style={{ height: 2, backgroundColor: dividerColor, width: '100%' }} />
          <TextInput
            ref={inputRef}
            value={rawDigits}
            onChangeText={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            keyboardType="numeric"
            style={styles.hiddenInput}
            caretHidden
          />
        </Pressable>

        <CalloutBox
          title="Want to bring money from another account?"
          description="Connect your accounts and transfer your money here anytime, without leaving the app."
          actionLabel="Connect and transfer"
          onActionPress={() => {}}
          style={styles.calloutBox}
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.bottomArea}
        keyboardVerticalOffset={0}
      >
        <View style={styles.floatingArea}>
          <Button
            iconOnly
            variant="secondary"
            icon={<ArrowRightIcon size={20} color={theme.color.content.primary} />}
            accessibilityLabel="Continue"
            onPress={() => {}}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  body: {
    flex: 1,
  },
  screenTitle: {
    fontFamily: 'Graphik-Medium',
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 34,
    letterSpacing: -0.84,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  textField: {
    paddingHorizontal: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencyPrefix: {
    fontFamily: 'Graphik-Medium',
    fontSize: 24,
    lineHeight: 30,
    marginRight: 8,
  },
  amountDisplay: {
    fontFamily: 'Graphik-Medium',
    fontSize: 24,
    lineHeight: 30,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    height: 0,
    width: 0,
  },
  calloutBox: {
    marginTop: 24,
  },
  bottomArea: {
    justifyContent: 'flex-end',
  },
  floatingArea: {
    alignSelf: 'flex-end',
    paddingRight: 24,
    paddingBottom: 32,
  },
});
