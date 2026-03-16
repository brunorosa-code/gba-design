import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  Header,
  ListRow,
  CheckmarkIcon,
  PlaceholderIcon,
  CloseIcon,
  useNuDSTheme,
} from '@nubank/nuds-vibecode-react-native';

export default function ReviewScreen({ onClose }) {
  const theme = useNuDSTheme();
  const iconColor = theme.color.content.primary;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContainer}>
        <Header
          type="standard"
          title="Header title"
          subtitle="Sub title"
          showSubtitle={true}
          showTopBar={true}
          showAction={true}
          onBackPress={onClose}
          leading={<CloseIcon color={iconColor} opacity={0.62} />}
        />

        <ListRow
          label="Primary label"
          description="Description"
          secondaryLabel="Secondary"
          secondaryDescription="Description"
          trailing={<CheckmarkIcon size={20} color={iconColor} opacity={0.62} />}
          showDivider={true}
          leading={<PlaceholderIcon size={20} color={iconColor} opacity={0.62} />}
        />

        <ListRow
          label="Primary label"
          description="Description"
          secondaryLabel="Secondary"
          secondaryDescription="Description"
          trailing={<CheckmarkIcon size={20} color={iconColor} opacity={0.62} />}
          showDivider={true}
          leading={<PlaceholderIcon size={20} color={iconColor} opacity={0.62} />}
        />

        <ListRow
          label="Primary label"
          description="Description"
          secondaryLabel="Secondary"
          secondaryDescription="Description"
          trailing={<CheckmarkIcon size={20} color={iconColor} opacity={0.62} />}
          showDivider={true}
          leading={<PlaceholderIcon size={20} color={iconColor} opacity={0.62} />}
        />

        <ListRow
          label="Primary label"
          description="Description"
          secondaryLabel="Secondary"
          secondaryDescription="Description"
          trailing={<CheckmarkIcon size={20} color={iconColor} opacity={0.62} />}
          showDivider={false}
          leading={<PlaceholderIcon size={20} color={iconColor} opacity={0.62} />}
        />
      </ScrollView>

      <View style={[styles.bottomBar, { backgroundColor: theme.color.background.primary }]}>
        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: theme.color.accent }]}
          onPress={() => {}}
        >
          <Text style={styles.primaryButtonLabel}>Primary action</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  },
  primaryButton: {
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
    fontFamily: 'Graphik-Semibold',
  },
});
