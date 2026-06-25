import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Header from '../../components/Header';
import ErrorModal from '../../components/ErrorModal';
import styles from './style';

const CreateTicketScreen = ({ onBack }) => {
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
      quality: 0.8,
      includeExtra: true,
    };

    const callback = (response) => {
      setShowPicker(false);

      if (response.didCancel) return;

      if (response.errorCode) {
        showError('Picker Error', response.errorMessage);
        return;
      }

      const file = response.assets[0];
      const sizeMB = file.fileSize / (1024 * 1024);

      if (sizeMB > 2) {
        showError(
          'File Too Large',
          'The selected image exceeds the 2MB limit. Please upload a smaller screenshot or photo.'
        );
        return;
      }

      setAttachment(file);
    };

    if (type === 'camera') {
      launchCamera(options, callback);
    } else {
      launchImageLibrary(options, callback);
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
              <Icon name="camera" size={22} color="#2563EB" />
              <Text style={styles.pickerText}>Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.pickerItem}
              onPress={() => handleFilePicker('gallery')}
            >
              <Icon name="image" size={22} color="#2563EB" />
              <Text style={styles.pickerText}>Upload Screenshot</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.pickerItem, { borderBottomWidth: 0, marginTop: 10 }]}
              onPress={() => setShowPicker(false)}
            >
              <Text style={[styles.pickerText, { color: '#EF4444', marginLeft: 0, width: '100%', textAlign: 'center' }]}>Cancel</Text>
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
              <Text style={{ color: '#94A3B8' }}>Select a product...</Text>
              <Icon name="chevron-down" size={20} color="#64748B" style={styles.dropdownIcon} />
            </TouchableOpacity>

            <Text style={[styles.label, { marginTop: 16 }]}>Module</Text>
            <TouchableOpacity style={styles.inputWrapper}>
              <Text style={{ color: '#94A3B8' }}>Select a module...</Text>
              <Icon name="chevron-down" size={20} color="#64748B" style={styles.dropdownIcon} />
            </TouchableOpacity>
          </View>

          {/* Issue Detail Section */}
          <View style={styles.card}>
            <Text style={styles.label}>Ticket Title</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.textInput}
                placeholder="Brief summary of the issue"
                placeholderTextColor="#94A3B8"
              />
            </View>

            <Text style={[styles.label, { marginTop: 16 }]}>Description</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Provide detailed steps to reproduce..."
              placeholderTextColor="#94A3B8"
              multiline={true}
              numberOfLines={4}
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
                attachment && { borderColor: '#10B981', backgroundColor: '#F0FDF4' }
              ]}
              onPress={() => setShowPicker(true)}
            >
              <Icon
                name={attachment ? "check-circle" : "upload-cloud"}
                size={24}
                color={attachment ? "#10B981" : "#2563EB"}
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
                  <Text style={{ color: '#B91C1C', fontWeight: '700', fontSize: 12 }}>Remove</Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton} activeOpacity={0.8}>
          <Text style={styles.submitText}>Submit Ticket</Text>
          <Icon name="send" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateTicketScreen;
