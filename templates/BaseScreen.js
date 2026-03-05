import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import Header from '../shared/components/Header';
import { colors } from '../shared/tokens/colors';

export default function BaseScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <Header
        type="back"
        onBack={() => {}}
        title="Título da tela"
      />
      <View style={styles.content} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
  },
});
