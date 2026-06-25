import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styles from './style';

const ProfileScreen = ({ user, role, onLogout }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Icon name="user" size={50} color="#2563EB" />
          </View>
          <Text style={styles.nameText}>{user?.name || 'Sarah Jenkins'}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{role || 'Client'}</Text>
          </View>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <Icon name="mail" size={18} color="#64748B" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>EMAIL ADDRESS</Text>
              <Text style={styles.infoValue}>{user?.email || 'sarah@mkt.com'}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <Icon name="briefcase" size={18} color="#64748B" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>COMPANY</Text>
              <Text style={styles.infoValue}>MKT Software Solutions</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <Icon name="phone" size={18} color="#64748B" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>PHONE</Text>
              <Text style={styles.infoValue}>+91 98765 43210</Text>
            </View>
          </View>

          <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
            <View style={styles.infoIconContainer}>
              <Icon name="map-pin" size={18} color="#64748B" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>ADDRESS</Text>
              <Text style={styles.infoValue}>Enterprise Park, Silicon Valley</Text>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} activeOpacity={0.7} onPress={onLogout}>
          <Icon name="log-out" size={22} color="#EF4444" />
          <Text style={styles.logoutText}>Logout Session</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;
