import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';

export default function App() {
  const [freeAnalysesLeft, setFreeAnalysesLeft] = useState(3);
  const [isPremium, setIsPremium] = useState(false);

  const handleAnalyzePhoto = () => {
    if (!isPremium && freeAnalysesLeft <= 0) {
      Alert.alert('Premium Required', 'Subscribe to continue analyzing plants!');
      return;
    }

    if (!isPremium) {
      setFreeAnalysesLeft(freeAnalysesLeft - 1);
    }

    Alert.alert('Analysis Complete', 'Your plant appears healthy!');
  };

  const handleUpgradeToPremium = () => {
    setIsPremium(true);
    Alert.alert('Welcome to Premium!', 'You now have unlimited plant analyses.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🩺 AI Plant Doctor</Text>
        <Text style={styles.subtitle}>Instant plant disease diagnosis using AI</Text>
      </View>

      <View style={styles.statsContainer}>
        {!isPremium && (
          <Text style={styles.freeCounter}>
            {freeAnalysesLeft} Free Analysis Left
          </Text>
        )}
        {isPremium && (
          <Text style={styles.premiumBadge}>✨ Premium Member</Text>
        )}
      </View>

      <TouchableOpacity style={styles.analyzeButton} onPress={handleAnalyzePhoto}>
        <Text style={styles.analyzeButtonText}>📷 Select Photo & Analyze</Text>
      </TouchableOpacity>

      {!isPremium && (
        <TouchableOpacity style={styles.upgradeButton} onPress={handleUpgradeToPremium}>
          <Text style={styles.upgradeButtonText}>Upgrade to Premium</Text>
          <Text style={styles.upgradeSubtext}>$4.99/month - Unlimited analyses</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2d5a27',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  statsContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  freeCounter: {
    fontSize: 18,
    color: '#e67e22',
    fontWeight: '600',
  },
  premiumBadge: {
    fontSize: 18,
    color: '#27ae60',
    fontWeight: '600',
  },
  analyzeButton: {
    backgroundColor: '#27ae60',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  analyzeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  upgradeButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  upgradeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  upgradeSubtext: {
    color: 'white',
    fontSize: 14,
    marginTop: 5,
  },
});
