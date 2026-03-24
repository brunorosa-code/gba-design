import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import PlaceholderIcon from '../../assets/icons/placeholder_icon.svg';
import SearchIcon from '../../assets/icons/search_icon.svg';
import { colors, spacing, fontSizes, fontWeights, borderRadius } from '../../shared/tokens';

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
          <PlaceholderIcon width={24} height={24} />
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
          <SearchIcon width={18} height={18} />
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
