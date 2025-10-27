import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import Home from "@/pages/home";
import About from "@/pages/about";
import IndividualCoaching from "@/pages/individual-coaching";
import GroupSessions from "@/pages/group-sessions";
import Contact from "@/pages/contact";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Admin from "@/pages/admin";
import Calendar from "@/pages/calendar";
import ParentDashboard from "@/pages/parent-dashboard";
import TinaDemo from "@/pages/tina-demo";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";

function Router() {
  return (
    <main role="main" className="flex-grow">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/individual-coaching" component={IndividualCoaching} />
        <Route path="/group-sessions" component={GroupSessions} />
        <Route path="/contact" component={Contact} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/admin" component={Admin} />
        <Route path="/calendar" component={Calendar} />
        <Route path="/parent-dashboard" component={ParentDashboard} />
        <Route path="/tina-demo" component={TinaDemo} />
        <Route component={NotFound} />
      </Switch>
    </main>
  );
}

function App() {
  // Add focus management and keyboard navigation improvements
  useEffect(() => {
    // Enhanced keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip links for screen readers
      if (e.key === 'Tab' && !e.shiftKey && e.target === document.body) {
        const skipLink = document.querySelector('a[href="#main-content"]');
        if (skipLink) {
          (skipLink as HTMLElement).focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-background text-foreground flex flex-col scroll-smooth">
            {/* Skip to main content link for screen readers */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50 focus-ring"
            >
              Skip to main content
            </a>

            {/* Navigation with proper semantic structure */}
            <header role="banner">
              <Navigation />
            </header>

            {/* Main content area with proper landmark */}
            <div id="main-content" className="flex-grow">
              <Router />
            </div>

            {/* Footer with proper semantic structure */}
            <Footer />
          </div>
          
          {/* Toast notifications with proper ARIA live region */}
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
