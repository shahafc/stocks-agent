import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Stock } from '../types/Stock';
import { News } from '../types/News';
import { Recommendation } from '../types/Recommendation';
import { getStock, getNews, getRecommendations } from '../services/stocks';

const StockDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [stock, setStock] = useState<Stock | null>(null);
  const [news, setNews] = useState<News[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    if (id) {
      getStock(id as string).then(setStock);
      getNews(id as string).then(setNews);
      getRecommendations(id as string).then(setRecommendations);
    }
  }, [id]);

  if (!stock) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{stock.name}</h1>
      <h2>Open Price: {stock.openPrice}</h2>
      <h2>52 Weeks Range: {stock.range52Weeks}</h2>
      <h2>Market Cap: {stock.marketCap}</h2>
      <h2>P/E Ratio: {stock.peRatio}</h2>
      <h2>News</h2>
      {news.map((newsItem, index) => (
        <div key={index}>
          <h3>{newsItem.title}</h3>
          <p>{newsItem.content}</p>
        </div>
      ))}
      <h2>Recommendations</h2>
      {recommendations.map((recommendation, index) => (
        <div key={index}>
          <h3>{recommendation.source}</h3>
          <p>{recommendation.content}</p>
        </div>
      ))}
    </div>
  );
};

export default StockDetail;