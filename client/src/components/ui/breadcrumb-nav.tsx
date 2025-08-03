import { Link, useLocation } from "wouter";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function BreadcrumbNav() {
  const [location] = useLocation();
  
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = location.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];
    
    const pathMap: Record<string, string> = {
      "about": "About Dave",
      "individual-coaching": "1-2-1 Coaching",
      "group-sessions": "Group Sessions",
      "contact": "Contact",
      "login": "Login",
      "register": "Register",
      "parent-dashboard": "Parent Dashboard",
      "admin": "Admin",
      "calendar": "Calendar"
    };
    
    paths.forEach((path, index) => {
      const href = '/' + paths.slice(0, index + 1).join('/');
      const label = pathMap[path] || path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
      breadcrumbs.push({ label, href: index === paths.length - 1 ? undefined : href });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbs = getBreadcrumbs();
  
  if (breadcrumbs.length <= 1) return null;
  
  return (
    <nav className="bg-almost-black border-b border-gray-800 px-4 py-2">
      <ol className="flex items-center space-x-2 text-sm max-w-7xl mx-auto">
        {breadcrumbs.map((crumb, index) => (
          <li key={index} className="flex items-center">
            {index === 0 && <Home className="w-4 h-4 mr-1 text-gray-400" />}
            {crumb.href ? (
              <Link href={crumb.href} className="text-gray-400 hover:text-white transition-colors">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-white font-medium">{crumb.label}</span>
            )}
            {index < breadcrumbs.length - 1 && (
              <ChevronRight className="w-4 h-4 mx-2 text-gray-600" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}