import { TrendingUp, TrendingDown } from "lucide-react";
import StockChart from "./StockChart";
import { useMarketData } from "@/hooks/useMarketData";
import { Skeleton } from "./ui/skeleton";

const MarketOverview = () => {
  const { marketData, loading } = useMarketData();

  if (loading) {
    return (
      <section className="py-24 px-4 md:px-6">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Live <span className="bg-gradient-primary bg-clip-text text-transparent">Market Overview</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Real-time tracking of major indices and market trends
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32 rounded-2xl" />
            ))}
          </div>
          <Skeleton className="h-[500px] rounded-3xl" />
        </div>
      </section>
    );
  }

  if (!marketData) return null;

  const mainIndex = marketData.indices[0];
  const isPositive = mainIndex?.change > 0;

  return (
    <section className="py-24 px-4 md:px-6">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Live <span className="bg-gradient-primary bg-clip-text text-transparent">Market Overview</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Real-time tracking of major indices and market trends
          </p>
        </div>

        {/* Market Indices Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {marketData.indices.map((index) => {
            const indexPositive = index.change > 0;
            return (
              <div 
                key={index.name}
                className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300"
              >
                <p className="text-sm text-muted-foreground mb-2">{index.name}</p>
                <p className="text-2xl font-bold mb-2">{index.value.toLocaleString()}</p>
                <div className={`flex items-center gap-1 text-sm font-semibold ${
                  indexPositive ? 'text-success' : 'text-destructive'
                }`}>
                  {indexPositive ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{indexPositive ? '+' : ''}{index.changePercent.toFixed(2)}%</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Chart */}
        <div className="p-8 rounded-3xl bg-gradient-card border border-border backdrop-blur-sm">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">{mainIndex?.name}</h3>
              <p className={`text-3xl font-bold mb-1 ${isPositive ? 'text-success' : 'text-destructive'}`}>
                {mainIndex?.value.toLocaleString()}
              </p>
              <p className={`text-sm flex items-center gap-1 ${isPositive ? 'text-success' : 'text-destructive'}`}>
                {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {isPositive ? '+' : ''}{mainIndex?.change.toFixed(2)} ({isPositive ? '+' : ''}{mainIndex?.changePercent.toFixed(2)}%)
              </p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
                1D
              </button>
              <button className="px-4 py-2 rounded-lg bg-secondary text-muted-foreground text-sm font-medium hover:bg-secondary/80 transition-colors">
                1W
              </button>
              <button className="px-4 py-2 rounded-lg bg-secondary text-muted-foreground text-sm font-medium hover:bg-secondary/80 transition-colors">
                1M
              </button>
            </div>
          </div>
          
          <div className="h-[400px]">
            <StockChart variant="area" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketOverview;
