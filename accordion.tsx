import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Beginner",
    price: "$10",
    description: "Perfect for getting started",
    features: [
      "Basic trading access",
      "30-day demo trial",
      "Real-time market data",
      "Basic analytics",
      "Email support"
    ],
    popular: false
  },
  {
    name: "Professional",
    price: "$27",
    description: "For serious traders",
    features: [
      "Everything in Beginner",
      "AI advisor access (limited)",
      "Predictive charts & insights",
      "Advanced analytics",
      "Priority support",
      "Custom watchlists"
    ],
    popular: true
  },
  {
    name: "Entrepreneur",
    price: "$50",
    description: "Maximum power & insights",
    features: [
      "Everything in Professional",
      "Unlimited AI access",
      "Live analytics dashboard",
      "Smart alerts & notifications",
      "Risk assessment tools",
      "Portfolio automation",
      "24/7 premium support"
    ],
    popular: false
  }
];

const PricingSection = () => {
  return (
    <section className="py-24 px-4 md:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Choose Your <span className="bg-gradient-primary bg-clip-text text-transparent">Trading Plan</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start with a free demo, then upgrade to unlock AI-powered insights
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={plan.name}
              className={`relative p-8 rounded-3xl backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                plan.popular 
                  ? 'bg-gradient-card border-2 border-primary shadow-glow' 
                  : 'bg-card/50 border border-border hover:border-primary/50'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-primary rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </div>

                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-gradient-primary hover:shadow-glow' 
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                  size="lg"
                >
                  Get Started
                </Button>

                <div className="space-y-3 pt-4">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/90">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-12">
          All plans include demo trading mode for users under 18 • Cancel anytime
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
