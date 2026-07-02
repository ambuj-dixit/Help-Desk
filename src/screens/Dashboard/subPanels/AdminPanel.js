/**
 * Admin Dashboard Panel
 * Features specialized stats and manager assignment overview.
 */

import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import styles from '../style';
import { colors } from '../../../theme';

const { height } = Dimensions.get('window');

const AdminPanel = () => {
  const { user } = useSelector((state) => state.auth);

  // Time-based greeting logic
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    if (hour < 21) return 'Good Evening';
    return 'Good Night';
  };

  // Admin Specific Stats
  const stats = [
    { label: 'TOTAL TICKETS', value: '1,284', icon: 'layers', color: '#E0E7FF', iconColor: '#4338CA' },
    { label: 'OPEN TICKETS', value: '42', icon: 'unlock', color: '#DBEAFE', iconColor: '#2563EB' },
    { label: 'CLOSED TICKETS', value: '1,190', icon: 'check-circle', color: '#D1FAE5', iconColor: '#059669' },
    { label: 'PENDING REVIEWS', value: '52', icon: 'clipboard', color: '#FEF3C7', iconColor: '#D97706' },
  ];

  // Static Manager Assignment Data
  const managerAssignments = [
    { id: 1, manager: 'Amit Sharma', product: 'Help-Desk Core', company: 'MKT Softwares', status: 'Active' },
    { id: 2, manager: 'Priya Verma', product: 'CRM Module', company: 'Global Tech', status: 'On Leave' },
    { id: 3, manager: 'Rahul Gupta', product: 'Analytics Engine', company: 'Initech Corp', status: 'Active' },
    { id: 4, manager: 'Sonia Das', product: 'Mobile App', company: 'MKT Softwares', status: 'Active' },
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.content, { paddingBottom: 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Section with Dynamic Greeting */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>{getGreeting()}, {user?.UserName || 'Administrator'}</Text>
          <Text style={styles.subWelcomeText}>Global system overview and manager assignments.</Text>
        </View>

        {/* Admin Stats Grid (4 Cards) */}
        <View style={[styles.statsGrid, { marginTop: 10 }]}>
          {stats.map((stat, index) => (
            <View key={index} style={[styles.statCard, { width: '48%', marginBottom: 12 }]}>
              <View style={[styles.statIconContainer, { backgroundColor: stat.color, width: 36, height: 36, borderRadius: 10 }]}>
                <Icon name={stat.icon} size={18} color={stat.iconColor} />
              </View>
              <Text style={[styles.statLabel, { fontSize: 10, marginTop: 8, fontWeight: '700' }]}>{stat.label}</Text>
              <Text style={[styles.statValue, { fontSize: 22, marginTop: 2 }]}>{stat.value}</Text>
            </View>
          ))}
        </View>

        {/* Manager Assignment Section */}
        <View style={[styles.sectionHeader, { marginTop: 12 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="users" size={20} color={colors.primary} />
            <Text style={[styles.sectionTitle, { marginLeft: 10 }]}>Manager Assignments</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>Manage</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.ticketCard, { padding: 0, overflow: 'hidden' }]}>
          {managerAssignments.map((item, index) => (
            <View
              key={item.id}
              style={{
                padding: 16,
                borderBottomWidth: index === managerAssignments.length - 1 ? 0 : 1,
                borderBottomColor: colors.borderLight
              }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 15, fontWeight: '700', color: colors.textPrimary }}>{item.manager}</Text>
                  <Text style={{ fontSize: 13, color: colors.textSecondary, marginTop: 2 }}>{item.product}</Text>

                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                    <Icon name="briefcase" size={12} color={colors.textMuted} />
                    <Text style={{ fontSize: 12, color: colors.textMuted, marginLeft: 6 }}>{item.company}</Text>
                  </View>
                </View>

                <View style={[
                  styles.statusBadge,
                  { backgroundColor: item.status === 'Active' ? colors.successLight : colors.borderLight }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: item.status === 'Active' ? colors.success : colors.textMuted, fontSize: 10 }
                  ]}>
                    {item.status.toUpperCase()}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* System Summary Action */}
        <TouchableOpacity style={[styles.submitButton, { marginTop: 24, backgroundColor: colors.textPrimary }]}>
          <Icon name="file-text" size={18} color={colors.white} style={{ marginRight: 8 }} />
          <Text style={styles.submitText}>Generate System Report</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default AdminPanel;
