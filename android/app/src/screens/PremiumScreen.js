import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function PremiumScreen({ navigation }) {
  const handleSubscribe = (plan) => {
    // Implement Stripe payment integration here
    console.log(`Subscribing to ${plan} plan`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Premium Subscription</Text>
        <Text style={styles.subtitle}>Unlock unlimited plant diagnoses</Text>
        
        <View style={styles.planContainer}>
          <Text style={styles.planTitle}>Monthly Plan</Text>
          <Text style={styles.price}>$4.99/month</Text>
          <Text style={styles.features}>• Unlimited plant diagnoses</Text>
          <Text style={styles.features}>• Advanced AI analysis</Text>
          <Text style={styles.features}>• Treatment recommendations</Text>
          <Text style={styles.features}>• Priority support</Text>
          
          <TouchableOpacity 
            style={styles.subscribeButton}
            onPress={() => handleSubscribe('monthly')}
          >
            <Text style={styles.subscribeButtonText}>Subscribe Monthly</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.planContainer}>
          <Text style={styles.planTitle}>Yearly Plan</Text>
          <Text style={styles.price}>$39.99/year</Text>
          <Text style={styles.savings}>Save $20 per year!</Text>
          <Text style={styles.features}>• All monthly plan features</Text>
          <Text style={styles.features}>• Best value</Text>
          <Text style={styles.features}>• Cancel anytime</Text>
          
          <TouchableOpacity 
            style={[styles.subscribeButton, styles.yearlyButton]}
            onPress={() => handleSubscribe('yearly')}
          >
            <Text style={styles.subscribeButtonText}>Subscribe Yearly</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Back to Home</Text>
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
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  planContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  planTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
    textAlign: 'center',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF9800',
    marginBottom: 10,
    textAlign: 'center',
  },
  savings: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  features: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  subscribeButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  yearlyButton: {
    backgroundColor: '#FF9800',
  },
  subscribeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#666',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
});