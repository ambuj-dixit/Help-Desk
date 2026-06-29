import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styles from '../style';

const { height } = Dimensions.get('window');

const PMPanel = ({ user }) => {
  const stats = [
    { label: 'ASSIGNED CLIENTS', value: 24, icon: 'briefcase', color: '#F1F5F9', iconColor: '#2563EB' },
    { label: 'OPEN TICKETS', value: 52, icon: 'tag', color: '#F1F5F9', iconColor: '#2563EB' },
    { label: 'PENDING REVIEWS', value: 14, icon: 'clipboard', color: '#F1F5F9', iconColor: '#2563EB' },
    { label: 'OVERDUE SLA', value: 3, icon: 'clock', color: '#FEF2F2', iconColor: '#EF4444', borderColor: '#EF4444' },
  ];

  const triageTickets = [
    { id: '#4092', title: 'Database connection failure on...', meta: 'Acme Corp • 15m ago', status: 'Escalated', color: '#FEE2E2', txt: '#EF4444' },
    { id: '#4090', title: 'Payment gateway timeout errors', meta: 'Globex Inc • 1h ago', status: 'Escalated', color: '#FEE2E2', txt: '#EF4444' },
    { id: '#4085', title: 'API rate limit exceeded for sync job', meta: 'Initech • 2h ago', status: 'Investigating', color: '#E0E7FF', txt: '#4338CA' },
  ];

  const team = [
    { name: 'Sarah Jenkins', role: 'L1 support', status: 'Online', val: '3 tik', color: '#10B981' },
    { name: 'Marcus Wei', role: 'L2 support', status: 'Offline', val: 'Offline', color: '#94A3B8' },
    { name: 'Jordan Lee', role: 'Sysadmin', status: 'Busy', val: 'Busy', color: '#F59E0B' },
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.content, { paddingBottom: 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Overview Section */}
        <Text style={styles.welcomeText}>Overview</Text>
        <Text style={styles.subWelcomeText}>Real-time pulse on your active queues.</Text>

        <TouchableOpacity style={[styles.statCard, { width: '100%', padding: 10, flexDirection: 'row', justifyContent: 'center', marginTop: 16, marginBottom: 20 }]}>
          <Icon name="filter" size={16} color="#2563EB" />
          <Text style={{ marginLeft: 8, fontWeight: '700', color: '#2563EB', fontSize: 13 }}>Filter</Text>
        </TouchableOpacity>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={[styles.statCard, { width: '48%', marginBottom: 12, borderLeftWidth: stat.borderColor ? 3 : 1, borderLeftColor: stat.borderColor || '#E5E7EB' }]}>
              <View style={[styles.statIconContainer, { backgroundColor: stat.color, width: 32, height: 32, borderRadius: 8 }]}>
                <Icon name={stat.icon} size={16} color={stat.iconColor} />
              </View>
              <Text style={[styles.statLabel, { fontSize: 10, marginTop: 8 }]}>{stat.label}</Text>
              <Text style={[styles.statValue, { fontSize: 24, marginTop: 2 }]}>{stat.value}</Text>
            </View>
          ))}
        </View>

        {/* Urgent Triage Section */}
        <View style={[styles.sectionHeader, { marginTop: 12 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="alert-circle" size={18} color="#EF4444" />
            <Text style={[styles.sectionTitle, { marginLeft: 8 }]}>Urgent Triage</Text>
          </View>
          <TouchableOpacity><Text style={styles.viewAllText}>VIEW ALL</Text></TouchableOpacity>
        </View>

        <View style={[styles.ticketCard, { padding: 0, overflow: 'hidden' }]}>
          {triageTickets.map((ticket, index) => (
            <View key={index} style={{ padding: 12, borderBottomWidth: index === 2 ? 0 : 1, borderBottomColor: '#F1F5F9' }}>
              <Text style={styles.ticketId}>{ticket.id}</Text>
              <Text style={[styles.ticketTitle, { fontSize: 14, marginTop: 4 }]}>{ticket.title}</Text>
              <Text style={[styles.subWelcomeText, { fontSize: 12 }]}>{ticket.meta}</Text>
              <View style={[styles.statusBadge, { backgroundColor: ticket.color, alignSelf: 'flex-start', marginTop: 8 }]}>
                <Text style={[styles.statusText, { color: ticket.txt, fontSize: 10 }]}>{ticket.status}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Team Status Section */}
        <View style={[styles.sectionHeader, { marginTop: 24 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="users" size={18} color="#2563EB" />
            <Text style={[styles.sectionTitle, { marginLeft: 8 }]}>Team Status</Text>
          </View>
        </View>

        <View style={[styles.ticketCard, { padding: 12 }]}>
          {team.map((member, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: index === 2 ? 0 : 16 }}>
              <View style={styles.avatar}>
                <Icon name="user" size={16} color="#94A3B8" />
                <View style={{ position: 'absolute', bottom: 0, right: 0, width: 8, height: 8, borderRadius: 4, backgroundColor: member.color, borderWidth: 1, borderColor: '#FFFFFF' }} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={{ fontSize: 14, fontWeight: '700', color: '#1E293B' }}>{member.name}</Text>
                <Text style={{ fontSize: 11, color: '#64748B' }}>{member.role}</Text>
              </View>
              <Text style={{ fontSize: 12, color: member.status === 'Online' ? '#64748B' : '#94A3B8', fontWeight: '600' }}>{member.val}</Text>
            </View>
          ))}

          <TouchableOpacity style={[styles.submitButton, { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', marginTop: 20, height: 44 }]}>
            <Text style={[styles.submitText, { color: '#2563EB', fontSize: 14 }]}>Manage Schedule</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
};

export default PMPanel;
