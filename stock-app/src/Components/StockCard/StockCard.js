import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const StockCard = ({ stock }) => {
  const { symbol, currentPrice, low52Week, ipoDate } = stock;
  const near52WeekLow = currentPrice <= low52Week * 1.02;

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h5 className="card-title">{symbol}</h5>
        <p className="card-text"><strong>Current Price:</strong> ${currentPrice?.toFixed(2)}</p>
        <p className="card-text"><strong>52-Week Low:</strong> ${low52Week?.toFixed(2)}</p>
        <p className="card-text"><strong>IPO Year:</strong> {ipoDate ? new Date(ipoDate).getFullYear() : 'N/A'}</p>
        <p className={`fw-bold ${near52WeekLow ? 'text-success' : 'text-danger'}`}>
          {near52WeekLow ? '✅ Near 52-Week Low' : '❌ Not Near 52-Week Low'}
        </p>
      </div>
    </div>
  );
};

export default StockCard;
