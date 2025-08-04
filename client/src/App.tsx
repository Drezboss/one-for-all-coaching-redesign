import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/ui/navigation";
import { MobileNavigation } from "@/components/mobile-navigation";
import { Footer } from "@/components/footer";
import { MobileFooter } from "@/components/mobile-footer";
import { ThemeProvider } from "@/components/theme-provider";
import Home from "@/pages/home";
import MobileHome from "@/pages/mobile-home";
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
import { useEffect, useState } from "react";

function Router() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Switch>
      <Route path="/" component={isMobile ? MobileHome : Home} />
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
  );
}

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-background text-foreground">
            {isMobile ? <MobileNavigation /> : <Navigation />}
            <Router />
            {isMobile ? <MobileFooter /> : <Footer />}
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
