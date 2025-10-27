import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user has dismissed the CTA in this session
    const dismissed = sessionStorage.getItem('sticky-cta-dismissed');
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    const handleScroll = () => {
      // Show CTA after user has scrolled 300px
      const scrolled = window.scrollY > 300;
      setIsVisible(scrolled && !isDismissed);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
    sessionStorage.setItem('sticky-cta-dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-50 md:hidden",
      "bg-gradient-to-t from-black via-black/95 to-transparent",
      "p-4 pb-safe animate-slide-up"
    )}>
      <div className="relative">
        <button
          onClick={handleDismiss}
          className="absolute -top-2 right-0 p-1 text-gray-400 hover:text-white transition-colors"
          aria-label="Dismiss"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="flex gap-3">
          <Link href="/contact" className="flex-1">
            <Button 
              className="w-full bg-lfc-red hover:bg-bright-red text-white font-bold h-12 shadow-lg"
              size="lg"
            >
              <Phone className="mr-2 h-5 w-5" />
              Book Your Session
            </Button>
          </Link>
        </div>
        
        <p className="text-xs text-gray-400 text-center mt-2">
          Limited slots available • Start your journey today
        </p>
      </div>
    </div>
  );
}