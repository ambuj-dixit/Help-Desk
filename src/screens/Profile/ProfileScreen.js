/**
 * Profile Screen - Optimized UI
 * Screen-filling layout with zero-scroll design and real data integration.
 */

import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import styles from './style';
import { colors } from '../../theme';

const ProfileScreen = ({ onLogout }) => {
  // Get real user data from Redux (Backend Response)
  const { user } = useSelector((state) => state.auth);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.mainWrapper}>
        {/* Top: Branding & User Header */}
        <View style={styles.topSection}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarWrapper}>
              <View style={styles.avatarContainer}>
                <Icon name="user" size={42} color={colors.primary} />
              </View>
              <TouchableOpacity style={styles.editBadge} activeOpacity={0.8}>
                <Icon name="camera" size={12} color={colors.white} />
              </TouchableOpacity>
            </View>
            <Text style={styles.nameText}>{user?.UserName || 'User'}</Text>
            <Text style={styles.emailText}>{user?.Email || 'No Email Provided'}</Text>
          </View>
        </View>

        {/* Middle: Information Cards */}
        <View style={styles.middleSection}>
          <View style={styles.infoGroup}>
            <Text style={styles.sectionLabel}>WORKPLACE</Text>
            <View style={styles.sectionCard}>
              <View style={styles.iconBox}>
                <Icon name="briefcase" size={20} color={colors.primary} />
              </View>
              <View>
                <Text style={styles.cardMainText}>{user?.CompanyName || 'MKT Softwares'}</Text>
                <Text style={styles.cardSubText}>ID: {user?.CompanyID || '0'}</Text>
              </View>
            </View>
          </View>

          <View style={styles.infoGroup}>
            <Text style={styles.sectionLabel}>CONTACT DETAILS</Text>
            <View style={styles.phoneWrapper}>
              <Icon name="phone" size={18} color={colors.primary} />
              <Text style={styles.phoneText}>{user?.ContactNo || 'N/A'}</Text>
            </View>
          </View>

          <View style={styles.infoGroup}>
            <Text style={styles.sectionLabel}>ACCOUNT PERMISSIONS</Text>
            <View style={styles.rowCard}>
               <View>
                 <Text style={styles.rowMainText}>Access Role</Text>
                 <Text style={styles.rowSubText}>System Permission Level</Text>
               </View>
               <View style={[styles.statusBadge, { backgroundColor: colors.primaryLight }]}>
                 <Text style={[styles.statusText, { color: colors.primary }]}>{(user?.Role || 'User').toUpperCase()}</Text>
               </View>
            </View>
          </View>
        </View>

        {/* Bottom: Actions & Version */}
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.logoutBtn}
            activeOpacity={0.8}
            onPress={onLogout}
          >
            <Icon name="log-out" size={18} color={colors.error} />
            <Text style={styles.logoutBtnText}>End Session</Text>
          </TouchableOpacity>
          <Text style={styles.versionText}>Help-Desk v1.0.2 • Build 2024.1</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
