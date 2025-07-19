import { mockStockData } from '../mockStockData';

export async function fetchStockData(symbol) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stock = mockStockData[symbol];

      if (!stock) {
        resolve(null);
        return;
      }

      const currentPrice = parseFloat(stock.quote['Global Quote']['05. price']);
      const low52Week = parseFloat(stock.overview['52WeekLow']);
      const ipoDate = stock.overview['IPODate'] || null;

      if (!currentPrice || !low52Week) {
        resolve(null);
        return;
      }

      resolve({
        symbol,
        currentPrice,
        low52Week,
        ipoDate,
      });
    }, 300); // Simulate API delay
  });
}
