import axios from 'axios';
import { API_CONFIG } from '../constants/api';

export const analyzePlantImage = async (base64Image, language = API_CONFIG.DEFAULT_LANGUAGE) => {
  try {
    const response = await axios.post(
      `${API_CONFIG.BASE_URL}/${API_CONFIG.ENDPOINTS.PLANT_DIAGNOSIS}`,
      {
        image: base64Image,
        language: language
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000
      }
    );
    
    if (response.data && response.data.diagnosis) {
      return {
        success: true,
        diagnosis: response.data.diagnosis
      };
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Analysis failed. Please try again.'
    };
  }
};
