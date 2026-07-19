export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string; // emoji or icon name
};

export const services: Service[] = [
  {
    id: "brand-identity",
    title: "Brand Identity & Design",
    description:
      "We craft distinctive visual identities  logos, color systems, typography, and design language  that make your brand instantly recognizable and unforgettable.",
    icon: "◈",
  },
  {
    id: "paid-marketing",
    title: "Paid Marketing & Analytics",
    description:
      "Data-driven paid media campaigns across Facebook, Instagram, and beyond. We optimize spend, track every metric, and turn ad budgets into measurable growth.",
    icon: "◇",
  },
  {
    id: "campaign-planning",
    title: "Campaign Planning & Execution",
    description:
      "End-to-end campaign strategy built around your goals  from concept and creative to launch, management, and results reporting.",
    icon: "◎",
  },
  // {
  //   id: "content-strategy",
  //   title: "Content Strategy",
  //   description: "A clear, platform-specific content roadmap that keeps your brand consistent, timely, and always relevant to your audience.",
  //   icon: "○",
  // },
  {
    id: "visual-storytelling",
    title: "Visual Storytelling",
    description:
      "Short-form reels, graphics, and photography that stop the scroll. We produce content that earns millions of views and turns viewers into customers.",
    icon: "▶",
  },
  {
    id: "social-media-management",
    title: "Social Media Management",
    description:
      "Full-service management of your social presence  content calendars, posting, community engagement, and performance monitoring across all platforms.",
    icon: "◉",
  },
  {
    id: "influencer-community",
    title: "Influencer & Community Activation",
    description:
      "Strategic influencer partnerships and community-building initiatives that extend your reach, build trust, and create authentic buzz around your brand.",
    icon: "◑",
  },
];
