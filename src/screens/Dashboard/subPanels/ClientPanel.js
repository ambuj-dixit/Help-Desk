/**
 * Client Dashboard Panel
 * Displaying real user greeting from API.
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import styles from '../style';

const { height } = Dimensions.get('window');

const ClientPanel = () => {
  const { user } = useSelector((state) => state.auth);
  const [ticketPage, setTicketPage] = useState(1);
  const itemsPerPage = 3;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    if (hour < 21) return 'Good Evening';
    return 'Good Night';
  };

  // Static stats kept for UI structure until Ticketing API is added
  const stats = [
    { label: 'Open Tickets', value: 0, icon: 'mail', color: '#DBEAFE', iconColor: '#2563EB' },
    { label: 'Pending Review', value: 0, icon: 'file-text', color: '#FFEDD5', iconColor: '#D97706' },
    { label: 'Resolved', value: 0, icon: 'check-circle', color: '#D1FAE5', iconColor: '#059669' },
    { label: 'Closed (30d)', value: 0, icon: 'archive', color: '#F3F4F6', iconColor: '#4B5563' },
  ];

  // Empty array placeholder for real tickets
  const allTickets = [];

  const totalPages = Math.max(1, Math.ceil(allTickets.length / itemsPerPage));
  const currentTickets = allTickets.slice((ticketPage - 1) * itemsPerPage, ticketPage * itemsPerPage);

  return (
    <View style={[styles.container, { paddingBottom: 0 }]}>
      <View style={styles.content}>
        {/* Real Dynamic Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>{getGreeting()}, {user?.UserName || 'User'}</Text>
          <Text style={styles.subWelcomeText}>System access granted for {user?.CompanyName || 'MKT'}.</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={[styles.statCard, { marginBottom: 12 }]}>
              <View style={[styles.statIconContainer, { backgroundColor: stat.color, marginBottom: 8 }]}>
                <Icon name={stat.icon} size={18} color={stat.iconColor} />
              </View>
              <Text style={[styles.statValue, { fontSize: 20 }]}>{stat.value}</Text>
              <Text style={stat.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Recent Tickets Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Tickets</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => setTicketPage(p => Math.max(1, p - 1))}
              disabled={ticketPage === 1}
            >
              <Icon name="chevron-left" size={24} color={ticketPage === 1 ? "#CBD5E1" : "#2563EB"} />
            </TouchableOpacity>
            <Text style={{ marginHorizontal: 8, fontWeight: '600', color: '#64748B' }}>
              {ticketPage} of {totalPages}
            </Text>
            <TouchableOpacity
              onPress={() => setTicketPage(p => Math.min(totalPages, p + 1))}
              disabled={ticketPage === totalPages}
            >
              <Icon name="chevron-right" size={24} color={ticketPage === totalPages ? "#CBD5E1" : "#2563EB"} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: height * 0.35, justifyContent: 'center', alignItems: 'center' }}>
          {allTickets.length === 0 ? (
            <Text style={{ color: '#94A3B8' }}>No active tickets found for your account.</Text>
          ) : (
            currentTickets.map((ticket, index) => (
              <View key={index} /> // Logic for real tickets here later
            ))
          )}
        </View>
      </View>
    </View>
  );
};

export default ClientPanel;
