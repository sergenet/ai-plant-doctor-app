import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from '../components/LanguageSelector';

export default function HomeScreen({ navigation }) {
  const { translations } = useLanguage();
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.languageButton}
          onPress={() => setShowLanguageSelector(true)}
        >
          <Text style={styles.languageButtonText}>🌍 Language</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{translations.appTitle}</Text>
        <Text style={styles.subtitle}>{translations.appSubtitle}</Text>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Camera')}
        >
          <Text style={styles.buttonText}>{translations.takePhotoButton}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.premiumButton}
          onPress={() => navigation.navigate('Premium')}
        >
          <Text style={styles.premiumButtonText}>{translations.getPremiumButton}</Text>
        </TouchableOpacity>
      </View>

      <LanguageSelector 
        visible={showLanguageSelector}
        onClose={() => setShowLanguageSelector(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  languageButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#2E7D32',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  languageButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  premiumButton: {
    backgroundColor: '#FF9800',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  premiumButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});