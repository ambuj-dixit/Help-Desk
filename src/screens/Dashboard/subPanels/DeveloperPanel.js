import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import styles from '../style';

const { height } = Dimensions.get('window');

const DeveloperPanel = () => {
  const { user } = useSelector((state) => state.auth);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    if (hour < 21) return 'Good Evening';
    return 'Good Night';
  };

  const stats = [
    { label: 'My Tasks', value: 24, icon: 'list', color: '#F1F5F9', iconColor: '#64748B' },
    { label: 'In Progress', value: 3, icon: 'loader', color: '#FEF3C7', iconColor: '#D97706' },
    { label: 'Completed Today', value: 5, icon: 'check-circle', color: '#DCFCE7', iconColor: '#10B981' },
  ];

  const upcomingTasks = [
    { id: 'DEV-501', title: 'Implement new auth flow', priority: 'Medium', pColor: '#F59E0B' },
    { id: 'DEV-502', title: 'Update dependency packages', priority: 'Low', pColor: '#10B981' },
    { id: 'DEV-503', title: 'Refactor metrics component', priority: 'Medium', pColor: '#F59E0B' },
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.content, { paddingBottom: 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>{getGreeting()}, {user?.UserName || 'Developer'}</Text>
          <Text style={styles.subWelcomeText}>Here is your work overview for today.</Text>
        </View>

        {/* Stats Section */}
        <View style={[styles.statsGrid, { marginBottom: 24 }]}>
          {stats.map((stat, index) => (
            <View key={index} style={[styles.statCard, { width: stat.label === 'Completed Today' ? '100%' : '48%', marginBottom: 12 }]}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                   <Text style={styles.statLabel}>{stat.label}</Text>
                   <Text style={[styles.statValue, { marginTop: 4 }]}>{stat.value}</Text>
                </View>
                <View style={[styles.statIconContainer, { backgroundColor: stat.color, marginBottom: 0 }]}>
                  <Icon name={stat.icon} size={18} color={stat.iconColor} />
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Active Work Section */}
        <Text style={[styles.sectionTitle, { marginBottom: 12 }]}>Active Work</Text>
        <View style={[styles.ticketCard, { borderColor: '#3B82F6', borderWidth: 1.5, padding: 20 }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
            <View style={{ flexDirection: 'row' }}>
               <View style={[styles.statusBadge, { backgroundColor: '#FEF3C7', marginRight: 8 }]}>
                 <Text style={[styles.statusText, { color: '#D97706', fontSize: 10 }]}>IN PROGRESS</Text>
               </View>
               <View style={[styles.statusBadge, { backgroundColor: '#F1F5F9' }]}>
                 <Text style={[styles.statusText, { color: '#64748B', fontSize: 10 }]}>Bug</Text>
               </View>
            </View>
            <Text style={styles.ticketId}>DEV-492</Text>
          </View>

          <Text style={[styles.ticketTitle, { fontSize: 18, marginBottom: 8 }]}>Fix memory leak in data processing pipeline</Text>
          <Text style={[styles.ticketDesc, { marginBottom: 16 }]} numberOfLines={2}>
            The background worker is consuming excessive RAM during batch processing...
          </Text>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 }}>
            <View style={{ width: '50%', marginBottom: 12 }}>
               <Text style={styles.infoLabel}>Priority</Text>
               <Text style={{ fontSize: 14, fontWeight: '700', color: '#EF4444' }}>! High</Text>
            </View>
            <View style={{ width: '50%', marginBottom: 12 }}>
               <Text style={styles.infoLabel}>Time Logged</Text>
               <Text style={{ fontSize: 14, fontWeight: '600', color: '#1E293B' }}>2h 45m</Text>
            </View>
            <View style={{ width: '50%' }}>
               <Text style={styles.infoLabel}>Reporter</Text>
               <Text style={{ fontSize: 14, fontWeight: '600', color: '#1E293B' }}>S. Jenkins</Text>
            </View>
            <View style={{ width: '50%' }}>
               <Text style={styles.infoLabel}>Branch</Text>
               <Text style={{ fontSize: 14, fontWeight: '600', color: '#2563EB' }}>fix/mem-leak</Text>
            </View>
          </View>

          <TouchableOpacity style={[styles.submitButton, { backgroundColor: '#10B981', height: 48, borderRadius: 12, marginBottom: 12 }]}>
             <Icon name="check-circle" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
             <Text style={styles.submitText}>Mark Resolved</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
             <Icon name="pause" size={16} color="#64748B" />
             <Text style={{ marginLeft: 8, color: '#64748B', fontWeight: '600' }}>Pause Work</Text>
          </TouchableOpacity>
        </View>

        {/* Upcoming Section */}
        <View style={[styles.sectionHeader, { marginTop: 24 }]}>
          <Text style={styles.sectionTitle}>Upcoming</Text>
          <TouchableOpacity><Text style={styles.viewAllText}>View All</Text></TouchableOpacity>
        </View>

        {upcomingTasks.map((task, index) => (
          <View key={index} style={[styles.ticketCard, { padding: 12, marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
            <View style={{ flex: 1 }}>
               <View style={[styles.statusBadge, { backgroundColor: '#E0E7FF', width: 45, marginBottom: 4 }]}>
                 <Text style={{ color: '#4338CA', fontSize: 9, fontWeight: '800' }}>TO DO</Text>
               </View>
               <Text style={{ fontWeight: '600', color: '#1E293B' }}>{task.title}</Text>
               <Text style={{ color: task.pColor, fontSize: 11, fontWeight: '700', marginTop: 4 }}>↑ {task.priority}</Text>
            </View>
            <Text style={styles.ticketId}>{task.id}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default DeveloperPanel;
