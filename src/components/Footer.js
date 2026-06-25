import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

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
            color={activeTab === tab.id ? '#2563EB' : '#94A3B8'}
          />
          <Text
            style={[
              styles.label,
              { color: activeTab === tab.id ? '#2563EB' : '#94A3B8' },
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
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
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
