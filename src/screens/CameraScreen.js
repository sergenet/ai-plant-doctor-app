import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image, ScrollView, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

const FREE_ANALYSIS_LIMIT = 3;

export default function CameraScreen({ navigation }) {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [diagnosis, setDiagnosis] = useState('');
  const [loading, setLoading] = useState(false);

  const checkAnalysisCount = async () => {
    try {
      const count = await AsyncStorage.getItem('analysisCount');
      return count ? parseInt(count) : 0;
    } catch (error) {
      return 0;
    }
  };

  const incrementAnalysisCount = async () => {
    try {
      const currentCount = await checkAnalysisCount();
      await AsyncStorage.setItem('analysisCount', (currentCount + 1).toString());
    } catch (error) {
      console.log('Error updating analysis count');
    }
  };

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(t('camera.permissionRequired'), t('camera.cameraPermission'));
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
      base64: true,
    });
    if (!result.canceled && result.assets && result.assets[0]) {
      setSelectedImage(result.assets[0]);
    }
  };

  const openGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(t('camera.permissionRequired'), t('camera.mediaPermission'));
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
      base64: true,
    });
    if (!result.canceled && result.assets && result.assets[0]) {
      setSelectedImage(result.assets[0]);
    }
  };

  const analyzeImage = async () => {
    const analysisCount = await checkAnalysisCount();
    if (analysisCount >= FREE_ANALYSIS_LIMIT) {
      Alert.alert(
        t('camera.upgradeRequired'),
        t('camera.upgradeMessage'),
        [
          { text: t('common.cancel'), style: 'cancel' },
          { text: t('camera.upgrade'), onPress: () => navigation.navigate('Premium') }
        ]
      );
      return;
    }

    if (!selectedImage) {
      Alert.alert(t('camera.error'), t('camera.selectImageFirst'));
      return;
    }

    setLoading(true);

    try {
      // Placeholder for AI analysis:
      setDiagnosis('Plant analysis complete. Based on the image, this appears to be a healthy plant with no visible diseases detected.');
      await incrementAnalysisCount();
    } catch (error) {
      Alert.alert(t('camera.error'), t('camera.analysisError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{t('camera.title')}</Text>
        {selectedImage && (
          <Image source={{ uri: selectedImage.uri }} style={styles.image} />
        )}
        <TouchableOpacity style={styles.button} onPress={openCamera}>
          <Text style={styles.buttonText}>{t('camera.takePhoto')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={openGallery}>
          <Text style={styles.buttonText}>{t('camera.selectGallery')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.analyzeButton]}
          onPress={analyzeImage}
          disabled={!selectedImage || loading}
        >
          <Text style={styles.buttonText}>
            {loading ? t('camera.analyzing') : t('camera.analyzePlant')}
          </Text>
        </TouchableOpacity>
        {diagnosis ? (
          <View style={styles.diagnosisContainer}>
            <Text style={styles.diagnosisTitle}>{t('camera.diagnosis')}</Text>
            <Text style={styles.diagnosisText}>{diagnosis}</Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  analyzeButton: {
    backgroundColor: '#2E7D32',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  diagnosisContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  diagnosisTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },
  diagnosisText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});