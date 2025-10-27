import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Suspense } from "react";
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

// Loading component for better UX
function LoadingPage() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-background"
      role="status"
      aria-label="Loading page content"
    >
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

// Error Boundary component
function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold text-foreground mb-4">Something went wrong</h1>
        <p className="text-muted-foreground mb-6">
          We apologize for the inconvenience. Please try refreshing the page or contact us if the problem persists.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<LoadingPage />}>
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
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-background text-foreground">
            {/* Skip to main content anchor point */}
            <div id="top" />
            
            <Navigation />
            
            <main 
              id="main-content" 
              className="flex-1"
              role="main"
              aria-label="Main content"
              tabIndex={-1}
            >
              <Router />
            </main>
            
            <Footer />
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
