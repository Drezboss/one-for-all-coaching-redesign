import { Link } from "wouter";
import { Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileStickyCTA() {
  return (
    <>
      {/* Floating Sticky CTA Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="flex flex-col space-y-3">
          {/* Book Session Button */}
          <Link href="/contact">
            <Button className="bg-lfc-red text-white hover:bg-bright-red font-bold py-4 px-6 rounded-full shadow-lg transition-all duration-200 min-h-[56px] min-w-[56px] flex items-center justify-center">
              <Calendar className="w-6 h-6" />
              <span className="ml-2 hidden sm:inline">Book Session</span>
            </Button>
          </Link>

          {/* Quick Call Button */}
          <a
            href="tel:+447750887112"
            className="bg-green-600 text-white hover:bg-green-700 font-bold py-4 px-6 rounded-full shadow-lg transition-all duration-200 min-h-[56px] min-w-[56px] flex items-center justify-center"
          >
            <Phone className="w-6 h-6" />
            <span className="ml-2 hidden sm:inline">Call Now</span>
          </a>
        </div>
      </div>

      {/* Bottom Spacer to prevent content from being hidden behind floating buttons */}
      <div className="h-24"></div>
    </>
  );
}