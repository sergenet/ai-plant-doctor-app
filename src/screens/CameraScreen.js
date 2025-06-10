import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Alert,
  SafeAreaView,
  ActivityIndicator 
} from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

const CameraScreen = React.memo(() => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const imagePickerOptions = {
    mediaType: 'photo',
    quality: 0.8,
    maxWidth: 1024,
    maxHeight: 1024,
  };

  const handleCameraPress = useCallback(() => {
    launchCamera(imagePickerOptions, (response) => {
      if (response.assets && response.assets[0]) {
        setSelectedImage(response.assets[0]);
      }
    });
  }, []);

  const handleGalleryPress = useCallback(() => {
    launchImageLibrary(imagePickerOptions, (response) => {
      if (response.assets && response.assets[0]) {
        setSelectedImage(response.assets[0]);
      }
    });
  }, []);

  const handleAnalyzePress = useCallback(async () => {
    if (!selectedImage) {
      Alert.alert('No Image', 'Please select an image first');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      Alert.alert(
        'Analysis Complete',
        'This is a demo. In a real app, this would analyze the plant image using AI.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to analyze image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  }, [selectedImage]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Plant Diagnosis</Text>
        <Text style={styles.subtitle}>
          Take a photo or select from gallery to diagnose plant diseases
        </Text>

        {selectedImage && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: selectedImage.uri }} style={styles.selectedImage} />
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.cameraButton} 
            onPress={handleCameraPress}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.galleryButton} 
            onPress={handleGalleryPress}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Choose from Gallery</Text>
          </TouchableOpacity>

          {selectedImage && (
            <TouchableOpacity 
              style={[styles.analyzeButton, isAnalyzing && styles.disabledButton]} 
              onPress={handleAnalyzePress}
              disabled={isAnalyzing}
              activeOpacity={0.8}
            >
              {isAnalyzing ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.analyzeButtonText}>Analyze Plant</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  selectedImage: {
    width: 250,
    height: 250,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  buttonContainer: {
    gap: 15,
  },
  cameraButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 15,
    borderRadius: 10,
  },
  galleryButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
  },
  analyzeButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  analyzeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CameraScreen;
