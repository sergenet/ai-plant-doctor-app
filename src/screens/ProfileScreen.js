import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from '../contexts/LanguageContext';

export default function ProfileScreen({ navigation }) {
  const { translations } = useLanguage();
  const [savedDiagnoses, setSavedDiagnoses] = useState([]);
  const [isPremium, setIsPremium] = useState(false);
  const [diagnosesCount, setDiagnosesCount] = useState(0);

  useEffect(() => {
    loadUserData();
    const unsubscribe = navigation.addListener('focus', () => {
      loadUserData();
    });
    return unsubscribe;
  }, [navigation]);

  const loadUserData = async () => {
    try {
      const diagnoses = await AsyncStorage.getItem('savedDiagnoses');
      const premium = await AsyncStorage.getItem('isPremium');
      const count = await AsyncStorage.getItem('diagnosesCount');
      
      setSavedDiagnoses(diagnoses ? JSON.parse(diagnoses) : []);
      setIsPremium(premium === 'true');
      setDiagnosesCount(count ? parseInt(count) : 0);
    } catch (error) {
      console.log('Error loading user data:', error);
    }
  };

  const deleteDiagnosis = async (id) => {
    Alert.alert(
      translations.confirmDelete,
      translations.deleteMessage,
      [
        { text: translations.cancel, style: 'cancel' },
        { text: translations.delete, style: 'destructive', onPress: () => confirmDelete(id) },
      ]
    );
  };

  const confirmDelete = async (id) => {
    try {
      const updatedDiagnoses = savedDiagnoses.filter(item => item.id !== id);
      setSavedDiagnoses(updatedDiagnoses);
      await AsyncStorage.setItem('savedDiagnoses', JSON.stringify(updatedDiagnoses));
    } catch (error) {
      console.log('Error deleting diagnosis:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const renderDiagnosisItem = ({ item }) => (
    <TouchableOpacity
      style={styles.diagnosisCard}
      onPress={() => navigation.navigate('Results', {
        diagnosis: item.diagnosis,
        imageUri: item.imageUri,
      })}
    >
      <Image source={{ uri: item.imageUri }} style={styles.thumbnailImage} />
      <View style={styles.diagnosisInfo}>
        <Text style={styles.diagnosisDate}>{formatDate(item.date)}</Text>
        <Text style={styles.diagnosisPreview} numberOfLines={2}>
          {typeof item.diagnosis === 'string' 
            ? item.diagnosis 
            : item.diagnosis.disease || 'Plant diagnosis available'}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteDiagnosis(item.id)}
      >
        <Text style={styles.deleteButtonText}>🗑️</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{translations.profileTitle}</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>
            {isPremium ? `⭐ ${translations.premiumStatus}` : `🆓 ${translations.freeStatus}`}
          </Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{diagnosesCount}</Text>
          <Text style={styles.statLabel}>{translations.diagnosesCountLabel}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{savedDiagnoses.length}</Text>
          <Text style={styles.statLabel}>{translations.savedPlantsLabel}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {isPremium ? '∞' : Math.max(0, 3 - diagnosesCount)}
          </Text>
          <Text style={styles.statLabel}>
            {isPremium ? translations.diagnosesCountLabel : translations.diagnosesCountLabel}
          </Text>
        </View>
      </View>

      {!isPremium && (
        <TouchableOpacity
          style={styles.upgradePrompt}
          onPress={() => navigation.navigate('Premium')}
        >
          <Text style={styles.upgradeTitle}>{translations.upgradeToPremium}</Text>
          <Text style={styles.upgradeSubtitle}>
            {translations.upgradeDescription}
          </Text>
        </TouchableOpacity>
      )}

      <View style={styles.savedDiagnosesContainer}>
        <Text style={styles.sectionTitle}>
          {translations.myPlantsTitle} ({savedDiagnoses.length})
        </Text>
        
        {savedDiagnoses.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>{translations.emptyStateIcon}</Text>
            <Text style={styles.emptyTitle}>{translations.emptyStateTitle}</Text>
            <Text style={styles.emptyDescription}>
              {translations.emptyStateDescription}
            </Text>
            <TouchableOpacity
              style={styles.diagnoseButton}
              onPress={() => navigation.navigate('Camera')}
            >
              <Text style={styles.diagnoseButtonText}>{translations.diagnoseNowButton}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={savedDiagnoses}
            renderItem={renderDiagnosisItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Camera')}
        >
          <Text style={styles.actionButtonText}>📷 New Diagnosis</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.actionButtonText}>🏠 Back to Home</Text>
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
  header: {
    backgroundColor: '#2E7D32',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  statusBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    margin: 20,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  upgradePrompt: {
    backgroundColor: '#FF9800',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  upgradeTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  upgradeSubtitle: {
    color: '#FFE0B2',
    fontSize: 14,
    textAlign: 'center',
  },
  savedDiagnosesContainer: {
    margin: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 15,
  },
  diagnosisCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  thumbnailImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  diagnosisInfo: {
    flex: 1,
  },
  diagnosisDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  diagnosisPreview: {
    fontSize: 14,
    color: '#333',
    lineHeight: 18,
  },
  deleteButton: {
    padding: 8,
  },
  deleteButtonText: {
    fontSize: 18,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 15,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  diagnoseButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  diagnoseButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  actionsContainer: {
    margin: 20,
    gap: 10,
  },
  actionButton: {
    backgroundColor: '#2E7D32',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});