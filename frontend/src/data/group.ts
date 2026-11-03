export type Company = {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  description: string;
  focus: string[];
};

/**
 * Associated companies of the NM Group of Industries and Research Foundation.
 * Content is grounded in the group's published company profiles.
 */
export const associatedCompanies: Company[] = [
  {
    slug: "nm-association",
    index: "01",
    name: "NM Association Pvt. Ltd.",
    tagline: "Startup development & business consulting",
    description:
      "Focuses on startup development, business consulting, entrepreneurship support and professional business solutions.",
    focus: [
      "Startup development",
      "Business consulting",
      "Entrepreneurship support",
      "Professional business solutions",
    ],
  },
  {
    slug: "twin-dolphin-publications",
    index: "02",
    name: "Twin Dolphin Publications Pvt. Ltd.",
    tagline: "Scholarly publishing & intellectual property",
    description:
      "Supports innovation-focused research publications, research books, scholarly publishing and patent-related documentation and support.",
    focus: [
      "Research publications",
      "Research books",
      "Scholarly publishing",
      "Patent documentation",
    ],
  },
  {
    slug: "nm-tech-intent",
    index: "03",
    name: "NM Tech Intent Pvt. Ltd.",
    tagline: "Technology awareness & academic programs",
    description:
      "Promotes technology awareness through conferences, workshops, internships, mentorship and educational programs for students and researchers.",
    focus: [
      "Conferences",
      "Workshops",
      "Internships",
      "Mentorship",
      "Educational programs",
    ],
  },
  {
    slug: "nm-drone-tech",
    index: "04",
    name: "NM Drone Tech Pvt. Ltd.",
    tagline: "Drone technology & sustainable agriculture",
    description:
      "Focuses on drone technology applications, sustainable agriculture, precision farming, crop protection and environmentally responsible agricultural solutions.",
    focus: [
      "Drone technology",
      "Sustainable agriculture",
      "Precision farming",
      "Crop protection",
    ],
  },
  {
    slug: "clyra",
    index: "05",
    name: "Clyra",
    tagline: "Healthcare & pharmaceutical innovation",
    description:
      "A healthcare and pharmaceutical innovation initiative focused on patient-oriented services, medical and laboratory collaboration, and research into potential new therapeutic approaches.",
    focus: [
      "Patient-oriented services",
      "Medical & laboratory collaboration",
      "Therapeutic research",
      "Pharmaceutical innovation",
    ],
  },
];

export type ValueItem = {
  title: string;
  description: string;
};

export const coreValues: ValueItem[] = [
  {
    title: "Innovation",
    description: "Encouraging new ideas and practical solutions.",
  },
  {
    title: "Integrity",
    description: "Promoting responsible and ethical research practices.",
  },
  {
    title: "Excellence",
    description: "Maintaining professional and scientific standards.",
  },
  {
    title: "Collaboration",
    description:
      "Building strong institutional and international partnerships.",
  },
];

export type KnowledgePillar = {
  title: string;
  description: string;
  tags: string[];
};

export const knowledgePillars: KnowledgePillar[] = [
  {
    title: "Research Publishing",
    description:
      "Supporting scholarly communication through research books, academic publications, conference proceedings and scientific knowledge-sharing initiatives.",
    tags: ["Research books", "Academic publications", "Conference proceedings"],
  },
  {
    title: "Innovation & Intellectual Property",
    description:
      "Supporting innovation documentation, patent-related guidance, intellectual property awareness and connections with appropriate professional services.",
    tags: ["Innovation documentation", "Patent guidance", "IP awareness"],
  },
];

export type CollaborationTrack = {
  title: string;
  description: string;
};

export const collaborationTracks: CollaborationTrack[] = [
  {
    title: "Academic Partnerships",
    description:
      "Joint academic programs and institutional research initiatives.",
  },
  {
    title: "Research Projects",
    description:
      "Collaborative projects across science, technology and healthcare.",
  },
  {
    title: "Industry Partnerships",
    description:
      "Industry-academia connections and technology development.",
  },
  {
    title: "International Networks",
    description:
      "Knowledge exchange and cross-border research opportunities.",
  },
];

export type Program = {
  title: string;
  description: string;
};

export const programs: Program[] = [
  {
    title: "Internships",
    description:
      "Practical exposure and supervised learning opportunities for eligible students.",
  },
  {
    title: "Research Mentorship",
    description:
      "Guidance in research planning, methodology and scientific communication.",
  },
  {
    title: "Workshops & Conferences",
    description:
      "Knowledge-sharing events, training programs and professional development.",
  },
  {
    title: "Innovation Programs",
    description:
      "Hackathons, idea development and entrepreneurship initiatives.",
  },
];

export const careerOpportunities: string[] = [
  "Research and Scientific Professionals",
  "Technology and Engineering Professionals",
  "Business Development Professionals",
  "Startup and Project Management Roles",
  "Leadership and Specialist Positions",
];

export const internshipOpportunities: string[] = [
  "Science and Chemistry",
  "Biotechnology and Pharmacy",
  "Medical and Healthcare Technology",
  "Engineering and Drone Technology",
  "Research, Publications and Business",
];

export const newsUpdate = {
  intro:
    "Updates on research initiatives, institutional collaborations, conferences, internships, recruitment and innovation programs will be published here.",
  channels: [
    "Research initiatives",
    "Institutional collaborations",
    "Conferences & workshops",
    "Internships & recruitment",
  ],
};
