import React, { useEffect, useState } from 'react';
import StockCard from './Components/StockCard/StockCard';
import { fetchStockData } from './API/Api.js';

const stockSymbols = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'AMZN'];

function App() {
  const [stockDataList, setStockDataList] = useState([]);

  useEffect(() => {
    async function loadStocks() {
      const promises = stockSymbols.map(symbol => fetchStockData(symbol));
      const results = await Promise.all(promises);
      const validResults = results.filter(Boolean);
      setStockDataList(validResults);
    }

    loadStocks();
  }, []);

  return (
    <div className="container py-5">
      <div className="row g-4">
        {stockDataList.length > 0 ? (
          stockDataList.map((stock) => (
            <div key={stock.symbol} className="col-md-6 col-lg-4">
              <StockCard stock={stock} />
            </div>
          ))
        ) : (
          <p>Loading stocks...</p>
        )}
      </div>
    </div>
  );
}

export default App;
