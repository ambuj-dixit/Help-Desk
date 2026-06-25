import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styles from './style';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FAB from '../../components/FAB';
import ClientPanel from './subPanels/ClientPanel';
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

      {/* Global Floating Action Button - Visible on all Dashboard tabs */}
      <FAB onPress={onCreateTicket} />

      {/* Dynamic Footer */}
      <Footer
        activeTab={activeTab}
        onTabPress={onTabPress}
      />
    </View>
  );
};

export default DashboardScreen;
