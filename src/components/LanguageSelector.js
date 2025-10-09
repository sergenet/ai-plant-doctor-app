import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' }
];

export default function LanguageSelector({ visible, onClose }) {
  const { i18n } = useTranslation();

  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
    onClose();
  };

  const currentLanguage = i18n.language;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Language</Text>
          <ScrollView style={styles.languageList}>
            {LANGUAGES.map((language) => (
              <TouchableOpacity
                key={language.code}
                style={[
                  styles.languageOption,
                  currentLanguage === language.code && styles.selectedLanguage
                ]}
                onPress={() => changeLanguage(language.code)}
              >
                <Text style={styles.flag}>{language.flag}</Text>
                <Text style={[
                  styles.languageName,
                  currentLanguage === language.code && styles.selectedLanguageText
                ]}>
                  {language.name}
                </Text>
                {currentLanguage === language.code && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 20,
    textAlign: 'center',
  },
  languageList: {
    maxHeight: 400,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
  },
  selectedLanguage: {
    backgroundColor: '#E8F5E9',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  flag: {
    fontSize: 28,
    marginRight: 15,
  },
  languageName: {
    fontSize: 18,
    color: '#333',
    flex: 1,
  },
  selectedLanguageText: {
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  checkmark: {
    fontSize: 24,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#666',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
