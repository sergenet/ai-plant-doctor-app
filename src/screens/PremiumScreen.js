import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function PremiumScreen({ navigation }) {
  const { t } = useTranslation();

  const handleSubscribe = (plan) => {
    // Implement Stripe payment integration here
    console.log(`Subscribing to ${plan} plan`);
    // You can show an alert or navigate to a payment screen here
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{t('premium.title')}</Text>
        <Text style={styles.subtitle}>{t('premium.subtitle')}</Text>
        
        <View style={styles.planContainer}>
          <Text style={styles.planTitle}>{t('premium.monthlyPlan')}</Text>
          <Text style={styles.price}>{t('premium.monthlyPrice')}</Text>
          <Text style={styles.features}>{t('premium.unlimitedDiagnoses')}</Text>
          <Text style={styles.features}>{t('premium.advancedAI')}</Text>
          <Text style={styles.features}>{t('premium.treatmentRecommendations')}</Text>
          <Text style={styles.features}>{t('premium.prioritySupport')}</Text>
          
          <TouchableOpacity 
            style={styles.subscribeButton}
            onPress={() => handleSubscribe('monthly')}
          >
            <Text style={styles.subscribeButtonText}>{t('premium.subscribeMonthly')}</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.planContainer}>
          <Text style={styles.planTitle}>{t('premium.yearlyPlan')}</Text>
          <Text style={styles.price}>{t('premium.yearlyPrice')}</Text>
          <Text style={styles.savings}>{t('premium.savings')}</Text>
          <Text style={styles.features}>{t('premium.allMonthlyFeatures')}</Text>
          <Text style={styles.features}>{t('premium.bestValue')}</Text>
          <Text style={styles.features}>{t('premium.cancelAnytime')}</Text>
          
          <TouchableOpacity 
            style={[styles.subscribeButton, styles.yearlyButton]}
            onPress={() => handleSubscribe('yearly')}
          >
            <Text style={styles.subscribeButtonText}>{t('premium.subscribeYearly')}</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>{t('premium.backToHome')}</Text>
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