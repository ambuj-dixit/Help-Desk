import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styles from './style';

const ProfileScreen = ({ user, role, onLogout }) => {
  const subscriptions = [
    { id: 1, name: 'ESIM Campus Solution', detail: 'Renewal: Oct 12, 2026', status: 'Active', color: '#D1FAE5', txt: '#059669' },
    { id: 2, name: 'HRMS', detail: 'Renewal: Jan 20, 2026', status: 'Active', color: '#D1FAE5', txt: '#059669' },
    { id: 3, name: 'VMS', detail: 'Expires in 3 days', status: 'Pending', color: '#FFEDD5', txt: '#D97706' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* User Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarContainer}>
              <Icon name="user" size={40} color="#2563EB" />
            </View>
            <View style={styles.editBadge}>
              <Icon name="edit-2" size={12} color="#FFFFFF" />
            </View>
          </View>
          <Text style={styles.nameText}>{user?.name || 'Sarah Jenkins'}</Text>
          <Text style={styles.emailText}>{user?.email || 'sarah.j@sanskriti.edu'}</Text>
        </View>

        {/* Organization Card */}
        <View style={styles.sectionCard}>
          <View style={styles.orgIcon}>
            <Icon name="home" size={20} color="#2563EB" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.orgName}>Sanskriti University</Text>
            <Text style={styles.orgSub}>Primary Organization</Text>
          </View>
          <Icon name="check-circle" size={18} color="#94A3B8" />
        </View>

        {/* Contact Details */}
        <Text style={styles.sectionTitle}>Contact Details</Text>
        <View style={styles.phoneWrapper}>
          <Icon name="phone" size={18} color="#64748B" />
          <Text style={styles.phoneText}>+1 (555) 012-3456</Text>
        </View>

        {/* Organization Address */}
        <View style={[styles.phoneWrapper, { marginTop: -4, borderTopWidth: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0 }]}>
          <Icon name="map-pin" size={18} color="#64748B" />
          <Text style={styles.phoneText} numberOfLines={1}>Enterprise Park, Silicon Valley, CA</Text>
        </View>

        {/* Active Subscriptions */}
        <View style={styles.subHeader}>
          <Text style={styles.sectionTitle}>Active Subscriptions</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexShrink: 1 }}>
          {subscriptions.map((item) => (
            <View key={item.id} style={styles.subCard}>
              <View>
                <Text style={styles.subTitle}>{item.name}</Text>
                <Text style={styles.subDetail}>{item.detail}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: item.color }]}>
                <Text style={[styles.statusText, { color: item.txt }]}>{item.status}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} activeOpacity={0.7} onPress={onLogout}>
          <Icon name="log-out" size={18} color="#EF4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Version 2.0.1 (Build 890)</Text>
      </View>
    </View>
  );
};

export default ProfileScreen;
