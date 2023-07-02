import axios from 'axios';
import { News } from '../types/News';

export const fetchNews = async (stockName: string): Promise<News[]> => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/everything?q=${stockName}&apiKey=YOUR_NEWS_API_KEY`);
    return response.data.articles.map((article: any) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      sourceName: article.source.name,
      publishedAt: article.publishedAt,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};