import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styles from '../style';

const { height } = Dimensions.get('window');

const ClientPanel = ({ user }) => {
  const [ticketPage, setTicketPage] = useState(1);
  const itemsPerPage = 3;

  // Mock Data for Dynamic Rendering
  const stats = [
    { label: 'Open Tickets', value: 12, icon: 'mail', color: '#DBEAFE', iconColor: '#2563EB' },
    { label: 'Pending Review', value: 5, icon: 'file-text', color: '#FFEDD5', iconColor: '#D97706' },
    { label: 'Resolved', value: 28, icon: 'check-circle', color: '#D1FAE5', iconColor: '#059669' },
    { label: 'Closed (30d)', value: 142, icon: 'archive', color: '#F3F4F6', iconColor: '#4B5563' },
  ];

  const allTickets = [
    { id: '#TKT-8902', title: 'API Rate Limit Exceeded', status: 'Open', color: '#DBEAFE', txt: '#2563EB', time: '10m ago' },
    { id: '#TKT-8895', title: 'Billing Address Failure', status: 'Pending', color: '#FFEDD5', txt: '#D97706', time: '2h ago' },
    { id: '#TKT-8880', title: 'SSO Login Config Error', status: 'Resolved', color: '#D1FAE5', txt: '#059669', time: 'Yesterday' },
    { id: '#TKT-8875', title: 'Network Latency Issue', status: 'Open', color: '#DBEAFE', txt: '#2563EB', time: '2 days ago' },
    { id: '#TKT-8870', title: 'UI Rendering Glitch', status: 'Closed', color: '#F3F4F6', txt: '#4B5563', time: '3 days ago' },
  ];

  const totalPages = Math.ceil(allTickets.length / itemsPerPage);
  const currentTickets = allTickets.slice((ticketPage - 1) * itemsPerPage, ticketPage * itemsPerPage);

  return (
    <View style={[styles.container, { paddingBottom: 0 }]}>
      <View style={styles.content}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome back, {user?.name || 'Sarah'}</Text>
          <Text style={styles.subWelcomeText}>Here is your support ecosystem overview.</Text>
        </View>

        {/* Stats Grid - Compact for Single Viewport */}
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

        {/* Recent Tickets Section with Pagination */}
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

        {/* Ticket List - Fixed Height to prevent scrolling */}
        <View style={{ height: height * 0.35 }}>
          {currentTickets.map((ticket, index) => (
            <TouchableOpacity key={index} style={[styles.ticketCard, { padding: 12, marginBottom: 10 }]} activeOpacity={0.7}>
              <View style={[styles.ticketHeader, { marginBottom: 4 }]}>
                <Text style={styles.ticketId}>{ticket.id}</Text>
                <View style={[styles.statusBadge, { backgroundColor: ticket.color }]}>
                  <Text style={[styles.statusText, { color: ticket.txt }]}>{ticket.status}</Text>
                </View>
              </View>
              <Text style={[styles.ticketTitle, { fontSize: 15 }]}>{ticket.title}</Text>
              <View style={styles.ticketFooter}>
                <View style={styles.timeContainer}>
                  <Icon name="clock" size={12} color="#94A3B8" />
                  <Text style={[styles.timeText, { fontSize: 11 }]}>{ticket.time}</Text>
                </View>
                <View style={[styles.avatar, { width: 20, height: 20 }]}>
                  <Icon name="user" size={10} color="#94A3B8" />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default ClientPanel;
