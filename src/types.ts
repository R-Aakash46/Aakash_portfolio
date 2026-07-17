export interface Skill {
  name: string;
  level: number; // 0-100
}

export interface SkillCategory {
  category: string;
  items: Skill[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
  tags: string[];
}

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  detailedHighlights: string[];
  featured?: boolean;
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  description?: string;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  longBio: string;
  email: string;
  github: string;
  linkedin: string;
  figma?: string;
  phone?: string;
  languages?: string[];
  location: string;
  skills: SkillCategory[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
}
