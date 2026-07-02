import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Header from '../../components/Header';
import ErrorModal from '../../components/ErrorModal';
import styles from './style';
import { createTicket } from '../../store/slices/ticketSlice';
import { colors } from '../../theme';

const CreateTicketScreen = ({ onBack }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.tickets);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Med');
  const [attachment, setAttachment] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorConfig, setErrorConfig] = useState({ title: '', message: '' });

  const showError = (title, message) => {
    setErrorConfig({ title, message });
    setErrorVisible(true);
  };

  const handleFilePicker = (type) => {
    const options = {
      mediaType: 'photo',
      maxWidth: 200, // Minimal size to try and fit in GET URL
      maxHeight: 200,
      quality: 0.1, // Maximum compression
      includeBase64: true,
    };

    const callback = (response) => {
      setShowPicker(false);
      if (response.didCancel) return;
      if (response.errorCode) {
        showError('Picker Error', response.errorMessage);
        return;
      }

      const file = response.assets[0];
      setAttachment(file);
    };

    if (type === 'camera') {
      launchCamera(options, callback);
    } else {
      launchImageLibrary(options, callback);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      showError('Required Fields', 'Please enter a title and description for your ticket.');
      return;
    }

    const ticketData = {
      ProductID: 1, // Default placeholders
      ModuleID: 1,
      Title: title,
      Description: description,
      Priority: priority,
      Attachment: attachment?.base64 || ''
    };

    const resultAction = await dispatch(createTicket(ticketData));

    if (createTicket.fulfilled.match(resultAction)) {
      const { TicketNo } = resultAction.payload;
      Alert.alert(
        "Ticket Created",
        `Your ticket has been submitted successfully.\n\nTicket No: ${TicketNo}`,
        [{ text: "OK", onPress: onBack }]
      );
    } else {
      showError('Submission Failed', resultAction.payload || 'Could not create ticket. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Create Ticket" showBack={true} onBack={onBack} />

      <ErrorModal
        visible={errorVisible}
        title={errorConfig.title}
        message={errorConfig.message}
        onClose={() => setErrorVisible(false)}
      />

      {/* Attachment Source Picker (Bottom Sheet style) */}
      <Modal
        visible={showPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPicker(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowPicker(false)}
        >
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerTitle}>Attachment Source</Text>

            <TouchableOpacity
              style={styles.pickerItem}
              onPress={() => handleFilePicker('camera')}
            >
              <Icon name="camera" size={22} color={colors.primary} />
              <Text style={styles.pickerText}>Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.pickerItem}
              onPress={() => handleFilePicker('gallery')}
            >
              <Icon name="image" size={22} color={colors.primary} />
              <Text style={styles.pickerText}>Upload Screenshot</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.pickerItem, { borderBottomWidth: 0, marginTop: 10 }]}
              onPress={() => setShowPicker(false)}
            >
              <Text style={[styles.pickerText, { color: colors.error, marginLeft: 0, width: '100%', textAlign: 'center' }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Portfolio Section */}
          <View style={styles.card}>
            <Text style={styles.label}>Product</Text>
            <TouchableOpacity style={styles.inputWrapper}>
              <Text style={{ color: colors.textPrimary }}>Help-Desk Core (Default)</Text>
              <Icon name="chevron-down" size={20} color={colors.textMuted} style={styles.dropdownIcon} />
            </TouchableOpacity>

            <Text style={[styles.label, { marginTop: 16 }]}>Module</Text>
            <TouchableOpacity style={styles.inputWrapper}>
              <Text style={{ color: colors.textPrimary }}>Standard Module (Default)</Text>
              <Icon name="chevron-down" size={20} color={colors.textMuted} style={styles.dropdownIcon} />
            </TouchableOpacity>
          </View>

          {/* Issue Detail Section */}
          <View style={styles.card}>
            <Text style={styles.label}>Ticket Title</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.textInput}
                placeholder="Brief summary of the issue"
                placeholderTextColor={colors.textMuted}
                value={title}
                onChangeText={setTitle}
              />
            </View>

            <Text style={[styles.label, { marginTop: 16 }]}>Description</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Provide detailed steps to reproduce..."
              placeholderTextColor={colors.textMuted}
              multiline={true}
              numberOfLines={4}
              value={description}
              onChangeText={setDescription}
            />
          </View>

          {/* Priority & Attachment Section */}
          <View style={styles.card}>
            <Text style={styles.label}>Priority</Text>
            <View style={styles.priorityContainer}>
              {['Low', 'Med', 'High', 'Crit'].map((p) => (
                <TouchableOpacity
                  key={p}
                  style={[styles.priorityButton, priority === p && styles.activePriority]}
                  onPress={() => setPriority(p)}
                >
                  <Text style={[styles.priorityText, priority === p && styles.activePriorityText]}>
                    {p}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.label, { marginTop: 24 }]}>Attachments</Text>
            <TouchableOpacity
              style={[
                styles.uploadBox,
                attachment && { borderColor: colors.success, backgroundColor: '#F0FDF4' }
              ]}
              onPress={() => setShowPicker(true)}
            >
              <Icon
                name={attachment ? "check-circle" : "upload-cloud"}
                size={24}
                color={attachment ? colors.success : colors.primary}
              />
              <Text style={[styles.uploadText, attachment && { color: '#166534' }]}>
                {attachment ? attachment.fileName : "Tap to upload screenshot or photo"}
                {"\n"}
                <Text style={{ fontSize: 10 }}>Max file size: 2MB</Text>
              </Text>

              {attachment && (
                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() => setAttachment(null)}
                >
                  <Text style={{ color: colors.error, fontWeight: '700', fontSize: 12 }}>Remove</Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.submitButton, loading && { opacity: 0.7 }]}
          activeOpacity={0.8}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <>
              <Text style={styles.submitText}>Submit Ticket</Text>
              <Icon name="send" size={18} color={colors.white} />
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateTicketScreen;
