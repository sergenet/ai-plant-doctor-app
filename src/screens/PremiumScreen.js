import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Alert } from 'react-native';
import { SUBSCRIPTION_URLS } from '../constants/api';

const PremiumScreen = ({ navigation }) => {
  const handleSubscription = async (url, planName) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to open subscription page');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open subscription page');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Premium Membership</Text>
        <Text style={styles.subtitle}>
          Unlock unlimited plant analyses and exclusive benefits
        </Text>
      </View>

      <View style={styles.planContainer}>
        <View style={styles.planCard}>
          <Text style={styles.planName}>Basic Membership</Text>
          <Text style={styles.planPrice}>$4.99/month</Text>
          <View style={styles.featuresList}>
            <Text style={styles.feature}>• Unlimited plant analyses</Text>
            <Text style={styles.feature}>• Essential garden guides</Text>
            <Text style={styles.feature}>• Member discounts</Text>
            <Text style={styles.feature}>• Email support</Text>
          </View>
          
          <View style={styles.paymentButtons}>
            <TouchableOpacity 
              style={styles.stripeButton}
              onPress={() => handleSubscription(SUBSCRIPTION_URLS.BASIC_STRIPE, 'Basic Stripe')}
            >
              <Text style={styles.paymentButtonText}>Pay with Stripe</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.paypalButton}
              onPress={() => handleSubscription(SUBSCRIPTION_URLS.BASIC_PAYPAL, 'Basic PayPal')}
            >
              <Text style={styles.paymentButtonText}>Pay with PayPal</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.planCard, styles.premiumCard]}>
          <View style={styles.popularBadgeContainer}>
            <Text style={styles.popularBadge}>Most Popular</Text>
          </View>
          <Text style={styles.planName}>Green Thumb Membership</Text>
          <Text style={styles.planPrice}>$9.99/month</Text>
          <View style={styles.featuresList}>
            <Text style={styles.feature}>• Everything in Basic</Text>
            <Text style={styles.feature}>• AI-powered garden planning</Text>
            <Text style={styles.feature}>• Weekly expert tips</Text>
            <Text style={styles.feature}>• Priority support</Text>
            <Text style={styles.feature}>• Exclusive partnerships</Text>
          </View>
          
          <View style={styles.paymentButtons}>
            <TouchableOpacity 
              style={styles.stripeButton}
              onPress={() => handleSubscription(SUBSCRIPTION_URLS.PREMIUM_STRIPE, 'Premium Stripe')}
            >
              <Text style={styles.paymentButtonText}>Pay with Stripe</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.paypalButton}
              onPress={() => handleSubscription(SUBSCRIPTION_URLS.PREMIUM_PAYPAL, 'Premium PayPal')}
            >
              <Text style={styles.paymentButtonText}>Pay with PayPal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.benefitsContainer}>
        <Text style={styles.benefitsTitle}>Why Go Premium?</Text>
        <Text style={styles.benefitItem}>🌱 Unlimited plant diagnoses</Text>
        <Text style={styles.benefitItem}>📚 Access to expert garden guides</Text>
        <Text style={styles.benefitItem}>💰 Exclusive tool discounts</Text>
        <Text style={styles.benefitItem}>🤖 AI-powered garden planning</Text>
        <Text style={styles.benefitItem}>📧 Weekly gardening tips</Text>
        <Text style={styles.benefitItem}>🏆 Priority customer support</Text>
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
  planContainer: {
    paddingHorizontal: 20,
  },
  planCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    position: 'relative',
  },
  premiumCard: {
    borderWidth: 2,
    borderColor: '#ff6b35',
  },
  popularBadgeContainer: {
    position: 'absolute',
    top: -10,
    right: 20,
    backgroundColor: '#ff6b35',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularBadge: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  planName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  planPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4a7c59',
    textAlign: 'center',
    marginBottom: 20,
  },
  featuresList: {
    marginBottom: 25,
  },
  feature: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    lineHeight: 22,
  },
  paymentButtons: {
    gap: 12,
  },
  stripeButton: {
    backgroundColor: '#635bff',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  paypalButton: {
    backgroundColor: '#0070ba',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  paymentButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  benefitsContainer: {
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
  benefitsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  benefitItem: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    lineHeight: 22,
  },
});

export default PremiumScreen;
