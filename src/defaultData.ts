import { PortfolioData } from "./types";

export const defaultPortfolioData: PortfolioData = {
  name: "Aakash R",
  title: "UI/UX Designer · Product Design Intern Candidate",
  bio: "UI/UX Designer and Computer Science undergraduate who builds end-to-end product experiences — from user research and wireframes to high-fidelity, developer-ready prototypes. Front-end fluency in HTML, CSS, and JavaScript means designs ship implementation-ready, not just visually complete.",
  longBio: "I am a UI/UX Designer and Computer Science undergraduate who builds end-to-end product experiences — from user research and wireframes to high-fidelity, developer-ready prototypes. By designing three independent products (PermitFlow, BillEase, CrackChamp), I address real usability gaps in emergency response, billing, and adaptive learning. My front-end fluency in HTML, CSS, and JavaScript ensures all designs ship implementation-ready, bridging the gap between elegant design and realistic execution.",
  location: "Tamil Nadu, India",
  email: "aakash.rev01@gmail.com",
  phone: "+91-8778043839",
  github: "github.com/R-Aakash46",
  linkedin: "linkedin.com/in/aakash-r-939999419",
  figma: "figma.com/@aakash_46",
  languages: ["Tamil", "English", "Telugu"],
  skills: [
    {
      category: "Design & Process",
      items: [
        { name: "User Research", level: 92 },
        { name: "Wireframing", level: 95 },
        { name: "Prototyping", level: 94 },
        { name: "Usability Testing", level: 88 },
        { name: "Information Architecture", level: 90 },
        { name: "Interaction Design", level: 88 },
        { name: "Design Systems", level: 86 },
        { name: "Visual Design", level: 90 }
      ]
    },
    {
      category: "Tools Stack",
      items: [
        { name: "Figma", level: 96 },
        { name: "Framer", level: 85 },
        { name: "Adobe Illustrator", level: 80 },
        { name: "Webflow", level: 75 },
        { name: "Miro", level: 85 }
      ]
    },
    {
      category: "Development Fluency",
      items: [
        { name: "HTML", level: 92 },
        { name: "CSS", level: 90 },
        { name: "JavaScript", level: 82 },
        { name: "MySQL", level: 78 },
        { name: "MongoDB", level: 70 },
        { name: "Git / GitHub", level: 84 }
      ]
    }
  ],
  experience: [
    {
      role: "SDC Club — Coordinator",
      company: "SDC Club",
      period: "2025 - Present",
      description: [
        "Coordinate design-related initiatives and activities for the club.",
        "Facilitate creative sessions, workshops, and manage team deliverables."
      ],
      tags: ["Figma", "Interaction Design", "Leadership", "Event Management"]
    },
    {
      role: "CSI — Executive Member",
      company: "Computer Society of India (CSI)",
      period: "2024 - 2026",
      description: [
        "Contributed to tech symposium design and promotional collateral setups.",
        "Supported layout designs and visual planning for academic technical events."
      ],
      tags: ["Figma", "Visual Design", "Adobe Illustrator", "Collaboration"]
    },
    {
      role: "NSS — Volunteer",
      company: "National Service Scheme (NSS)",
      period: "2024 - 2026",
      description: [
        "Volunteered in local community drives and social engagement initiatives.",
        "Designed promotional awareness and informational public posters."
      ],
      tags: ["Public Engagement", "Visual Design", "Teamwork"]
    }
  ],
  projects: [
    {
      title: "PermitFlow",
      subtitle: "Emergency Permission Management System",
      description: "Emergency permission requests are typically slow and hard to track, creating risk in situations where timing matters most.",
      tags: ["Figma", "User Flows", "Interaction Design", "Prototyping", "SaaS UX"],
      githubUrl: "",
      liveUrl: "https://www.figma.com/design/xPWw2ErV0c5DLQPaneK8fV/permitflow?node-id=0-1&t=pgJDasN2CejEK1YS-1",
      detailedHighlights: [
        "Problem: Emergency permission requests are typically slow and hard to track, creating risk in situations where timing matters most.",
        "Approach: Mapped the end-to-end request-and-approval journey to surface friction points, then translated the findings into user flows and wireframes built around clarity under pressure.",
        "Solution: Designed a permission management platform with an intuitive interface for submitting, tracking, and approving emergency requests in real time.",
        "Outcome: Replaced an ambiguous, hard-to-track process with a flow that gives requesters and approvers clear status visibility at every step."
      ],
      featured: true
    },
    {
      title: "BillEase",
      subtitle: "Web-Based Smart Billing System",
      description: "Small businesses often manage billing manually, which slows down invoicing and leaves customer and payment records disorganized.",
      tags: ["Dashboard UX", "Information Architecture", "Figma", "Webflow"],
      githubUrl: "",
      liveUrl: "https://www.figma.com/design/0R8U7hDKd6qJjE8mwGLyFL/billease?node-id=0-1&t=BHEHvpLpBfXrNiUx-1",
      detailedHighlights: [
        "Problem: Small businesses often manage billing manually, which slows down invoicing and leaves customer and payment records disorganized.",
        "Approach: Structured the information architecture around three core workflows — invoicing, payments, and customer management — then prototyped dashboards designed for non-technical users.",
        "Solution: Designed a responsive billing system with automated invoice generation, payment tracking, and centralized customer management.",
        "Outcome: Gives business owners a single, at-a-glance view of billing and payments, reducing the manual work of tracking invoices across scattered tools."
      ],
      featured: true
    },
    {
      title: "CrackChamp",
      subtitle: "Adaptive Learning Platform",
      description: "Students preparing for exams often rely on static mock tests that offer no personalized feedback on where they're falling behind.",
      tags: ["Interactive Prototype", "Figma", "User Onboarding", "Design Systems", "EdTech UX"],
      githubUrl: "",
      liveUrl: "https://www.figma.com/design/COjKGo32FJf1ZaVqmCGhFf/crackchamp?node-id=0-1&t=KOQScjCu3PnUllRa-1",
      detailedHighlights: [
        "Problem: Students preparing for exams often rely on static mock tests that offer no personalized feedback on where they're falling behind.",
        "Approach: Designed the onboarding-to-first-test flow to keep early friction low, then structured personalized learning paths driven by performance data.",
        "Solution: Designed a learning platform combining mock-test analytics, progress tracking, and AI-assisted recommendations to guide student practice.",
        "Outcome: Replaces one-size-fits-all test prep with an adaptive experience that points students toward exactly what to practice next."
      ],
      featured: true
    }
  ],
  education: [
    {
      degree: "Computer Science Undergraduate (B.E. CSE)",
      school: "Computer Science & Engineering Student",
      period: "2022 - 2026",
      description: "Focusing on Human-Computer Interaction, Information Systems, and Frontend Responsive UX."
    }
  ],
  certifications: [
    {
      title: "Oracle APEX Cloud Developer Certified Professional",
      issuer: "Oracle",
      date: "2025"
    },
    {
      title: "Design & Implementation of Human-Computer Interfaces",
      issuer: "NPTEL",
      date: "2024"
    },
    {
      title: "Introduction to Industry 4.0 & IIoT",
      issuer: "NPTEL",
      date: "2024"
    },
    {
      title: "Edge Computing",
      issuer: "NPTEL",
      date: "2024"
    },
    {
      title: "Affective Computing",
      issuer: "NPTEL",
      date: "2024"
    }
  ]
};
