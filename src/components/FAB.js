import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors, shadows } from '../theme';

const FAB = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.fab}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Icon name="plus" size={30} color={colors.white} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 85,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.heavy,
    shadowColor: colors.primary,
    shadowOpacity: 0.4,
    zIndex: 999,
  },
});

export default FAB;
