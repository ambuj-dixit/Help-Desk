import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../theme';

const Footer = ({ activeTab, onTabPress }) => {
  const tabs = [
    { id: 'Dashboard', icon: 'grid', label: 'Dashboard' },
    { id: 'Tickets', icon: 'tag', label: 'Tickets' },
    { id: 'Alerts', icon: 'bell', label: 'Alerts' },
    { id: 'Profile', icon: 'user', label: 'Profile' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={styles.tab}
          onPress={() => onTabPress(tab.id)}
        >
          <Icon
            name={tab.icon}
            size={22}
            color={activeTab === tab.id ? colors.primary : colors.textMuted}
          />
          <Text
            style={[
              styles.label,
              { color: activeTab === tab.id ? colors.primary : colors.textMuted },
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingBottom: 10,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
});

export default Footer;
