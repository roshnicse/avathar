/**
 * AVATHAR AI ACADEMY — CONFIGURATION & BRAND DATA
 * Contains confirmed business details and configurable endpoints.
 */

const AVATHAR_CONFIG = {
  brandName: "Avathar AI Academy",
  tagline: "Learn • Build • Grow",
  additionalMessage: "Real Skills. Real Projects. A Brighter Future.",
  phone: "9751205260",
  phoneFormatted: "+91 97512 05260",
  whatsappNumber: "919751205260",
  address: "31, Velammal Layout, Sengundhapuran Post, Karur, Tamil Nadu",
  mapsQuery: "31+Velammal+Layout+Sengundhapuram+Karur+Tamil+Nadu",
  
  // Backend Form Submission Endpoint (e.g. Formspree or custom AWS/Cloudflare worker)
  // Leave empty ("") if you want forms to directly generate WhatsApp submissions or notify users to configure Formspree
  formspreeEndpoint: "", // Example: "https://formspree.io/f/your_form_id"

  // 8 Course Categories
  courses: [
    {
      id: "ai-ml",
      title: "Artificial Intelligence & Machine Learning",
      category: "Artificial Intelligence",
      badge: "Flagship",
      description: "Master modern AI models, machine learning algorithms, deep learning neural networks, and applied intelligent systems.",
      topics: [
        "Artificial Intelligence",
        "Machine Learning",
        "Generative AI",
        "Deep Learning",
        "AI Applications",
        "AI Tools and Applied Projects"
      ]
    },
    {
      id: "data-science",
      title: "Data Science & Analytics",
      category: "Data & Analytics",
      badge: "High Demand",
      description: "Extract actionable intelligence from large datasets using Python, statistical modeling, data visualization, and predictive analytics.",
      topics: [
        "Data Science",
        "Python",
        "Data Analytics",
        "Business Intelligence",
        "Data Visualization",
        "Statistics",
        "Predictive Analytics"
      ]
    },
    {
      id: "cyber-security",
      title: "Cyber Security",
      category: "Security",
      badge: "Core Tech",
      description: "Build robust defensive and offensive security expertise across networks, web applications, SOC operations, and cloud security.",
      topics: [
        "Cyber Security Fundamentals",
        "Ethical Hacking",
        "Network Security",
        "Application Security",
        "Penetration Testing",
        "Security Operations Centre (SOC)",
        "Cloud Security"
      ]
    },
    {
      id: "cloud-devops",
      title: "Cloud Computing & DevOps",
      category: "Infrastructure",
      badge: "Industry Standard",
      description: "Architect scalable multi-cloud infrastructure and master continuous deployment pipelines, containerization, and modern orchestration.",
      topics: [
        "Cloud Computing",
        "AWS",
        "Azure",
        "DevOps",
        "Docker",
        "Kubernetes",
        "CI/CD",
        "Cloud Infrastructure"
      ]
    },
    {
      id: "fde",
      title: "Forward Deployed Engineer",
      category: "Engineering",
      badge: "Specialized",
      description: "Bridge the gap between advanced technology, customer problem-solving, AI-enabled engineering, and real-world system deployments.",
      topics: [
        "Technical Implementation",
        "Deployment Engineering",
        "AI-Enabled Engineering",
        "Technical Problem-Solving",
        "Real-World Technology Implementation"
      ]
    },
    {
      id: "ui-ux",
      title: "UI/UX Design",
      category: "Design",
      badge: "Creative",
      description: "Design intuitive digital products with user research, human-centered design thinking, interactive Figma prototyping, and modern design systems.",
      topics: [
        "User Interface Design",
        "User Experience Design",
        "User Research",
        "Design Thinking",
        "Interaction Design",
        "Wireframing",
        "Prototyping",
        "Figma",
        "Product Design"
      ]
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing",
      category: "Marketing",
      badge: "Growth",
      description: "Drive digital brand reach and conversion through data-driven search engine optimization, content strategy, SEM, and performance marketing.",
      topics: [
        "Digital Marketing",
        "SEO",
        "Social Media Marketing",
        "Content Marketing",
        "Performance Marketing",
        "Search Engine Marketing",
        "Digital Analytics"
      ]
    },
    {
      id: "business-analytics",
      title: "Business Analytics & Professional Skills",
      category: "Business",
      badge: "Leadership",
      description: "Translate complex business data into strategic decisions using BI reporting, analytical metrics, and essential professional workplace skills.",
      topics: [
        "Business Analytics",
        "Business Intelligence",
        "Reporting",
        "Data-Driven Decision Making",
        "Professional Skills"
      ]
    }
  ],

  // 7 Internship Domains (2026 Reference)
  internships: [
    {
      id: "web-dev",
      number: "01",
      title: "Web Development",
      description: "Build modern, responsive websites and explore frontend and website development."
    },
    {
      id: "mobile-app",
      number: "02",
      title: "Mobile App Development",
      description: "Explore mobile application development for Android and iOS."
    },
    {
      id: "ui-ux-design",
      number: "03",
      title: "UI/UX Design",
      description: "Learn user-centred design, wireframing, prototyping and digital product experiences."
    },
    {
      id: "graphic-design",
      number: "04",
      title: "Graphic Design",
      description: "Develop creative visual communication and digital design skills."
    },
    {
      id: "social-media-marketing",
      number: "05",
      title: "Social Media & Digital Marketing",
      description: "Explore social media content, SEO, online campaigns and digital brand promotion."
    },
    {
      id: "embedded-systems",
      number: "06",
      title: "Embedded Systems",
      description: "Explore microcontrollers, embedded applications, hardware concepts and Internet of Things projects."
    },
    {
      id: "vlsi-design",
      number: "07",
      title: "VLSI Design",
      description: "Learn digital design fundamentals and explore semiconductor design concepts."
    }
  ],

  /**
   * Helper to build official WhatsApp click-to-chat URL
   */
  getWhatsAppUrl: function(customMessage) {
    const defaultMsg = "Hello Avathar AI Academy, I would like to know more about your courses and internship opportunities.";
    const text = encodeURIComponent(customMessage || defaultMsg);
    return `https://wa.me/${this.whatsappNumber}?text=${text}`;
  }
};
