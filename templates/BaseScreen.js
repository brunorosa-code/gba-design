import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Header } from '@nubank/nuds-vibecode-react-native';
import { colors } from '../shared/tokens/colors';

export default function BaseScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <Header
        type="standard"
        title="Header title"
        subtitle="Subtitle"
        onBackPress={() => {}}
        onActionPress={() => {}}
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
