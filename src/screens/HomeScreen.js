import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { getRemainingAnalyses } from '../services/freemiumService';

const HomeScreen = ({ navigation }) => {
  const [remainingAnalyses, setRemainingAnalyses] = useState(3);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadRemainingAnalyses();
    });

    return unsubscribe;
  }, [navigation]);

  const loadRemainingAnalyses = async () => {
    const remaining = await getRemainingAnalyses();
    setRemainingAnalyses(remaining);
  };

  const handleDiagnosePlant = () => {
    navigation.navigate('Camera');
  };

  const handleUpgradeToPremium = () => {
    navigation.navigate('Premium');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Plant Doctor</Text>
        <Text style={styles.subtitle}>
          Get instant diagnosis and treatment recommendations for your plants
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>98%</Text>
          <Text style={styles.statLabel}>Accuracy Rate</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>24/7</Text>
          <Text style={styles.statLabel}>Available</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{remainingAnalyses}</Text>
          <Text style={styles.statLabel}>Free Analyses Left</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={handleDiagnosePlant}>
        <Text style={styles.primaryButtonText}>Diagnose Plant</Text>
      </TouchableOpacity>

      {remainingAnalyses === 0 && (
        <TouchableOpacity style={styles.premiumButton} onPress={handleUpgradeToPremium}>
          <Text style={styles.premiumButtonText}>Upgrade to Premium</Text>
        </TouchableOpacity>
      )}

      <View style={styles.featuresContainer}>
        <Text style={styles.featuresTitle}>Features</Text>
        <Text style={styles.featureItem}>• Instant AI-powered diagnosis</Text>
        <Text style={styles.featureItem}>• Expert treatment recommendations</Text>
        <Text style={styles.featureItem}>• Disease identification</Text>
        <Text style={styles.featureItem}>• Plant care tips</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#4a7c59',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#e8f5e8',
    textAlign: 'center',
    lineHeight: 22,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statBox: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    minWidth: 80,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a7c59',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#4a7c59',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  premiumButton: {
    backgroundColor: '#ff6b35',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  premiumButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  featuresContainer: {
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
  featuresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  featureItem: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    lineHeight: 22,
  },
});

export default HomeScreen;
