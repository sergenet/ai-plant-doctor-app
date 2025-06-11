import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { analyzePlantImage } from '../services/plantDoctorService';
import { canAnalyze, incrementAnalysisCount, getRemainingAnalyses } from '../services/freemiumService';

const CameraScreen = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);
  const [loading, setLoading] = useState(false);

  const showImagePicker = () => {
    Alert.alert(
      'Select Image',
      'Choose how you want to select a plant image',
      [
        { text: 'Camera', onPress: openCamera },
        { text: 'Photo Library', onPress: openImageLibrary },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 1024,
      maxHeight: 1024,
      includeBase64: true,
    };

    launchCamera(options, handleImageResponse);
  };

  const openImageLibrary = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 1024,
      maxHeight: 1024,
      includeBase64: true,
    };

    launchImageLibrary(options, handleImageResponse);
  };

  const handleImageResponse = (response) => {
    if (response.didCancel || response.error) {
      return;
    }

    if (response.assets && response.assets[0]) {
      setSelectedImage(response.assets[0]);
      setDiagnosis(null);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    const canPerformAnalysis = await canAnalyze();
    if (!canPerformAnalysis) {
      Alert.alert(
        'Free Analyses Exhausted',
        'You have used all your free analyses. Upgrade to premium for unlimited access.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Upgrade', onPress: () => navigation.navigate('Premium') }
        ]
      );
      return;
    }

    setLoading(true);
    
    try {
      const result = await analyzePlantImage(selectedImage.base64);
      
      if (result.success) {
        await incrementAnalysisCount();
        setDiagnosis(result.diagnosis);
      } else {
        Alert.alert('Analysis Failed', result.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to analyze image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDiagnosis = (diagnosisText) => {
    return diagnosisText.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\n/g, '\n\n');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage.uri }} style={styles.selectedImage} />
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>No image selected</Text>
            <Text style={styles.placeholderSubtext}>Take a photo or select from library</Text>
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.selectButton} onPress={showImagePicker}>
          <Text style={styles.buttonText}>Select Plant Image</Text>
        </TouchableOpacity>

        {selectedImage && (
          <TouchableOpacity 
            style={[styles.analyzeButton, loading && styles.disabledButton]} 
            onPress={analyzeImage}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Analyze Plant</Text>
            )}
          </TouchableOpacity>
        )}
      </View>

      {diagnosis && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Diagnosis Results</Text>
          <Text style={styles.diagnosisText}>{formatDiagnosis(diagnosis)}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  imageContainer: {
    margin: 20,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  selectedImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  placeholderContainer: {
    height: 300,
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 18,
    color: '#6c757d',
    fontWeight: '500',
  },
  placeholderSubtext: {
    fontSize: 14,
    color: '#adb5bd',
    marginTop: 8,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  selectButton: {
    backgroundColor: '#4a7c59',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  analyzeButton: {
    backgroundColor: '#28a745',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  disabledButton: {
    backgroundColor: '#6c757d',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultsContainer: {
    backgroundColor: '#ffffff',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  diagnosisText: {
    fontSize: 16,
    color: '#495057',
    lineHeight: 24,
  },
});

export default CameraScreen;