import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from './src/screens/Splash';

const App = () => {
  return (
    <SafeAreaProvider>
      <SplashScreen />
    </SafeAreaProvider>
  );
};

export default App;
