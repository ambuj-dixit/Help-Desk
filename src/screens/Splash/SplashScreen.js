import React from 'react';
import { View, Image, Text, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import styles from './style';

const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      <View style={styles.centerContent}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/mkt_logo.png')}
            style={styles.logo}
          />
        </View>
        <Text style={styles.title}>Help-Desk</Text>
        <Text style={styles.subtitle}>SOFTWARE SOLUTIONS</Text>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Connected</Text>
        </View>

        <TouchableOpacity style={styles.button} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Get Started</Text>
          <Text style={[styles.buttonText, { fontSize: 22 }]}>→</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>Secure enterprise workspace</Text>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
