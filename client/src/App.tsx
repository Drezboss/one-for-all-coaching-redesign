import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { ErrorBoundary } from "@/components/error-boundary";
import { motion, AnimatePresence } from "framer-motion";
import { pageTransition } from "@/lib/animations";
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

function AnimatedRoute({ path, component: Component }: { path?: string; component: React.ComponentType }) {
  const [location] = useLocation();
  const isMatch = path ? location === path : true;
  
  return (
    <AnimatePresence mode="wait">
      {isMatch && (
        <motion.div
          key={location}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageTransition}
          className="min-h-[calc(100vh-4rem)]"
        >
          <Component />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <AnimatedRoute path="/" component={Home} />} />
      <Route path="/about" component={() => <AnimatedRoute path="/about" component={About} />} />
      <Route path="/individual-coaching" component={() => <AnimatedRoute path="/individual-coaching" component={IndividualCoaching} />} />
      <Route path="/group-sessions" component={() => <AnimatedRoute path="/group-sessions" component={GroupSessions} />} />
      <Route path="/contact" component={() => <AnimatedRoute path="/contact" component={Contact} />} />
      <Route path="/login" component={() => <AnimatedRoute path="/login" component={Login} />} />
      <Route path="/register" component={() => <AnimatedRoute path="/register" component={Register} />} />
      <Route path="/admin" component={() => <AnimatedRoute path="/admin" component={Admin} />} />
      <Route path="/calendar" component={() => <AnimatedRoute path="/calendar" component={Calendar} />} />
      <Route path="/parent-dashboard" component={() => <AnimatedRoute path="/parent-dashboard" component={ParentDashboard} />} />
      <Route path="/tina-demo" component={() => <AnimatedRoute path="/tina-demo" component={TinaDemo} />} />
      <Route component={() => <AnimatedRoute component={NotFound} />} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TooltipProvider>
            <motion.div 
              className="min-h-screen bg-background text-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Navigation />
              <main className="relative">
                <Router />
              </main>
              <Footer />
            </motion.div>
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
