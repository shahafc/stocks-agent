import axios from 'axios';
import { Recommendation } from '../types/Recommendation';

export const fetchRecommendations = async (): Promise<Recommendation[]> => {
  try {
    const response = await axios.get('https://api.example.com/recommendations');
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};