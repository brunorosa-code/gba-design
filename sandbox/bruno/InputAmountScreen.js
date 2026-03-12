import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {
  Header,
  TextField,
  CalloutBox,
  Button,
  ArrowRightIcon,
  useNuDSTheme,
} from '@nubank/nuds-vibecode-react-native';

export default function InputAmountScreen() {
  const [amount, setAmount] = useState('');
  const theme = useNuDSTheme();

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <Header
        type="standard"
        title=""
        showSubtitle={false}
        onBackPress={() => {}}
      />

      <Text style={[styles.screenTitle, { color: theme.color.content.primary }]}>
        Qual valor você quer depositar usando Pix?
      </Text>

      <View style={styles.inputFieldContainer}>
        <TextField
          type="large"
          leadingValue="R$"
          placeholder="0,00"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.calloutWrapper}>
        <CalloutBox
          title="Quer trazer dinheiro do Mercado Pago?"
          description="Conecte suas contas e traga seu dinheiro pra cá sempre que quiser, sem sair do app."
          actionLabel="Conectar e trazer dinheiro"
          onActionPress={() => {}}
          tone="accent"
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
            accessibilityLabel="Continuar"
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
  screenTitle: {
    fontFamily: 'Graphik-Medium',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: -0.6,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  inputFieldContainer: {
    paddingHorizontal: 20,
  },
  calloutWrapper: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  bottomArea: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  floatingArea: {
    alignSelf: 'flex-end',
    paddingRight: 24,
    paddingBottom: 32,
  },
});
