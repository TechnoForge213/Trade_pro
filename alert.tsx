import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface TradeDialogProps {
  mode: 'buy' | 'sell';
  symbol: string;
  currentPrice: number;
  userId: string;
  maxQuantity?: number;
}

const TradeDialog = ({ mode, symbol, currentPrice, userId, maxQuantity }: TradeDialogProps) => {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const totalAmount = quantity * currentPrice;

  const handleTrade = async () => {
    if (quantity <= 0) {
      toast.error("Quantity must be greater than 0");
      return;
    }

    if (mode === 'sell' && maxQuantity && quantity > maxQuantity) {
      toast.error(`You can only sell up to ${maxQuantity} shares`);
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('process-trade', {
        body: {
          symbol,
          company_name: symbol,
          quantity,
          price: currentPrice,
          transaction_type: mode,
        }
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      toast.success(`${mode === 'buy' ? 'Bought' : 'Sold'} ${quantity} shares of ${symbol}`);
      setOpen(false);
      setQuantity(1);
    } catch (error: any) {
      toast.error(error.message || "Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          size="sm" 
          className={mode === 'buy' ? 'bg-success hover:bg-success/80' : 'bg-destructive hover:bg-destructive/80'}
        >
          {mode === 'buy' ? 'Buy' : 'Sell'}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card">
        <DialogHeader>
          <DialogTitle>
            {mode === 'buy' ? 'Buy' : 'Sell'} {symbol}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Current Price</Label>
            <div className="p-3 rounded-lg bg-secondary">
              <p className="text-lg font-semibold">₹{currentPrice.toFixed(2)}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              max={mode === 'sell' ? maxQuantity : undefined}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
              className="bg-secondary"
            />
            {mode === 'sell' && maxQuantity && (
              <p className="text-xs text-muted-foreground">Available: {maxQuantity} shares</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Total Amount</Label>
            <div className="p-3 rounded-lg bg-secondary">
              <p className="text-xl font-bold">₹{totalAmount.toFixed(2)}</p>
            </div>
          </div>

          <Button 
            onClick={handleTrade}
            disabled={loading}
            className={`w-full ${mode === 'buy' ? 'bg-success hover:bg-success/80' : 'bg-destructive hover:bg-destructive/80'}`}
          >
            {loading ? 'Processing...' : `Confirm ${mode === 'buy' ? 'Buy' : 'Sell'}`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TradeDialog;
