/**
 * Shared Header Component
 * Provides a consistent top bar with title, back button, and logo.
 */

import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../theme';

const Header = ({ title, showBack, onBack }) => {
  // Hook to handle status bar spacing for notch/island devices
  const insets = useSafeAreaInsets();

  return (
    <View style={[
      styles.container,
      { paddingTop: insets.top + (Platform.OS === 'android' ? 10 : 0) }
    ]}>
      <View style={styles.content}>
        {/* Left Section: Contextual Action (Back or Branding) */}
        <View style={styles.leftSection}>
          {showBack ? (
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <Icon name="arrow-left" size={24} color={colors.white} />
            </TouchableOpacity>
          ) : (
            // Logo Badge: Circular branding container
            <View style={styles.logoBadge}>
              <Image
                source={require('../assets/mkt_logo.png')}
                style={styles.headerLogo}
              />
            </View>
          )}
        </View>

        {/* Center Section: View Title */}
        <View style={styles.centerSection}>
          <Text style={styles.title}>{title}</Text>
        </View>

        {/* Right Section: Activity Indicator */}
        <View style={styles.rightSection}>
           <View style={styles.statusDot} />
           <Text style={styles.liveText}>Live</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3B82F6', // Brighter shade of brand blue
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  content: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 3,
    alignItems: 'center',
  },
  rightSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  logoBadge: {
    width: 44,
    height: 44,
    backgroundColor: colors.white,
    borderRadius: 22, // Half of width/height for a perfect circle
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    marginTop: -4,
    overflow: 'hidden',
  },
  headerLogo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
    marginRight: 6,
  },
  liveText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.white,
    textTransform: 'uppercase',
  },
});

export default Header;
