import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

// Mock data for demonstration
const generateMockData = () => {
  const data = [];
  let basePrice = 18500;
  
  for (let i = 0; i < 30; i++) {
    const change = (Math.random() - 0.5) * 200;
    basePrice += change;
    data.push({
      time: `${9 + Math.floor(i / 6)}:${(i % 6) * 10}`,
      price: parseFloat(basePrice.toFixed(2)),
      volume: Math.floor(Math.random() * 1000000)
    });
  }
  
  return data;
};

interface StockChartProps {
  variant?: 'line' | 'area';
}

const StockChart = ({ variant = 'area' }: StockChartProps) => {
  const data = generateMockData();
  const isPositive = data[data.length - 1].price > data[0].price;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/95 backdrop-blur-sm border border-border p-3 rounded-lg">
          <p className="text-sm font-semibold">{payload[0].payload.time}</p>
          <p className={`text-sm ${isPositive ? 'text-success' : 'text-destructive'}`}>
            ₹{payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  if (variant === 'line') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis 
            dataKey="time" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            domain={['auto', 'auto']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke={isPositive ? "hsl(var(--success))" : "hsl(var(--destructive))"}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
            <stop 
              offset="5%" 
              stopColor={isPositive ? "hsl(var(--success))" : "hsl(var(--destructive))"} 
              stopOpacity={0.3}
            />
            <stop 
              offset="95%" 
              stopColor={isPositive ? "hsl(var(--success))" : "hsl(var(--destructive))"} 
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <XAxis 
          dataKey="time" 
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
        />
        <YAxis 
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          domain={['auto', 'auto']}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area 
          type="monotone" 
          dataKey="price" 
          stroke={isPositive ? "hsl(var(--success))" : "hsl(var(--destructive))"}
          strokeWidth={2}
          fill="url(#colorPrice)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default StockChart;
