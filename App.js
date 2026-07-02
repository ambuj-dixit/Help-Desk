/**
 * Main App Entry Point
 * Manages core navigation, global Redux provider, and session initialization.
 */

import React, { useState, useEffect } from 'react';
import { BackHandler } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './src/store';
import { loadUserSession, logout } from './src/store/slices/authSlice';

// Screen Imports
import SplashScreen from './src/screens/Splash';
import LoginForm from './src/screens/Login';
import Dashboard from './src/screens/Dashboard';
import CreateTicket from './src/screens/CreateTicket';
import TicketDetail from './src/screens/TicketDetail';

// Component Imports
import ConfirmModal from './src/components/ConfirmModal';

const AppContent = () => {
  const dispatch = useDispatch();
  // Select authentication state from Redux
  const { isAuthenticated, role, user } = useSelector((state) => state.auth);

  // Local navigation state
  const [currentScreen, setCurrentScreen] = useState('Splash');
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [tabHistory, setTabHistory] = useState([]);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Handle automatic screen transitions based on authentication state
  useEffect(() => {
    if (isAuthenticated) {
      // If logged in, always ensure we are on Dashboard
      if (currentScreen === 'Login' || currentScreen === 'Splash') {
        setCurrentScreen('Dashboard');
        setActiveTab('Dashboard');
      }
    } else {
      // If not logged in and on a protected screen, go to Login
      if (currentScreen === 'Dashboard' || currentScreen === 'CreateTicket' || currentScreen === 'TicketDetail') {
        setCurrentScreen('Login');
      }
    }
  }, [isAuthenticated, currentScreen]);

  // Physical Back Button Logic
  useEffect(() => {
    const backAction = () => {
      if (currentScreen === 'CreateTicket' || currentScreen === 'TicketDetail') {
        setCurrentScreen('Dashboard');
        return true;
      }

      if (currentScreen === 'Dashboard') {
        if (tabHistory.length > 0) {
          const prevTab = tabHistory[tabHistory.length - 1];
          const newHistory = tabHistory.slice(0, -1);
          setTabHistory(newHistory);
          setActiveTab(prevTab);
          return true;
        } else if (activeTab !== 'Dashboard') {
          setActiveTab('Dashboard');
          return true;
        } else {
          // If at the root of the Dashboard, ask for logout
          setShowLogoutConfirm(true);
          return true;
        }
      }

      if (currentScreen === 'Login') {
        setCurrentScreen('Splash');
        return true;
      }

      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [currentScreen, activeTab, tabHistory]);

  /**
   * Updates the active tab in the Dashboard and maintains history for back button support.
   */
  const handleTabPress = (tabId) => {
    if (tabId !== activeTab) {
      setTabHistory([...tabHistory, activeTab]);
      setActiveTab(tabId);
    }
  };

  /**
   * Finalizes the logout process by clearing Redux state and resetting navigation.
   */
  const handleLogout = () => {
    setShowLogoutConfirm(false);
    dispatch(logout());
    setCurrentScreen('Login');
    setTabHistory([]);
  };

  return (
    <>
      {/* Global Logout Confirmation Modal */}
      <ConfirmModal
        visible={showLogoutConfirm}
        title="Logout"
        message="Are you sure you want to log out of your session?"
        confirmText="Logout"
        cancelText="Stay"
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />

      {/* Conditional Screen Rendering */}
      {currentScreen === 'Splash' && (
        <SplashScreen onGetStarted={() => setCurrentScreen('Login')} />
      )}
      {currentScreen === 'Login' && (
        <LoginForm onLoginSuccess={() => setCurrentScreen('Dashboard')} />
      )}
      {currentScreen === 'Dashboard' && (
        <Dashboard
          role={role}
          user={user}
          activeTab={activeTab}
          onTabPress={handleTabPress}
          onCreateTicket={() => setCurrentScreen('CreateTicket')}
          onLogout={() => setShowLogoutConfirm(true)}
          onTicketPress={() => setCurrentScreen('TicketDetail')}
        />
      )}
      {currentScreen === 'CreateTicket' && (
        <CreateTicket onBack={() => setCurrentScreen('Dashboard')} />
      )}
      {currentScreen === 'TicketDetail' && (
        <TicketDetail onBack={() => setCurrentScreen('Dashboard')} />
      )}
    </>
  );
};

const App = () => {
  return (
    // Wrap entire application with Redux Provider
    <Provider store={store}>
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
