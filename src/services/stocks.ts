import axios from 'axios';
import { Stock } from '../types/Stock';

const NASDAQ_API_URL = 'https://api.nasdaq.com/api/quote/';

export const fetchStocks = async (): Promise<Stock[]> => {
  try {
    const response = await axios.get(`${NASDAQ_API_URL}info?symbol=`);
    const stocksData = response.data.data;

    const stocks: Stock[] = stocksData.map((stock: any) => ({
      name: stock.symbol,
      openPrice: stock.openPrice,
      weeks52Range: stock.weeks52Range,
      marketCap: stock.marketCap,
      peRatio: stock.peRatio,
    }));

    return stocks;
  } catch (error) {
    console.error('Error fetching stocks data:', error);
    throw error;
  }
};