import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

interface MarketData {
  trending: Stock[];
  indices: MarketIndex[];
  timestamp: string;
}

export const useMarketData = () => {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-market-data');
        
        if (error) throw error;
        if (data) {
          setMarketData(data);
        }
      } catch (error) {
        console.error('Error fetching market data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchMarketData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return { marketData, loading };
};
