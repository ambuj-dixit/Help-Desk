/**
 * Login Screen
 * Updated to support Username (Uppercase) and Password as per backend spec.
 */

import React, { useState, useEffect } from 'react';
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
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import styles from './style';
import ErrorModal from '../../components/ErrorModal';
import { loginUser, clearError } from '../../store/slices/authSlice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  // Local state for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorConfig, setErrorConfig] = useState({ title: '', message: '' });

  useEffect(() => {
    if (error) {
      showError('Login Error', error);
      dispatch(clearError());
    }
  }, [error]);

  /**
   * Dispatches login with username forced to uppercase
   */
  const handleSignIn = () => {
    if (!username.trim() || !password.trim()) {
      showError('Empty Fields', 'Please enter both your username and password to continue.');
      return;
    }

    // Note: The conversion to UpperCase is also handled in the Redux Thunk for safety
    dispatch(loginUser({ username, password }));
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

          <View style={styles.formContainer}>
            {/* Username Input - Forced Uppercase */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username</Text>
              <View style={styles.inputWrapper}>
                <Icon name="user" size={18} color="#94A3B8" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your username"
                  placeholderTextColor="#94A3B8"
                  value={username}
                  onChangeText={(val) => setUsername(val.toUpperCase())} // UI conversion to Uppercase
                  autoCapitalize="characters" // Keyboard suggestion for Uppercase
                />
              </View>
            </View>

            {/* Password Input */}
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
              style={[styles.signInButton, loading && { opacity: 0.7 }]}
              activeOpacity={0.8}
              onPress={handleSignIn}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <>
                  <Text style={styles.signInButtonText}>Sign In</Text>
                  <Icon name="arrow-right" size={18} color="#FFFFFF" />
                </>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginForm;
