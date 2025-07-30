import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TinaDemo() {
  return (
    <main className="container mx-auto py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Tina Demo
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Welcome to the Tina demonstration page. This is where you can explore 
            our Tina-related features and capabilities.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Demo Features</CardTitle>
              <CardDescription>
                Explore the various capabilities available in this demo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Interactive components</li>
                <li>• Real-time demonstrations</li>
                <li>• Feature showcases</li>
                <li>• User interface examples</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>
                Learn how to make the most of this demo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This demo page provides an overview of Tina-related functionality. 
                You can customize this content based on your specific needs and requirements.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}