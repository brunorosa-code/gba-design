import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NuDSThemeProvider } from '@nubank/nuds-vibecode-react-native/src/theme/NuDSThemeProvider';
import { Header } from '@nubank/nuds-vibecode-react-native/src/components/Header/Header';
import { ListRow } from '@nubank/nuds-vibecode-react-native/src/components/ListRow/ListRow';
import { CheckIcon } from '@nubank/nuds-vibecode-react-native/src/icons/CheckIcon';
import { PlaceholderIcon } from '@nubank/nuds-vibecode-react-native/src/icons/PlaceholderIcon';
import { CloseIcon } from '@nubank/nuds-vibecode-react-native/src/icons/CloseIcon';

export default function ReviewScreen({ onClose }) {
  return (
    <NuDSThemeProvider mode="light" segment="pf">
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContainer}>
          <Header
            type="standard"
            title="Header title"
            subtitle="Sub title"
            showSubtitle={true}
            showTopBar={true}
            showAction={true}
            onBackPress={onClose}
            leading={<CloseIcon color="#000000" opacity={0.62} />}
          />

          <ListRow
            label="Primary label"
            description="Description"
            secondaryLabel="Secondary"
            secondaryDescription="Description"
            trailing={<CheckIcon size={20} color="#000000" opacity={0.62} />}
            showDivider={true}
            leading={<PlaceholderIcon size={20} color="#000000" opacity={0.62} />}
          />

          <ListRow
            label="Primary label"
            description="Description"
            secondaryLabel="Secondary"
            secondaryDescription="Description"
            trailing={<CheckIcon size={20} color="#000000" opacity={0.62} />}
            showDivider={true}
            leading={<PlaceholderIcon size={20} color="#000000" opacity={0.62} />}
          />

          <ListRow
            label="Primary label"
            description="Description"
            secondaryLabel="Secondary"
            secondaryDescription="Description"
            trailing={<CheckIcon size={20} color="#000000" opacity={0.62} />}
            showDivider={true}
            leading={<PlaceholderIcon size={20} color="#000000" opacity={0.62} />}
          />

          <ListRow
            label="Primary label"
            description="Description"
            secondaryLabel="Secondary"
            secondaryDescription="Description"
            trailing={<CheckIcon size={20} color="#000000" opacity={0.62} />}
            showDivider={false}
            leading={<PlaceholderIcon size={20} color="#000000" opacity={0.62} />}
          />
        </ScrollView>

        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.primaryButton} onPress={() => {}}>
            <Text style={styles.primaryButtonLabel}>Primary action</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </NuDSThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  bottomBar: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
  },
  primaryButton: {
    backgroundColor: '#820AD1',
    height: 48,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  primaryButtonLabel: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'NuSansText-Semibold',
  },
});
