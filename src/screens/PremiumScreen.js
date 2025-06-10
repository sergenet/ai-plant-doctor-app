import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  Alert 
} from 'react-native';

const PremiumScreen = React.memo(() => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const plans = [
    {
      id: 'monthly',
      title: 'Monthly',
      price: '$4.99',
      period: '/month',
      savings: null,
    },
    {
      id: 'yearly',
      title: 'Yearly',
      price: '$39.99',
      period: '/year',
      savings: 'Save 33%',
    },
  ];

  const features = [
    'Unlimited plant diagnoses',
    'Advanced disease identification',
    'Treatment recommendations',
    'Plant care reminders',
    'Expert consultation',
    'Ad-free experience',
  ];

  const handlePlanSelect = useCallback((planId) => {
    setSelectedPlan(planId);
  }, []);

  const handleSubscribe = useCallback(() => {
    const plan = plans.find(p => p.id === selectedPlan);
    Alert.alert(
      'Subscribe',
      `This is a demo. In a real app, you would subscribe to the ${plan.title} plan for ${plan.price}${plan.period}.`,
      [{ text: 'OK' }]
    );
  }, [selectedPlan, plans]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>Premium Features</Text>
          <Text style={styles.subtitle}>
            Unlock advanced plant care capabilities
          </Text>

          <View style={styles.featuresContainer}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Text style={styles.checkmark}>✓</Text>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          <View style={styles.plansContainer}>
            <Text style={styles.plansTitle}>Choose Your Plan</Text>
            {plans.map((plan) => (
              <TouchableOpacity
                key={plan.id}
                style={[
                  styles.planCard,
                  selectedPlan === plan.id && styles.selectedPlan
                ]}
                onPress={() => handlePlanSelect(plan.id)}
                activeOpacity={0.8}
              >
                <View style={styles.planHeader}>
                  <Text style={styles.planTitle}>{plan.title}</Text>
                  {plan.savings && (
                    <View style={styles.savingsBadge}>
                      <Text style={styles.savingsText}>{plan.savings}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.planPrice}>
                  {plan.price}
                  <Text style={styles.planPeriod}>{plan.period}</Text>
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity 
            style={styles.subscribeButton} 
            onPress={handleSubscribe}
            activeOpacity={0.8}
          >
            <Text style={styles.subscribeButtonText}>
              Start Premium
            </Text>
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
            Cancel anytime. Terms and conditions apply.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
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
  featuresContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkmark: {
    fontSize: 18,
    color: '#2E7D32',
    fontWeight: 'bold',
    marginRight: 15,
  },
  featureText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  plansContainer: {
    marginBottom: 30,
  },
  plansTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  planCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedPlan: {
    borderColor: '#2E7D32',
    backgroundColor: '#f8fff8',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  savingsBadge: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  savingsText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  planPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  planPeriod: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#666',
  },
  subscribeButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 18,
    borderRadius: 25,
    marginBottom: 20,
  },
  subscribeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  disclaimer: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default PremiumScreen;
