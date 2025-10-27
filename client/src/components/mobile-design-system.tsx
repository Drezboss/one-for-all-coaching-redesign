import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Smartphone, 
  Touch, 
  Zap, 
  Eye, 
  Target, 
  CheckCircle, 
  ArrowRight,
  Layout,
  Type,
  Palette,
  MousePointer
} from "lucide-react";

export function MobileDesignSystem() {
  const designPrinciples = [
    {
      icon: Touch,
      title: "Thumb-Friendly Design",
      description: "All interactive elements are minimum 44x44px for easy thumb navigation",
      examples: ["Buttons", "Links", "Form inputs", "Navigation items"]
    },
    {
      icon: Layout,
      title: "Stacked Vertical Layout",
      description: "Content flows vertically with clear hierarchy and proper spacing",
      examples: ["Single column layouts", "Card-based UI", "Consistent padding"]
    },
    {
      icon: Type,
      title: "Readable Typography",
      description: "Minimum 16px body text, 20px+ for headings, high contrast ratios",
      examples: ["16-18px body text", "22-24px headings", "High contrast colors"]
    },
    {
      icon: Zap,
      title: "Fast Performance",
      description: "Optimized images, minimal animations, quick load times",
      examples: ["WebP/AVIF images", "Lazy loading", "Minimal animations"]
    },
    {
      icon: Eye,
      title: "Clean Visual Hierarchy",
      description: "One idea per screen, clear content organization",
      examples: ["Focused content", "Clear sections", "Minimal distractions"]
    },
    {
      icon: Target,
      title: "Clear Call-to-Actions",
      description: "Prominent, accessible buttons with clear purpose",
      examples: ["Full-width buttons", "High contrast colors", "Clear labels"]
    }
  ];

  const mobileComponents = [
    {
      name: "Hero Section",
      features: ["Stacked vertical layout", "Full-width CTA buttons", "Optimized background image", "Above-the-fold content"],
      status: "Implemented"
    },
    {
      name: "About Section",
      features: ["Portrait image top", "Collapsible sections", "Clean typography", "Thumb-friendly interactions"],
      status: "Implemented"
    },
    {
      name: "Services Cards",
      features: ["Card-style UI", "Stacked layout", "Full-width buttons", "Clear feature lists"],
      status: "Implemented"
    },
    {
      name: "Contact Forms",
      features: ["Full-width inputs", "Big spacing", "Autofill enabled", "Clickable contact links"],
      status: "Implemented"
    },
    {
      name: "Navigation",
      features: ["Hamburger menu", "Sticky positioning", "Quick call button", "Smooth transitions"],
      status: "Implemented"
    },
    {
      name: "Footer",
      features: ["Centered links", "Social media row", "Clean layout", "Minimal content"],
      status: "Implemented"
    }
  ];

  const uxGuidelines = [
    {
      category: "Button Design",
      guidelines: [
        "Minimum 44x44px tap area",
        "High contrast colors",
        "Clear visual feedback",
        "Consistent styling"
      ]
    },
    {
      category: "Content Layout",
      guidelines: [
        "Single column for mobile",
        "Generous white space",
        "Clear section breaks",
        "Focused content per screen"
      ]
    },
    {
      category: "Navigation",
      guidelines: [
        "Hamburger menu for mobile",
        "Sticky header when scrolling",
        "Quick access to key actions",
        "Smooth transitions"
      ]
    },
    {
      category: "Forms",
      guidelines: [
        "Full-width inputs",
        "Large touch targets",
        "Clear labels and placeholders",
        "Autofill support"
      ]
    },
    {
      category: "Images",
      guidelines: [
        "Optimized file sizes (200-400KB)",
        "WebP/AVIF format",
        "Proper aspect ratios",
        "Lazy loading"
      ]
    },
    {
      category: "Performance",
      guidelines: [
        "Fast loading times",
        "Minimal animations",
        "Efficient code",
        "Progressive enhancement"
      ]
    }
  ];

  return (
    <div className="py-12 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">
            📱 Mobile <span className="text-lfc-red">Design System</span>
          </h1>
          <p className="text-lg text-gray-300">
            Comprehensive mobile UX guidelines and components for One For All Coaching
          </p>
        </div>

        {/* Design Principles */}
        <Card className="bg-almost-black border-gray-800 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Smartphone className="w-6 h-6 text-lfc-red mr-2" />
              Mobile Design Principles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {designPrinciples.map((principle, index) => (
                <div key={index} className="p-4 bg-black rounded-lg border border-gray-700">
                  <div className="flex items-start mb-3">
                    <principle.icon className="w-6 h-6 text-lfc-red mr-3 mt-1" />
                    <div>
                      <h3 className="text-white font-semibold mb-2">{principle.title}</h3>
                      <p className="text-gray-300 text-sm mb-3">{principle.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {principle.examples.map((example, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {example}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mobile Components */}
        <Card className="bg-almost-black border-gray-800 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Layout className="w-6 h-6 text-lfc-red mr-2" />
              Mobile Components
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mobileComponents.map((component, index) => (
                <div key={index} className="p-4 bg-black rounded-lg border border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-semibold">{component.name}</h3>
                    <Badge className="bg-green-600 text-white">
                      {component.status}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {component.features.map((feature, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-gray-600 text-gray-300">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* UX Guidelines */}
        <Card className="bg-almost-black border-gray-800 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <MousePointer className="w-6 h-6 text-lfc-red mr-2" />
              UX Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {uxGuidelines.map((category, index) => (
                <div key={index} className="p-4 bg-black rounded-lg border border-gray-700">
                  <h3 className="text-white font-semibold mb-3">{category.category}</h3>
                  <ul className="space-y-2">
                    {category.guidelines.map((guideline, idx) => (
                      <li key={idx} className="flex items-start text-gray-300 text-sm">
                        <CheckCircle className="w-4 h-4 text-lfc-red mr-2 mt-0.5 flex-shrink-0" />
                        <span>{guideline}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Implementation Status */}
        <Card className="bg-almost-black border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Target className="w-6 h-6 text-lfc-red mr-2" />
              Implementation Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-green-900/20 border border-green-600 rounded-lg">
                <div className="text-2xl font-bold text-green-400 mb-2">✅</div>
                <h3 className="text-white font-semibold mb-1">Complete</h3>
                <p className="text-gray-300 text-sm">All mobile components implemented</p>
              </div>
              <div className="p-4 bg-blue-900/20 border border-blue-600 rounded-lg">
                <div className="text-2xl font-bold text-blue-400 mb-2">📱</div>
                <h3 className="text-white font-semibold mb-1">Responsive</h3>
                <p className="text-gray-300 text-sm">Mobile-first design approach</p>
              </div>
              <div className="p-4 bg-purple-900/20 border border-purple-600 rounded-lg">
                <div className="text-2xl font-bold text-purple-400 mb-2">⚡</div>
                <h3 className="text-white font-semibold mb-1">Optimized</h3>
                <p className="text-gray-300 text-sm">Performance and UX optimized</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}