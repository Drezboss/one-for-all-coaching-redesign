// Central Content Management System
// Edit this file to update all website content in one place

export const siteContent = {
  // Site-wide settings
  site: {
    name: "One For All Coaching",
    tagline: "Where personal growth meets professional standards",
    domain: "all-4one-coaching.com",
    email: "dave@all-4one-coaching.com",
    phone: "+44 7750 887112", // Update with real phone
    socialMedia: {
      facebook: "https://facebook.com/oneforallcoaching",
      instagram: "https://instagram.com/oneforallcoaching",
      twitter: "https://twitter.com/oneforallcoaching"
    }
  },

  // Coach information
  coach: {
    name: "Dave Cornock",
    title: "UEFA B Licensed Football Coach",
    bio: "I'm Dave Graham, a UEFA B Licensed football coach with a broad coaching background that spans all levels of the game. My journey has taken me from grassroots football and local leagues, through the Junior Premier League (JPL) and Hellenic League, to coaching elite Tier 2 women's university teams and UDA overseas students.",
    philosophy: "I'm passionate about helping players and coaches unlock their full potential. Whether it's delivering tailored 1-to-1 sessions, designing structured training plans, or mentoring coaches throughout a season, I'm here to support your growth and development.",
    quote: "Your journey is unique. Your development should be too.",
    credentials: [
      "UEFA B License qualified",
      "FA Level 2 Coaching Badge",
      "Semi-professional playing experience",
      "Grassroots to elite level coaching",
      "DBS checked and safeguarding certified",
      "First Aid qualified"
    ]
  },

  // Home page content
  home: {
    hero: {
      title: "UNLOCK YOUR POTENTIAL",
      subtitle: "Professional football coaching that meets you where you are and takes you where you want to be.",
      primaryButton: "Start Your Journey",
      secondaryButton: "Learn More"
    },
    whyChoose: {
      title: "WHY CHOOSE ONE FOR ALL?",
      description: "At One For All Coaching, we are passionate about helping young players grow both on and off the pitch. Whether your child is just starting out or looking to develop their skills further, our programmes are built around fun, personal growth and long-term progression.",
      features: [
        {
          title: "Experienced and FA-qualified coaches",
          description: "Our team includes semi-professional players and highly trained coaches focused on grassroots development and individual player growth."
        },
        {
          title: "Tailored coaching for all ages",
          description: "From toddler football (ages 2 and up) to personalized one-to-one sessions, every programme builds confidence, skill and a lifelong love for the game."
        },
        {
          title: "Trusted by parents and clubs",
          description: "We deliver reliable sessions and holiday camps with a focus on quality, safety and a positive learning environment."
        }
      ]
    }
  },

  // Services content
  services: {
    title: "OUR COACHING SERVICES",
    subtitle: "Choose the training approach that fits your goals",
    individualCoaching: {
      title: "💪 1-2-1 Individual Program Learning",
      subtitle: "Personalised Coaching. Real Progress.",
      description: "Unlock your potential with dedicated one-to-one coaching sessions designed around your unique strengths, goals, and playing style.",
      features: [
        "Personalised Training Plans",
        "Video Analysis & Feedback", 
        "Progress Tracking",
        "Mental Conditioning"
      ],
      whoItsFor: [
        {
          title: "Ambitious Players",
          description: "Players looking to take their game to the next level with professional-standard training and personalized development."
        },
        {
          title: "Skill Development",
          description: "Players wanting to improve specific aspects of their game or overcome particular challenges in their development."
        },
        {
          title: "Confidence Building",
          description: "Players who want to build confidence, overcome mental barriers, and develop a stronger mindset for competition."
        }
      ]
    },
    groupSessions: {
      title: "👥 Group Sessions",
      subtitle: "Learn Together. Push Each Other. Grow as One.",
      description: "Small group training sessions that combine individual development with the dynamic energy of training alongside peers.",
      groupTypes: [
        {
          title: "Friends & Siblings",
          description: "Perfect for friends who want to train together or siblings looking to develop alongside each other.",
          ideal: "Ages 8-16 who know each other well"
        },
        {
          title: "Small Team Units", 
          description: "Ideal for club teams, school squads, or established groups wanting specialized additional training.",
          ideal: "Established teams seeking extra development"
        },
        {
          title: "Skill-Level Groups",
          description: "Players of similar ability levels training together to push each other's development forward.",
          ideal: "Players ready for the next level challenge"
        }
      ]
    },
    mentorship: {
      title: "🤝 Coach Mentorship",
      subtitle: "You Coach Others. We Coach You.",
      description: "Our mentorship program is designed to support, challenge, and grow coaches through regular 1-to-1 support.",
      features: [
        "Monthly check-ins and development goals",
        "Session reviews & tactical discussions", 
        "Career support and leadership development",
        "A space to reflect, improve, and stay accountable"
      ]
    }
  },

  // About page content
  about: {
    hero: {
      title: "MEET DAVE",
      description: "Your dedicated coach with the experience, qualifications, and passion to help you unlock your potential on and off the pitch."
    },
    achievements: [
      {
        title: "Player Development",
        description: "Dedicated to helping players at all levels reach their potential through personalized coaching approaches"
      },
      {
        title: "Individual Focus", 
        description: "Every session is tailored to the specific needs and goals of each player"
      },
      {
        title: "UEFA B Licensed",
        description: "Qualified with UEFA B License, bringing professional standards to every training session"
      },
      {
        title: "Grassroots Excellence",
        description: "Passionate about developing football at the grassroots level across all age groups"
      }
    ],
    philosophy: [
      {
        title: "Individual Focus",
        description: "Every player is unique with their own strengths, challenges, and goals. Our approach is tailored to bring out the best in each individual."
      },
      {
        title: "Technical Excellence", 
        description: "Building solid technical foundations while developing tactical understanding that will serve players throughout their football journey."
      },
      {
        title: "Holistic Development",
        description: "Football is a vehicle for personal growth. We focus on confidence, discipline, and life skills that extend beyond the pitch."
      }
    ]
  },

  // Contact page content
  contact: {
    hero: {
      title: "Let's Build Your Next Step Together.",
      description: "Ready to start your football journey? Get in touch and let's discuss how we can help you reach your goals."
    },
    contactInfo: {
      email: "dave@all-4one-coaching.com",
      phone: "+44 7123 456789", // Update with real phone
      availability: "Monday - Sunday, 8 AM - 8 PM"
    }
  },

  // Images and assets
  images: {
    coach: {
      main: "/attached_assets/In the dugouts_1753424086963.jpg",
      sideline: "/attached_assets/Coach dave on sidelines_1753424086964.jpg",
      celebration: "/attached_assets/3-0 goals Coach Dave_1753424086963.jpg"
    },
    coaching: {
      group: "/attached_assets/Group coaching with Dave_1753424086962.jpg",
      individual: "/attached_assets/coaching photo coach dave_1753424086969.jpg",
      youth: "/attached_assets/Tiny titans sat with Coach Dave_1753424086965.jpg"
    }
  }
};

// Helper function to get content by path
export function getContent(path: string): any {
  return path.split('.').reduce((obj: any, key: string) => obj?.[key], siteContent);
}

// Type definitions for better development experience
export type SiteContent = typeof siteContent;