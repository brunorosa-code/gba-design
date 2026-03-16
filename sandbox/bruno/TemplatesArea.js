import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Header, ListRow } from '@nubank/nuds-vibecode-react-native';

export default function TemplatesArea({ onNavigate, onBackPress, onActionPress }) {
  return (
    <View style={styles.container}>
      <Header
        title="Templates Area"
        subtitle="All templates within the GBA repository."
        showSubtitle
        onBackPress={onBackPress}
        onActionPress={onActionPress}
      />

      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        <ListRow
          label="Input Amount Screen"
          showChevron
          showDivider
          onPress={() => onNavigate?.('inputAmount')}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 24,
  },
});
