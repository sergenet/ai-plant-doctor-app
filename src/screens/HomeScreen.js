import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

const HomeScreen = React.memo(({ navigation }) => {
  const handleDiagnosePress = () => {
    navigation.navigate('Camera');
  };

  const handlePremiumPress = () => {
    navigation.navigate('Premium');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>AI Plant Doctor</Text>
        <Text style={styles.subtitle}>
          Diagnose plant diseases with artificial intelligence
        </Text>
        
        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={handleDiagnosePress}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>Diagnose Plant</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton} 
          onPress={handlePremiumPress}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryButtonText}>Premium Features</Text>
        </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  primaryButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 15,
    minWidth: 200,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#2E7D32',
    minWidth: 200,
  },
  secondaryButtonText: {
    color: '#2E7D32',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default HomeScreen;
