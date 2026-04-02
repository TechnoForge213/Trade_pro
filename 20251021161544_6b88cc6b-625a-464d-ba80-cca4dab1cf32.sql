import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, TrendingDown, Brain, Wallet, Activity, LogOut, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StockChart from "@/components/StockChart";
import { useAuth } from "@/hooks/useAuth";
import { useWallet } from "@/hooks/useWallet";
import { useHoldings } from "@/hooks/useHoldings";
import { useProfile } from "@/hooks/useProfile";
import { useAIInsights } from "@/hooks/useAIInsights";
import { useEffect } from "react";
import TradeDialog from "@/components/TradeDialog";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, signOut, loading: authLoading } = useAuth();
  const { profile } = useProfile(user?.id);
  const { wallet } = useWallet(user?.id);
  const { holdings } = useHoldings(user?.id);
  const { insights, generating, generateInsights, markAsRead } = useAIInsights(user?.id);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Calculate portfolio value
  const portfolioValue = holdings.reduce((sum, holding) => 
    sum + Number(holding.current_price) * holding.quantity, 0
  );
  
  const totalGainLoss = holdings.reduce((sum, holding) => 
    sum + (Number(holding.current_price) - Number(holding.average_price)) * holding.quantity, 0
  );
  
  const gainLossPercent = holdings.length > 0 
    ? ((totalGainLoss / (portfolioValue - totalGainLoss)) * 100).toFixed(2)
    : "0.00";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                OmniTrade.AI
              </h1>
              {profile?.account_type === 'demo' && (
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                  Demo Account
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Brain className="w-4 h-4 mr-2" />
                AI Assistant
              </Button>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-success/10 border border-success/20">
                <Wallet className="w-4 h-4 text-success" />
                <span className="font-semibold text-success">
                  ₹{wallet?.balance ? Number(wallet.balance).toFixed(2) : '0.00'}
                </span>
              </div>
              <Button variant="ghost" size="icon" onClick={handleSignOut}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-8">
        {/* Portfolio Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-2xl bg-gradient-card border border-border backdrop-blur-sm">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Portfolio Value</p>
                <p className="text-3xl font-bold">₹{portfolioValue.toFixed(2)}</p>
              </div>
              <Activity className="w-8 h-8 text-primary" />
            </div>
            <div className={`flex items-center gap-2 ${totalGainLoss >= 0 ? 'text-success' : 'text-destructive'}`}>
              {totalGainLoss >= 0 ? (
                <TrendingUp className="w-5 h-5" />
              ) : (
                <TrendingDown className="w-5 h-5" />
              )}
              <span className="font-semibold">₹{totalGainLoss.toFixed(2)}</span>
              <span className="text-sm">({gainLossPercent}%)</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border">
            <p className="text-sm text-muted-foreground mb-1">Available Balance</p>
            <p className="text-3xl font-bold mb-4">₹{wallet?.balance ? Number(wallet.balance).toFixed(2) : '0.00'}</p>
            <Button className="w-full bg-gradient-primary hover:shadow-glow">
              Add Funds
            </Button>
          </div>

          <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">AI Insights</p>
              <Sparkles className="w-4 h-4 text-accent" />
            </div>
            {insights.length > 0 ? (
              <>
                <p className="text-lg font-semibold mb-2">{insights[0].title}</p>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{insights[0].content}</p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground mb-4">Generate AI insights to get personalized recommendations</p>
            )}
            <Button 
              variant="outline" 
              className="w-full border-accent/20 hover:bg-accent/5"
              onClick={generateInsights}
              disabled={generating}
            >
              {generating ? 'Generating...' : insights.length > 0 ? 'Refresh Insights' : 'Generate Insights'}
            </Button>
          </div>
        </div>

        {/* Main Chart */}
        <div className="p-8 rounded-3xl bg-gradient-card border border-border backdrop-blur-sm mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Portfolio Performance</h3>
              <p className="text-sm text-muted-foreground">Last 30 days</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium">1M</button>
              <button className="px-4 py-2 rounded-lg bg-secondary text-muted-foreground text-sm font-medium">3M</button>
              <button className="px-4 py-2 rounded-lg bg-secondary text-muted-foreground text-sm font-medium">1Y</button>
            </div>
          </div>
          
          <div className="h-[300px]">
            <StockChart variant="area" />
          </div>
        </div>

        {/* Holdings Table */}
        <div className="p-8 rounded-3xl bg-card/50 backdrop-blur-sm border border-border">
          <h3 className="text-2xl font-bold mb-6">Your Holdings</h3>
          
          {holdings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No holdings yet</p>
              <p className="text-sm text-muted-foreground">Start trading to build your portfolio</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Symbol</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Name</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Price</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Quantity</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Value</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Gain/Loss</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {holdings.map((holding) => {
                    const gainLoss = (Number(holding.current_price) - Number(holding.average_price)) * holding.quantity;
                    const gainLossPercent = ((Number(holding.current_price) - Number(holding.average_price)) / Number(holding.average_price) * 100).toFixed(2);
                    const isPositive = gainLoss >= 0;
                    
                    return (
                      <tr key={holding.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                        <td className="py-4 px-4">
                          <span className="font-semibold">{holding.symbol}</span>
                        </td>
                        <td className="py-4 px-4 text-sm text-muted-foreground">{holding.company_name}</td>
                        <td className="py-4 px-4 text-right font-medium">₹{Number(holding.current_price).toFixed(2)}</td>
                        <td className="py-4 px-4 text-right">{holding.quantity}</td>
                        <td className="py-4 px-4 text-right font-semibold">₹{(Number(holding.current_price) * holding.quantity).toFixed(2)}</td>
                        <td className={`py-4 px-4 text-right font-semibold ${isPositive ? 'text-success' : 'text-destructive'}`}>
                          ₹{gainLoss.toFixed(2)} ({gainLossPercent}%)
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex gap-2 justify-end">
                            <TradeDialog 
                              mode="buy" 
                              symbol={holding.symbol}
                              currentPrice={Number(holding.current_price)}
                              userId={user.id}
                            />
                            <TradeDialog 
                              mode="sell" 
                              symbol={holding.symbol}
                              currentPrice={Number(holding.current_price)}
                              userId={user.id}
                              maxQuantity={holding.quantity}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
