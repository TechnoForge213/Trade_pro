import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Brain, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM4QjVDRjYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek0xNiAxNmMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAyNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
      
      <div className="container relative z-10 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
            <Brain className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">AI-Powered Trading</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Smart Investing,
            </span>
            <br />
            Powered by AI
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Experience next-generation trading with real-time market intelligence, 
            AI predictions, and seamless execution—all in one platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8"
              onClick={() => navigate('/auth')}
            >
              Start Trading Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary/20 hover:bg-primary/5 text-lg px-8"
              onClick={() => navigate('/dashboard')}
            >
              View Demo
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 animate-slide-up">
              <TrendingUp className="w-10 h-10 text-success mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Real-Time Trading</h3>
              <p className="text-sm text-muted-foreground">
                Execute trades instantly with live market data and zero lag
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-accent/50 transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <Brain className="w-10 h-10 text-accent mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">AI Predictions</h3>
              <p className="text-sm text-muted-foreground">
                Get intelligent market insights powered by advanced ML models
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Shield className="w-10 h-10 text-primary mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Safe & Secure</h3>
              <p className="text-sm text-muted-foreground">
                Bank-level security with demo mode for learners under 18
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
    </section>
  );
};

export default Hero;
