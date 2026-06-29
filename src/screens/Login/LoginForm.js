import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import styles from './style';
import ErrorModal from '../../components/ErrorModal';

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorConfig, setErrorConfig] = useState({ title: '', message: '' });

  const handleSignIn = () => {
    if (!email.trim() || !password.trim()) {
      showError('Empty Fields', 'Please enter both your email address and password to continue.');
      return;
    }

    if (email === 'client@mail.com' && password === 'client123') {
      onLoginSuccess('CLIENT');
    } else if (email === 'dev@mail.com' && password === 'dev123') {
      onLoginSuccess('DEVELOPER');
    } else if (email === 'pm@mail.com' && password === 'pm123') {
      onLoginSuccess('PM');
    } else {
      showError('Invalid Credentials', 'The email or password you entered is incorrect. Please try again with the correct credentials.');
    }
  };

  const showError = (title, message) => {
    setErrorConfig({ title, message });
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      <ErrorModal
        visible={modalVisible}
        title={errorConfig.title}
        message={errorConfig.message}
        onClose={() => setModalVisible(false)}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Section */}
          <View style={styles.headerSection}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/Icon.png')}
                style={styles.logo}
              />
            </View>
            <Text style={styles.title}>Help-Desk</Text>
            <Text style={styles.subtitle}>Enterprise Support Management</Text>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.inputWrapper}>
                <Icon name="mail" size={18} color="#94A3B8" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#94A3B8"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputWrapper}>
                <Icon name="lock" size={18} color="#94A3B8" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                >
                  <Icon
                    name={showPassword ? "eye" : "eye-off"}
                    size={18}
                    color="#94A3B8"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={styles.signInButton}
              activeOpacity={0.8}
              onPress={handleSignIn}
            >
              <Text style={styles.signInButtonText}>Sign In</Text>
              <Icon name="arrow-right" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginForm;
