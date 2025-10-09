import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Share,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

export default function ResultsScreen({ route, navigation }) {
  const { t } = useTranslation();
  const { diagnosis, imageUri } = route.params;
  const [isSaved, setIsSaved] = useState(false);

  const saveDiagnosis = async () => {
    try {
      const savedDiagnoses = await AsyncStorage.getItem('savedDiagnoses');
      const diagnoses = savedDiagnoses ? JSON.parse(savedDiagnoses) : [];
      
      const newDiagnosis = {
        id: Date.now().toString(),
        imageUri,
        diagnosis,
        date: new Date().toISOString(),
      };
      
      diagnoses.unshift(newDiagnosis);
      await AsyncStorage.setItem('savedDiagnoses', JSON.stringify(diagnoses));
      setIsSaved(true);
    } catch (error) {
      console.log('Error saving diagnosis:', error);
    }
  };

  const shareDiagnosis = async () => {
    try {
      const message = t('results.shareMessage', {
        disease: diagnosis.disease || 'Disease identified',
        treatment: diagnosis.treatment || 'Treatment recommendations provided'
      });
      
      await Share.share({
        message,
        title: t('results.shareTitle'),
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const formatDiagnosis = (diagnosisData) => {
    if (typeof diagnosisData === 'string') {
      return diagnosisData;
    }
    
    if (diagnosisData.disease && diagnosisData.treatment) {
      return `Disease: ${diagnosisData.disease}\n\nTreatment: ${diagnosisData.treatment}`;
    }
    
    return JSON.stringify(diagnosisData, null, 2);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
      </View>

      <View style={styles.resultContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>🩺 Diagnosis Results</Text>
          <Text style={styles.date}>
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>

        <View style={styles.diagnosisCard}>
          <Text style={styles.diagnosisText}>
            {formatDiagnosis(diagnosis)}
          </Text>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, isSaved && styles.savedButton]}
            onPress={saveDiagnosis}
            disabled={isSaved}
          >
            <Text style={styles.actionButtonText}>
              {isSaved ? '✅ Saved' : '💾 Save to My Plants'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={shareDiagnosis}
          >
            <Text style={styles.actionButtonText}>📤 Share Results</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>💡 General Plant Care Tips:</Text>
          <Text style={styles.tip}>• Monitor your plant daily for changes</Text>
          <Text style={styles.tip}>• Ensure proper drainage in pots</Text>
          <Text style={styles.tip}>• Adjust watering based on season</Text>
          <Text style={styles.tip}>• Provide adequate light for your plant type</Text>
          <Text style={styles.tip}>• Remove dead or diseased leaves promptly</Text>
        </View>

        <TouchableOpacity
          style={styles.newDiagnosisButton}
          onPress={() => navigation.navigate('Camera')}
        >
          <Text style={styles.newDiagnosisButtonText}>
            📷 Diagnose Another Plant
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.homeButtonText}>🏠 Back to Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  imageContainer: {
    height: 200,
    margin: 15,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  resultContainer: {
    margin: 15,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  diagnosisCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  diagnosisText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  actionsContainer: {
    gap: 10,
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#2E7D32',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  savedButton: {
    backgroundColor: '#4CAF50',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tipsContainer: {
    backgroundColor: '#E8F5E8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },
  tip: {
    fontSize: 14,
    color: '#2E7D32',
    marginBottom: 5,
    lineHeight: 20,
  },
  newDiagnosisButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  newDiagnosisButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  homeButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: '#2E7D32',
    borderWidth: 1,
  },
  homeButtonText: {
    color: '#2E7D32',
    fontSize: 16,
    fontWeight: 'bold',
  },
});