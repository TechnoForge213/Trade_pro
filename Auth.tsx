@tailwind base;
@tailwind components;
@tailwind utilities;

/* Definition of the design system. All colors, gradients, fonts, etc should be defined here. 
All colors MUST be HSL.
*/

@layer base {
  :root {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;

    --card: 240 10% 6%;
    --card-foreground: 0 0% 98%;

    --popover: 240 10% 6%;
    --popover-foreground: 0 0% 98%;

    --primary: 262 83% 58%;
    --primary-foreground: 0 0% 100%;

    --secondary: 240 4% 16%;
    --secondary-foreground: 0 0% 98%;

    --muted: 240 4% 16%;
    --muted-foreground: 240 5% 65%;

    --accent: 189 94% 43%;
    --accent-foreground: 0 0% 100%;

    --success: 142 76% 36%;
    --success-foreground: 0 0% 100%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;

    --border: 240 6% 20%;
    --input: 240 6% 20%;
    --ring: 262 83% 58%;

    --radius: 0.75rem;

    --gradient-primary: linear-gradient(135deg, hsl(262 83% 58%), hsl(189 94% 43%));
    --gradient-success: linear-gradient(135deg, hsl(142 76% 36%), hsl(142 76% 46%));
    --gradient-card: linear-gradient(135deg, hsl(240 10% 8%), hsl(240 10% 6%));
    
    --shadow-glow: 0 0 40px hsla(262, 83%, 58%, 0.3);
    --shadow-glow-accent: 0 0 40px hsla(189, 94%, 43%, 0.3);
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
  }
}
