import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import { colors, spacing, fontSizes, fontWeights, borderRadius } from '../../shared/tokens';

const ICON_PLACEHOLDER_URI = `data:image/svg+xml,${encodeURIComponent('<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.1543 21H3.1543V19H5.1543V21ZM9.1543 21H7.1543V19H9.1543V21ZM13.1543 21H11.1543V19H13.1543V21ZM17.1543 21H15.1543V19H17.1543V21ZM21.1543 19V21H19.1543V19H21.1543ZM5.1543 17H3.1543V15H5.1543V17ZM21.1543 17H19.1543V15H21.1543V17ZM5.1543 13H3.1543V11H5.1543V13ZM21.1543 13H19.1543V11H21.1543V13ZM5.1543 9H3.1543V7H5.1543V9ZM21.1543 9H19.1543V7H21.1543V9ZM5.1543 5H3.1543V3H5.1543V5ZM9.1543 5H7.1543V3H9.1543V5ZM13.1543 5H11.1543V3H13.1543V5ZM17.1543 5H15.1543V3H17.1543V5ZM21.1543 5H19.1543V3H21.1543V5Z" fill="black" fill-opacity="0.96"/></svg>')}`;

const SEARCH_ICON_URI = `data:image/svg+xml,${encodeURIComponent('<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.3315 11.361C9.48077 11.9982 8.42425 12.3756 7.27959 12.3756C4.46515 12.3756 2.18359 10.094 2.18359 7.27959C2.18359 4.46515 4.46515 2.18359 7.27959 2.18359C10.094 2.18359 12.3756 4.46515 12.3756 7.27959C12.3756 8.42425 11.9982 9.48077 11.361 10.3315L15.0744 14.0448L14.0448 15.0744L10.3315 11.361ZM10.9196 7.27959C10.9196 5.26928 9.28991 3.63959 7.27959 3.63959C5.26928 3.63959 3.63959 5.26928 3.63959 7.27959C3.63959 9.28991 5.26928 10.9196 7.27959 10.9196C9.28991 10.9196 10.9196 9.28991 10.9196 7.27959Z" fill="black" fill-opacity="0.64"/></svg>')}`;

const LIST_ITEMS = [
  { id: '1', name: 'Label', description: 'Description' },
  { id: '2', name: 'Label', description: 'Description' },
  { id: '3', name: 'Label', description: 'Description' },
  { id: '4', name: 'Label', description: 'Description' },
  { id: '5', name: 'Label', description: 'Description' },
  { id: '6', name: 'Label', description: 'Description' },
  { id: '7', name: 'Label', description: 'Description' },
  { id: '8', name: 'Label', description: 'Description' },
  { id: '9', name: 'Label', description: 'Description' },
  { id: '10', name: 'Label', description: 'Description' },
];

function ListRow({ item, isLast }) {
  return (
    <View>
      <TouchableOpacity style={styles.row} activeOpacity={0.6}>
        <View style={styles.avatar}>
          <Image source={{ uri: ICON_PLACEHOLDER_URI }} style={styles.avatarIcon} />
        </View>
        <View style={styles.rowContent}>
          <Text style={styles.rowName} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.rowDescription} numberOfLines={1}>{item.description}</Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>
      {!isLast && (
        <View style={styles.dividerWrapper}>
          <View style={styles.divider} />
        </View>
      )}
    </View>
  );
}

export default function SearchTemplateScreen({ onBack }) {
  const [search, setSearch] = useState('');

  const filteredItems = useMemo(() => {
    if (!search.trim()) return LIST_ITEMS;
    const q = search.trim().toLowerCase();
    return LIST_ITEMS.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <SafeAreaView style={styles.container}>
      {/* nav_bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Title</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* search_bar */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchBar}>
          <Image source={{ uri: SEARCH_ICON_URI }} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar"
            placeholderTextColor="rgba(0,0,0,0.4)"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* list_title */}
      <View style={styles.listTitleWrapper}>
        <Text style={styles.listTitleText}>List title</Text>
      </View>

      {/* list */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ListRow item={item} isLast={index === filteredItems.length - 1} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    height: 56,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 28,
    color: colors.textPrimary,
    marginTop: -2,
  },
  headerTitle: {
    fontSize: fontSizes.base,
    fontFamily: 'Graphik-Medium',
    color: colors.textPrimary,
  },
  headerSpacer: {
    width: 44,
  },

  searchWrapper: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.lg,
    height: 40,
    gap: spacing.md,
  },
  searchIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  searchInput: {
    flex: 1,
    fontSize: fontSizes.md,
    fontFamily: 'Graphik-Medium',
    color: colors.textPrimary,
    padding: 0,
  },

  listTitleWrapper: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  listTitleText: {
    fontSize: fontSizes.md,
    fontFamily: 'Graphik-Medium',
    color: 'rgba(0,0,0,0.64)',
  },

  listContent: {
    paddingBottom: spacing.section,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: spacing.md,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },

  rowContent: {
    flex: 1,
    gap: 4,
  },
  rowName: {
    fontSize: fontSizes.base,
    fontFamily: 'Graphik-Medium',
    color: colors.textPrimary,
  },
  rowDescription: {
    fontSize: fontSizes.xs,
    fontFamily: 'Graphik-Regular',
    color: 'rgba(0,0,0,0.64)',
  },
  chevron: {
    fontSize: 22,
    color: colors.textTertiary,
  },

  dividerWrapper: {
    paddingHorizontal: spacing.xl,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
});
