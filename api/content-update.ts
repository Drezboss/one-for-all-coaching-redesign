import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

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
  "site.name": "One For All Coaching",
  "site.tagline": "Where personal growth meets professional standards",
  "coach.name": "Dave Cornock",
  "coach.title": "UEFA B Licensed Football Coach",
  "home.hero.title": "UNLOCK YOUR POTENTIAL",
  "home.hero.subtitle": "Professional football coaching that meets you where you are and takes you where you want to be.",
  "services.title": "OUR COACHING SERVICES",
  "contact.hero.title": "Let's Build Your Next Step Together.",
};

async function handleContentUpdate(request: Request): Promise<Response> {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Content-Type": "application/json",
  };

  // Handle CORS preflight
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 200, headers });
  }

  try {
    if (request.method === "GET") {
      // Return current content
      const response: ContentUpdateResponse = {
        success: true,
        message: "Content retrieved successfully",
        data: contentStore,
        timestamp: new Date().toISOString(),
      };
      return new Response(JSON.stringify(response), { headers });
    }

    if (request.method === "POST") {
      const body: ContentUpdateRequest = await request.json();
      const { path, value, action } = body;

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

      // Simulate persistence (in production, save to database/file)
      console.log(`Content ${action}d: ${path} = ${JSON.stringify(value)}`);

      const response: ContentUpdateResponse = {
        success: true,
        message: `Content ${action}d successfully`,
        data: { path, value },
        timestamp: new Date().toISOString(),
      };

      return new Response(JSON.stringify(response), { headers });
    }

    // Method not allowed
    return new Response(
      JSON.stringify({
        success: false,
        message: "Method not allowed",
        timestamp: new Date().toISOString(),
      }),
      { status: 405, headers }
    );

  } catch (error) {
    const response: ContentUpdateResponse = {
      success: false,
      message: error.message || "Internal server error",
      timestamp: new Date().toISOString(),
    };

    return new Response(JSON.stringify(response), {
      status: 400,
      headers,
    });
  }
}

// For Vercel deployment
export default async function handler(request: Request) {
  return await handleContentUpdate(request);
}

// For local Deno development
if (import.meta.main) {
  console.log("Content Update API starting on http://localhost:8000");
  serve(handleContentUpdate, { port: 8000 });
}