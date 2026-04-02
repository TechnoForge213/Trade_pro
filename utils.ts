import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface StockPrice {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  timestamp: string;
}

export const useStockPrice = (symbol: string) => {
  const [stockPrice, setStockPrice] = useState<StockPrice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockPrice = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-stock-price', {
          body: { symbol }
        });
        
        if (error) throw error;
        if (data) {
          setStockPrice(data);
        }
      } catch (error) {
        console.error('Error fetching stock price:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockPrice();
    
    // Refresh every 10 seconds
    const interval = setInterval(fetchStockPrice, 10000);
    
    return () => clearInterval(interval);
  }, [symbol]);

  return { stockPrice, loading };
};
