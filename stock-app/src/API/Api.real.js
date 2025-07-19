const API_KEY = process.env.REACT_APP_STOCK_API_KEY;

const cache = {
  overview: {},
  globalQuote: {},
};

export async function fetchStockData(symbol) {
  try {
    if (!cache.overview[symbol]) {
      const overviewUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`;
      const overviewRes = await fetch(overviewUrl);
      const overviewData = await overviewRes.json();
      cache.overview[symbol] = overviewData;
    }

    if (!cache.globalQuote[symbol]) {
      const quoteUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
      const quoteRes = await fetch(quoteUrl);
      const quoteData = await quoteRes.json();
      cache.globalQuote[symbol] = quoteData;
    }

    const overviewData = cache.overview[symbol];
    const quoteData = cache.globalQuote[symbol];

    const currentPrice = parseFloat(quoteData['Global Quote']?.['05. price']);
    const low52Week = parseFloat(overviewData['52WeekLow']);
    const ipoDate =
      overviewData['IPODate'] ||
      (overviewData['AssetType'] === 'Equity'
        ? overviewData['Description']?.match(/\d{4}/)?.[0] + '-01-01'
        : null);

    if (!currentPrice || !low52Week) return null;

    return {
      symbol,
      currentPrice,
      low52Week,
      ipoDate,
    };
  } catch (error) {
    console.error(`Failed to fetch data for ${symbol}:`, error);
    return null;
  }
}
