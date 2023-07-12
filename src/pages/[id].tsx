import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import StockDetail from '../../components/StockDetail';
import { Stock } from '../../types/Stock';
import { News } from '../../types/News';
import { Recommendation } from '../../types/Recommendation';
import { fetchStocks } from '../../services/stocks';
import { fetchNews } from '../../services/news';
import { fetchRecommendations } from '../../services/recommendations';

const StockPage = ({ initialStock, initialNews, initialRecommendations }) => {
  const router = useRouter();
  const { id } = router.query;
  const [stock, setStock] = useState<Stock>(initialStock);
  const [news, setNews] = useState<News[]>(initialNews);
  const [recommendations, setRecommendations] = useState<Recommendation[]>(initialRecommendations);

  useEffect(() => {
    if (id) {
      fetchStocks(id)
        .then(data => setStock(data))
        .catch(err => console.error(err));

      fetchNews(id)
        .then(data => setNews(data))
        .catch(err => console.error(err));

      fetchRecommendations(id)
        .then(data => setRecommendations(data))
        .catch(err => console.error(err));
    }
  }, [id]);

  return (
    <div>
      <StockDetail stock={stock} news={news} recommendations={recommendations} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params;
  const initialStock = await fetchStocks(id);
  const initialNews = await fetchNews(id);
  const initialRecommendations = await fetchRecommendations(id);

  return {
    props: {
      initialStock,
      initialNews,
      initialRecommendations,
    },
  };
};

export default StockPage;