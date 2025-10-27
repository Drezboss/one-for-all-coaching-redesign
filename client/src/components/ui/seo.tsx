import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

export function SEO({
  title = "One For All Coaching - Professional Football Development",
  description = "Professional football coaching and development services. 1-2-1 sessions, group training, and coach education led by UEFA B License coach Dave Cornock.",
  keywords = "football coaching, soccer training, 1-2-1 coaching, group sessions, coach education, UEFA B license, Liverpool, football development",
  image = "/og-image.jpg",
  url = "",
  type = "website",
  author = "Dave Cornock",
  publishedTime,
  modifiedTime,
  section,
  tags = [],
}: SEOProps) {
  const fullUrl = url ? `${window.location.origin}${url}` : window.location.href;
  const fullImageUrl = image.startsWith("http") ? image : `${window.location.origin}${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="One For All Coaching" />
      <meta property="og:locale" content="en_GB" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:site" content="@oneforallcoach" />
      <meta name="twitter:creator" content="@oneforallcoach" />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href={fullUrl} />

      {/* Article specific meta tags */}
      {type === "article" && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SportsActivityLocation",
          "name": "One For All Coaching",
          "description": description,
          "url": fullUrl,
          "image": fullImageUrl,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Liverpool",
            "addressCountry": "GB"
          },
          "telephone": "+44-XXX-XXX-XXXX",
          "email": "info@oneforallcoaching.com",
          "sameAs": [
            "https://www.facebook.com/oneforallcoaching",
            "https://www.instagram.com/oneforallcoaching",
            "https://www.linkedin.com/company/oneforallcoaching"
          ],
          "openingHours": "Mo-Su 09:00-18:00",
          "priceRange": "££",
          "currenciesAccepted": "GBP",
          "paymentAccepted": "Cash, Credit Card, Bank Transfer"
        })}
      </script>
    </Helmet>
  );
}

// Predefined SEO configurations for different pages
export const SEOConfigs = {
  home: {
    title: "One For All Coaching - Professional Football Development",
    description: "Transform your football potential with professional 1-2-1 coaching, group sessions, and coach education. Led by UEFA B License coach Dave Cornock.",
    keywords: "football coaching, soccer training, 1-2-1 coaching, group sessions, coach education, UEFA B license, Liverpool, football development",
  },
  about: {
    title: "About Dave Cornock - UEFA B License Football Coach",
    description: "Meet Dave Cornock, UEFA B License coach with over 15 years of experience in football development. Learn about his coaching philosophy and methodology.",
    keywords: "Dave Cornock, UEFA B license, football coach, coaching experience, Liverpool football, coaching philosophy",
  },
  individualCoaching: {
    title: "1-2-1 Football Coaching - Personalised Training Programs",
    description: "Personalised 1-2-1 football coaching sessions tailored to your position, goals, and playing style. Technical, tactical, and mental development.",
    keywords: "1-2-1 football coaching, personalised training, individual coaching, technical development, tactical training, mental coaching",
  },
  groupSessions: {
    title: "Group Football Sessions - Team Development & Training",
    description: "Group football sessions for small teams and friend groups. Focus on teamwork, communication, and shared development with individual attention.",
    keywords: "group football sessions, team training, small group coaching, teamwork, communication training, football development",
  },
  contact: {
    title: "Contact One For All Coaching - Book Your Session",
    description: "Get in touch to book your football coaching session. Contact Dave Cornock for 1-2-1 coaching, group sessions, or coach education.",
    keywords: "contact football coach, book coaching session, football training booking, Dave Cornock contact, coaching inquiry",
  },
};