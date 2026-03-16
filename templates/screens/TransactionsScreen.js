import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  SectionList,
  Animated,
} from 'react-native';
import { colors, spacing, fontSizes, fontWeights, borderRadius } from '../../shared/tokens';

const ALL_TRANSACTIONS = [
  { id: '1', icon: '👩', name: 'Sofía Sanchez', type: 'Transfer Received', amount: 600, isIncoming: true, section: 'Today' },
  { id: '2', icon: '👨', name: 'Carlos Smith', type: 'Transfer', amount: 600, isIncoming: false, section: 'Today' },
  { id: '3', icon: '🏦', name: 'Chase Bank', type: 'Open Finance', amount: 600, isIncoming: true, section: 'Today' },
  { id: '4', icon: '🔴', name: 'Santander', type: 'Open Finance', amount: 600, isIncoming: false, section: 'Today' },
  { id: '5', icon: '🏧', name: 'Itaú', type: 'Cash Deposit', amount: 600, isIncoming: true, section: 'Yesterday' },
  { id: '6', icon: '🏪', name: 'Oxxo', type: 'Withdrawal', amount: 600, isIncoming: false, section: 'Yesterday' },
  { id: '7', icon: '📶', name: 'AT&T Internet', type: 'Payment · Pending', amount: 600, isIncoming: false, section: 'Yesterday' },
  { id: '8', icon: '☕', name: 'Starbucks', type: 'Purchase', amount: 600, isIncoming: false, section: 'Yesterday' },
  { id: '9', icon: '🐷', name: 'Turbo Money Box', type: 'Deposit', amount: 600, isIncoming: false, section: 'Yesterday' },
  { id: '10', icon: '🐷', name: 'Turbo Money Box', type: 'Withdrawal', amount: 600, isIncoming: true, section: 'Yesterday' },
  { id: '11', icon: '🌎', name: 'USD → BRL', type: 'Currency Exchange', amount: 1000, isIncoming: false, secondaryAmount: '+R$ 999,000', section: 'October 19' },
];

const FILTERS = ['Type', 'Date', 'Category'];

function formatAmount(value, isIncoming) {
  const formatted = `$ ${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  return isIncoming ? `+${formatted}` : `-${formatted}`;
}

function TransactionRow({ item, isLast }) {
  return (
    <View>
      <View style={styles.row}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>{item.icon}</Text>
        </View>
        <View style={styles.rowContent}>
          <Text style={styles.rowName} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.rowType}>{item.type}</Text>
        </View>
        <View style={styles.rowAmountContainer}>
          <Text style={[styles.rowAmount, item.isIncoming && styles.amountGreen]}>
            {formatAmount(item.amount, item.isIncoming)}
          </Text>
          {item.secondaryAmount && (
            <Text style={styles.rowSecondaryAmount}>{item.secondaryAmount}</Text>
          )}
        </View>
      </View>
      {!isLast && (
        <View style={styles.dividerWrapper}>
          <View style={styles.divider} />
        </View>
      )}
    </View>
  );
}

export default function TransactionsScreen({ onBack, onNavigateToDownload, showToast }) {
  const [search, setSearch] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [toastVisible, setToastVisible] = useState(false);
  const toastOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showToast) {
      setToastVisible(true);
      Animated.sequence([
        Animated.timing(toastOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.delay(3000),
        Animated.timing(toastOpacity, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start(() => setToastVisible(false));
    }
  }, [showToast]);

  const filteredTransactions = useMemo(() => {
    if (!search.trim()) return ALL_TRANSACTIONS;
    const q = search.trim().toLowerCase();
    return ALL_TRANSACTIONS.filter(
      (t) => t.name.toLowerCase().includes(q) || t.type.toLowerCase().includes(q)
    );
  }, [search]);

  const sections = useMemo(() => {
    const bySection = {};
    filteredTransactions.forEach((t) => {
      if (!bySection[t.section]) {
        bySection[t.section] = { title: t.section, data: [] };
      }
      bySection[t.section].data.push(t);
    });
    return Object.values(bySection);
  }, [filteredTransactions]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={onBack}>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transactions</Text>
        <TouchableOpacity style={styles.downloadButton} onPress={onNavigateToDownload}>
          <Image
            source={require('../assets/download_icon.png')}
            style={styles.downloadIconImg}
          />
        </TouchableOpacity>
      </View>

      {/* Search bar */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIconText}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="rgba(31, 2, 48, 0.4)"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* Filter chips */}
      <View style={styles.filterRow}>
        {FILTERS.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={styles.filterChip}
            activeOpacity={0.7}
          >
            <Text style={styles.filterText}>{filter}</Text>
            <Text style={styles.filterArrow}>▾</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Transaction list */}
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index, section }) => (
          <TransactionRow item={item} isLast={index === section.data.length - 1} />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Toast */}
      {toastVisible && (
        <Animated.View style={[styles.toast, { opacity: toastOpacity }]}>
          <Text style={styles.toastCheck}>✓</Text>
          <Text style={styles.toastText}>Extrato descarregado com sucesso.</Text>
        </Animated.View>
      )}
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
  closeButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 18,
    color: colors.textPrimary,
  },
  headerTitle: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
  },
  downloadButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadIconImg: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  searchWrapper: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(31, 2, 48, 0.08)',
    borderRadius: 16,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
    shadowColor: '#1F002F',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 0,
    elevation: 1,
  },
  searchIconText: {
    fontSize: 16,
    opacity: 0.5,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSizes.base,
    color: colors.textPrimary,
    padding: 0,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(31, 2, 48, 0.08)',
    borderRadius: 24,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    gap: spacing.xs,
    shadowColor: '#1F002F',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 0,
    elevation: 1,
  },
  filterText: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
  },
  filterArrow: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  sectionHeader: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  listContent: {
    paddingBottom: spacing.section,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    gap: spacing.md,
  },
  avatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 64,
    backgroundColor: colors.gray200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 14,
  },
  rowContent: {
    flex: 1,
    gap: 2,
  },
  rowName: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
    letterSpacing: 0.12,
    lineHeight: 16,
  },
  rowType: {
    fontSize: fontSizes.xs,
    color: 'rgba(31, 2, 48, 0.62)',
    letterSpacing: 0.12,
    lineHeight: 16,
  },
  rowAmountContainer: {
    alignItems: 'flex-end',
    gap: 2,
  },
  rowAmount: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
  },
  amountGreen: {
    color: '#00a86b',
  },
  rowSecondaryAmount: {
    fontSize: fontSizes.xs,
    color: 'rgba(31, 2, 48, 0.62)',
    letterSpacing: 0.12,
  },
  dividerWrapper: {
    paddingHorizontal: spacing.xl,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(31, 2, 48, 0.08)',
  },
  toast: {
    position: 'absolute',
    bottom: 32,
    left: spacing.md,
    right: spacing.md,
    backgroundColor: '#1f0230',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  toastCheck: {
    fontSize: 16,
    color: '#00a86b',
    fontWeight: '700',
  },
  toastText: {
    fontSize: fontSizes.base,
    color: colors.white,
    flex: 1,
    lineHeight: 24,
  },
});
