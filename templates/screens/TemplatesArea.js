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
        <ListRow
          label="Pin Screen"
          showChevron
          showDivider
          onPress={() => onNavigate?.('pin')}
        />
        <ListRow
          label="Search Template Screen"
          showChevron
          showDivider
          onPress={() => onNavigate?.('searchTemplate')}
        />
        <ListRow
          label="Select Beneficiary Account Screen"
          showChevron
          showDivider
          onPress={() => onNavigate?.('selectBeneficiaryAccount')}
        />
        <ListRow
          label="Success Screen"
          showChevron
          showDivider
          onPress={() => onNavigate?.('success')}
        />
        <ListRow
          label="Review Screen"
          showChevron
          showDivider
          onPress={() => onNavigate?.('review')}
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
