import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors, spacing, borderRadius } from '../../tokens';

const NUBANK_LOGO = require('../../../assets/nubank_logo.png');
const BOA_LOGO = 'https://www.figma.com/api/mcp/asset/e726364b-cb0a-44b7-9bc8-b7237a068cfa';

const DEFAULT_ACCOUNTS = [
  { id: 'nubank', localImage: NUBANK_LOGO, fallback: 'nu', bgColor: colors.nubankPurple },
  { id: 'boa', image: BOA_LOGO, fallback: '🏦', bgColor: '#cc2229' },
];

export default function ConnectedAccountsSelector({
  accounts = DEFAULT_ACCOUNTS,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={styles.pill}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.avatarGroup}>
        {accounts.map((account, index) => (
          <View
            key={account.id}
            style={[
              styles.avatarWrapper,
              index > 0 && { marginLeft: -8, zIndex: accounts.length - index },
            ]}
          >
            {account.localImage ? (
              <Image source={account.localImage} style={styles.avatarImage} />
            ) : account.image ? (
              <Image source={{ uri: account.image }} style={styles.avatarImage} />
            ) : (
              <View style={[styles.avatarFallback, { backgroundColor: account.bgColor }]}>
                <Text style={styles.avatarFallbackText}>{account.fallback}</Text>
              </View>
            )}
            <View style={styles.avatarOverlay} />
          </View>
        ))}
      </View>
      <Text style={styles.chevron}>▾</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(31, 2, 48, 0.08)',
    borderRadius: 30,
    paddingLeft: 4,
    paddingRight: 10,
    paddingTop: 4,
    paddingBottom: 5,
    gap: 4,
    shadowColor: '#1F002F',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 0,
    elevation: 1,
  },
  avatarGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
  },
  avatarWrapper: {
    width: 32,
    height: 32,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: colors.white,
    overflow: 'hidden',
    zIndex: 2,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 64,
  },
  avatarFallback: {
    width: '100%',
    height: '100%',
    borderRadius: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarFallbackText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  avatarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(31, 2, 48, 0.04)',
    borderRadius: 64,
  },
  chevron: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
