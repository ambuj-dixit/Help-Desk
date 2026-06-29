import React, { useState, useEffect } from 'react';
import { BackHandler } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from './src/screens/Splash';
import LoginForm from './src/screens/Login';
import Dashboard from './src/screens/Dashboard';
import CreateTicket from './src/screens/CreateTicket';
import ConfirmModal from './src/components/ConfirmModal';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('Splash');
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [tabHistory, setTabHistory] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    const backAction = () => {
      if (currentScreen === 'CreateTicket') {
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

  const handleLoginSuccess = (role) => {
    setUserRole(role);
    if (role === 'DEVELOPER') {
      setUser({ email: 'dev@mail.com', name: 'Alex' });
    } else if (role === 'PM') {
      setUser({ email: 'pm@mail.com', name: 'James' });
    } else {
      setUser({ email: 'client@mail.com', name: 'Sarah' });
    }
    setCurrentScreen('Dashboard');
    setActiveTab('Dashboard');
    setTabHistory([]);
  };

  const handleTabPress = (tabId) => {
    if (tabId !== activeTab) {
      setTabHistory([...tabHistory, activeTab]);
      setActiveTab(tabId);
    }
  };

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    setCurrentScreen('Login');
    setUserRole(null);
    setUser(null);
    setTabHistory([]);
  };

  return (
    <SafeAreaProvider>
      <ConfirmModal
        visible={showLogoutConfirm}
        title="Logout"
        message="Are you sure you want to log out of your session?"
        confirmText="Logout"
        cancelText="Stay"
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />

      {currentScreen === 'Splash' && (
        <SplashScreen onGetStarted={() => setCurrentScreen('Login')} />
      )}
      {currentScreen === 'Login' && (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      )}
      {currentScreen === 'Dashboard' && (
        <Dashboard
          role={userRole}
          user={user}
          activeTab={activeTab}
          onTabPress={handleTabPress}
          onCreateTicket={() => setCurrentScreen('CreateTicket')}
          onLogout={() => setShowLogoutConfirm(true)}
        />
      )}
      {currentScreen === 'CreateTicket' && (
        <CreateTicket onBack={() => setCurrentScreen('Dashboard')} />
      )}
    </SafeAreaProvider>
  );
};

export default App;
