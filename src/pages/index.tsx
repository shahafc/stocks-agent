import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import StockTable from '../components/StockTable';
import Filter from '../components/Filter';
import { fetchStocks } from '../services/stocks';
import { fetchNews } from '../services/news';
import { fetchRecommendations } from '../services/recommendations';
import { Stock } from '../types/Stock';
import { News } from '../types/News';
import { Recommendation } from '../types/Recommendation';

const IndexPage: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const stocksData = await fetchStocks();
      const newsData = await fetchNews();
      const recommendationsData = await fetchRecommendations();
      setStocks(stocksData);
      setNews(newsData);
      setRecommendations(recommendationsData);
    };
    fetchData();
  }, []);

  const handleRowClick = (id: string) => {
    router.push(`/${id}`);
  };

  return (
    <div>
      <Filter />
      <StockTable stocks={stocks} onRowClick={handleRowClick} />
    </div>
  );
};

export default IndexPage;