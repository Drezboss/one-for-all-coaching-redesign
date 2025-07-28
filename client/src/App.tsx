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
import NotFound from "@/pages/not-found";

function Router() {
  return (
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
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-background text-foreground">
            <Navigation />
            <Router />
            <Footer />
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
