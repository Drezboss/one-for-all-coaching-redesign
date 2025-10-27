import type { VercelRequest, VercelResponse } from "@vercel/node";

interface ContentUpdateRequest {
  path: string;
  value: string | object;
  action: 'update' | 'create' | 'delete';
}

interface ContentUpdateResponse {
  success: boolean;
  message: string;
  data?: any;
  timestamp: string;
}

// Simulate content storage (in production, this would connect to a database)
let contentStore: Record<string, any> = {
  "site.name": "All For One Coaching",
  "site.tagline": "Where personal growth meets professional standards",
  "coach.name": "Dave Cornock",
  "coach.title": "UEFA B Licensed Football Coach",
  "home.hero.title": "UNLOCK YOUR POTENTIAL",
  "home.hero.subtitle": "Professional football coaching that meets you where you are and takes you where you want to be.",
  "services.title": "OUR COACHING SERVICES",
  "contact.hero.title": "Let's Build Your Next Step Together.",
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  try {
    if (req.method === "GET") {
      // Return current content
      const response: ContentUpdateResponse = {
        success: true,
        message: "Content retrieved successfully",
        data: contentStore,
        timestamp: new Date().toISOString(),
      };
      res.status(200).json(response);
      return;
    }

    if (req.method === "POST") {
      const { path, value, action }: ContentUpdateRequest = req.body;

      if (!path) {
        throw new Error("Path is required");
      }

      switch (action) {
        case "update":
        case "create":
          contentStore[path] = value;
          break;
        case "delete":
          delete contentStore[path];
          break;
        default:
          throw new Error("Invalid action. Use 'update', 'create', or 'delete'");
      }

      // Log the change
      console.log(`Content ${action}d: ${path} = ${JSON.stringify(value)}`);

      const response: ContentUpdateResponse = {
        success: true,
        message: `Content ${action}d successfully`,
        data: { path, value },
        timestamp: new Date().toISOString(),
      };

      res.status(200).json(response);
      return;
    }

    // Method not allowed
    res.status(405).json({
      success: false,
      message: "Method not allowed",
      timestamp: new Date().toISOString(),
    });

  } catch (error: any) {
    const response: ContentUpdateResponse = {
      success: false,
      message: error.message || "Internal server error",
      timestamp: new Date().toISOString(),
    };

    res.status(400).json(response);
  }
}