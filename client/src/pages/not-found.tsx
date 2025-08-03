import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { SEO } from "@/components/seo";

export default function NotFound() {
  return (
    <>
      <SEO 
        title="404 - Page Not Found | One For All Coaching"
        description="The page you're looking for doesn't exist. Return to our homepage to explore our professional football coaching services."
        keywords="404, page not found, football coaching, One For All Coaching"
        canonical="https://oneforallcoaching.com/404"
      />
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            Did you forget to add the page to the router?
          </p>
        </CardContent>
      </Card>
      </div>
    </>
  );
}
