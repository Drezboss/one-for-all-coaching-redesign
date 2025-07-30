import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, RefreshCw, Trash2 } from "lucide-react";

interface ContentItem {
  path: string;
  value: string;
}

export default function TinaDemo() {
  const [content, setContent] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [selectedPath, setSelectedPath] = useState<string>("");
  const [newValue, setNewValue] = useState<string>("");
  const [action, setAction] = useState<"update" | "create" | "delete">("update");
  const { toast } = useToast();

  // Simulate content storage for demo (would be replaced by real API)
  const loadContent = async () => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Load demo content
      const demoContent = {
        "site.name": "One For All Coaching",
        "site.tagline": "Where personal growth meets professional standards",
        "coach.name": "Dave Cornock",
        "coach.title": "UEFA B Licensed Football Coach",
        "home.hero.title": "UNLOCK YOUR POTENTIAL",
        "home.hero.subtitle": "Professional football coaching that meets you where you are and takes you where you want to be.",
        "services.title": "OUR COACHING SERVICES",
        "contact.hero.title": "Let's Build Your Next Step Together.",
      };
      
      setContent(demoContent);
      toast({
        title: "Content loaded",
        description: "Demo content retrieved successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load content: " + error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Update content (demo simulation)
  const updateContent = async () => {
    if (!selectedPath) {
      toast({
        title: "Error",
        description: "Please select a content path",
        variant: "destructive",
      });
      return;
    }

    if (action !== "delete" && !newValue) {
      toast({
        title: "Error",
        description: "Please enter a value",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simulate the update operations
      const updatedContent = { ...content };
      
      switch (action) {
        case "update":
        case "create":
          updatedContent[selectedPath] = newValue;
          break;
        case "delete":
          delete updatedContent[selectedPath];
          break;
      }
      
      setContent(updatedContent);
      
      toast({
        title: "Success",
        description: `Content ${action}d successfully (Demo Mode)`,
      });
      
      // Reset form
      setSelectedPath("");
      setNewValue("");
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update content: " + error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  const contentPaths = Object.keys(content);

  return (
    <main className="container mx-auto py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Content Management Demo
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            This demo showcases a content management system powered by serverless functions. 
            Experience real-time content editing with simulated API responses.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Content Management Interface */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Save className="h-5 w-5" />
                Content Manager
              </CardTitle>
              <CardDescription>
                Update website content using the Deno API
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="action">Action</Label>
                <Select value={action} onValueChange={(value: any) => setAction(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="update">Update Content</SelectItem>
                    <SelectItem value="create">Create New Content</SelectItem>
                    <SelectItem value="delete">Delete Content</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="path">Content Path</Label>
                {action === "create" ? (
                  <Input
                    id="path"
                    placeholder="e.g., home.hero.newField"
                    value={selectedPath}
                    onChange={(e) => setSelectedPath(e.target.value)}
                  />
                ) : (
                  <Select value={selectedPath} onValueChange={setSelectedPath}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select content to modify" />
                    </SelectTrigger>
                    <SelectContent>
                      {contentPaths.map((path) => (
                        <SelectItem key={path} value={path}>
                          {path}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              {action !== "delete" && (
                <div className="space-y-2">
                  <Label htmlFor="value">New Value</Label>
                  <Textarea
                    id="value"
                    placeholder="Enter new content value..."
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    rows={3}
                  />
                </div>
              )}

              <div className="flex gap-2">
                <Button 
                  onClick={updateContent} 
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : action === "delete" ? (
                    <Trash2 className="mr-2 h-4 w-4" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  {action === "delete" ? "Delete" : "Save Changes"}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={loadContent}
                  disabled={loading}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Current Content Display */}
          <Card>
            <CardHeader>
              <CardTitle>Current Content</CardTitle>
              <CardDescription>
                Live view of content managed by the Deno API
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {contentPaths.length === 0 ? (
                    <p className="text-muted-foreground">No content available</p>
                  ) : (
                    contentPaths.map((path) => (
                      <div key={path} className="border rounded p-3 space-y-1">
                        <div className="font-mono text-sm text-muted-foreground">
                          {path}
                        </div>
                        <div className="text-sm break-words">
                          {typeof content[path] === 'string' 
                            ? content[path] 
                            : JSON.stringify(content[path])
                          }
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* API Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Demo Features</CardTitle>
            <CardDescription>
              Technical details about this content management demonstration
            </CardDescription>
          </CardHeader>
          <CardContent>
             <div className="grid gap-4 md:grid-cols-3">
               <div className="space-y-2">
                 <h4 className="font-semibold">Demo Simulation</h4>
                 <p className="text-sm text-muted-foreground">
                   Simulated content management with realistic API delays and responses
                 </p>
               </div>
               <div className="space-y-2">
                 <h4 className="font-semibold">Interactive Interface</h4>
                 <p className="text-sm text-muted-foreground">
                   Full-featured content editing interface with real-time visual feedback
                 </p>
               </div>
               <div className="space-y-2">
                 <h4 className="font-semibold">CRUD Operations</h4>
                 <p className="text-sm text-muted-foreground">
                   Complete Create, Read, Update, Delete functionality demonstration
                 </p>
               </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}