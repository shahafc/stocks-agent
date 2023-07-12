module.exports = {
  reactStrictMode: true,
  env: {
    STOCK_API: 'https://api.nasdaq.com',
    NEWS_API: 'https://api.newsapi.com',
    RECOMMENDATIONS_API: 'https://api.recommendations.com',
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        destination: '/',
        permanent: false,
      },
    ]
  },
}