export interface SocialLink {
  platform: string;
  url: string;
  iconName: string;
}

export interface StatItem {
  id: string;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel: string;
}

export interface SkillItem {
  name: string;
  level: string; // "Advanced", "Proficient", "Intermediate"
  iconName: string;
  description?: string;
  isKey?: boolean;
}

export interface SkillCategory {
  id: string;
  category: string;
  description: string;
  iconName: string;
  skills: SkillItem[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  highlights: string[];
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  isFlagship?: boolean;
  category: "Cloud/DevOps" | "DevSecOps" | "SRE/Monitoring";
  architectureFeatures?: string[];
  imagePlaceholderGradient: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: "Internship" | "Full-Time" | "Project";
  description: string[];
  technologies: string[];
  isCurrent?: boolean;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  specialization: string;
  highlights?: string[];
}

export interface PortfolioData {
  name: string;
  title: string;
  rotatingTitles: string[];
  location: string;
  pitch: string;
  bio: string[];
  availability: string;
  email: string;
  socials: SocialLink[];
  stats: StatItem[];
  skillCategories: SkillCategory[];
  projects: Project[];
  experiences: ExperienceItem[];
  education: EducationItem;
  certifications: {
    name: string;
    issuer: string;
    code: string;
    badgeUrl?: string;
    verifyUrl?: string;
    credentialUrl?: string;
    issueDate: string;
    description: string;
  }[];
}
