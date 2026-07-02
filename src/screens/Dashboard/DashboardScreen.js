/**
 * Dashboard Screen
 * Orchestrates rendering of specific panels based on the user's role from the API.
 */

import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import styles from './style';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FAB from '../../components/FAB';
import ClientPanel from './subPanels/ClientPanel';
import DeveloperPanel from './subPanels/DeveloperPanel';
import PMPanel from './subPanels/PMPanel';
import AdminPanel from './subPanels/AdminPanel';
import ProfileScreen from '../Profile';

const DashboardScreen = ({ activeTab, onTabPress, onCreateTicket, onLogout }) => {
  // Get real role and user data from Redux
  const { role, user } = useSelector((state) => state.auth);

  const renderContent = () => {
    // 1. Profile Tab
    if (activeTab === 'Profile') {
      return <ProfileScreen user={user} role={role} onLogout={onLogout} />;
    }

    // 2. Main Dashboard Tab - Rendering based on API Role
    if (activeTab === 'Dashboard') {
      // Logic for rendering panels based on verified API role
      if (role === 'CLIENT') return <ClientPanel />;
      if (role === 'DEVELOPER') return <DeveloperPanel />;
      if (role === 'ADMIN') return <AdminPanel />;
      if (role === 'PM') return <PMPanel />;

      // Fallback for any other roles
      return <AdminPanel />;
    }

    // 3. Placeholder for other tabs (Tickets, Alerts)
    return (
      <View style={styles.center}>
        <Text style={{ color: '#64748B' }}>{activeTab} Content Loading...</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Dynamic Header */}
      <Header title="Help-Desk" />

      {/* Main Content Area */}
      <View style={{ flex: 1 }}>
        {renderContent()}
      </View>

      {/* Floating Action Button for Clients */}
      {role === 'CLIENT' && <FAB onPress={onCreateTicket} />}

      {/* Navigation Footer */}
      <Footer
        activeTab={activeTab}
        onTabPress={onTabPress}
        role={role}
      />
    </View>
  );
};

export default DashboardScreen;
