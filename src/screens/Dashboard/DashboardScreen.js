import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styles from './style';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FAB from '../../components/FAB';
import ClientPanel from './subPanels/ClientPanel';
import DeveloperPanel from './subPanels/DeveloperPanel';
import PMPanel from './subPanels/PMPanel';
import ProfileScreen from '../Profile';

const DashboardScreen = ({ role, user, activeTab, onTabPress, onCreateTicket, onLogout }) => {

  const renderContent = () => {
    if (activeTab === 'Profile') {
      return <ProfileScreen user={user} role={role} onLogout={onLogout} />;
    }

    if (role === 'CLIENT') {
      switch (activeTab) {
        case 'Dashboard':
          return <ClientPanel user={user} />;
        case 'Tickets':
          return (
            <View style={styles.center}>
              <Text style={{ color: '#64748B' }}>Ticket History Panel</Text>
            </View>
          );
        case 'Alerts':
          return (
            <View style={styles.center}>
              <Text style={{ color: '#64748B' }}>Notifications Panel</Text>
            </View>
          );
        default:
          return <ClientPanel user={user} />;
      }
    }

    if (role === 'DEVELOPER') {
      switch (activeTab) {
        case 'Dashboard':
          return <DeveloperPanel user={user} />;
        case 'Tickets':
          return (
            <View style={styles.center}>
              <Text style={{ color: '#64748B' }}>My Assignments Panel</Text>
            </View>
          );
        case 'Alerts':
          return (
            <View style={styles.center}>
              <Text style={{ color: '#64748B' }}>Developer Alerts</Text>
            </View>
          );
        default:
          return <DeveloperPanel user={user} />;
      }
    }

    if (role === 'PM') {
      switch (activeTab) {
        case 'Dashboard':
          return <PMPanel user={user} />;
        case 'Tickets':
          return (
            <View style={styles.center}>
              <Text style={{ color: '#64748B' }}>Product Queue Overview</Text>
            </View>
          );
        case 'Alerts':
          return (
            <View style={styles.center}>
              <Text style={{ color: '#64748B' }}>Manager Alerts</Text>
            </View>
          );
        default:
          return <PMPanel user={user} />;
      }
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {/* Dynamic Header */}
      <Header title="Help-Desk" />

      {/* Main Content Area */}
      <View style={{ flex: 1 }}>
        {renderContent()}
      </View>

      {/* Global Floating Action Button - Only visible for CLIENT as per revised requirement */}
      {role === 'CLIENT' && <FAB onPress={onCreateTicket} />}

      {/* Dynamic Footer */}
      <Footer
        activeTab={activeTab}
        onTabPress={onTabPress}
        role={role}
      />
    </View>
  );
};

export default DashboardScreen;
