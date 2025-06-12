import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>AI Plant Doctor</Text>
        <Text style={styles.subtitle}>Diagnose plant diseases with AI</Text>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Camera')}
        >
          <Text style={styles.buttonText}>Take Photo & Diagnose</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.premiumButton}
          onPress={() => navigation.navigate('Premium')}
        >
          <Text style={styles.premiumButtonText}>Get Premium</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

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
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  premiumButton: {
    backgroundColor: '#FF9800',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  premiumButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});