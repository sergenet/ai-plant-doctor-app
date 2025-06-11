import AsyncStorage from '@react-native-async-storage/async-storage';

const ANALYSIS_COUNT_KEY = 'plant_analysis_count';
const MAX_FREE_ANALYSES = 3;

export const getAnalysisCount = async () => {
  try {
    const count = await AsyncStorage.getItem(ANALYSIS_COUNT_KEY);
    return count ? parseInt(count, 10) : 0;
  } catch (error) {
    console.error('Error getting analysis count:', error);
    return 0;
  }
};

export const incrementAnalysisCount = async () => {
  try {
    const currentCount = await getAnalysisCount();
    const newCount = currentCount + 1;
    await AsyncStorage.setItem(ANALYSIS_COUNT_KEY, newCount.toString());
    return newCount;
  } catch (error) {
    console.error('Error incrementing analysis count:', error);
    return currentCount;
  }
};

export const canAnalyze = async () => {
  const count = await getAnalysisCount();
  return count < MAX_FREE_ANALYSES;
};

export const getRemainingAnalyses = async () => {
  const count = await getAnalysisCount();
  return Math.max(0, MAX_FREE_ANALYSES - count);
};

export const resetAnalysisCount = async () => {
  try {
    await AsyncStorage.removeItem(ANALYSIS_COUNT_KEY);
  } catch (error) {
    console.error('Error resetting analysis count:', error);
  }
};
