import { fetchStockData as realFetchStockData } from './Api.real';
import { fetchStockData as mockFetchStockData } from './Api.mock';

const useMock = process.env.REACT_APP_USE_MOCK === 'true';

export const fetchStockData = useMock ? mockFetchStockData : realFetchStockData;
