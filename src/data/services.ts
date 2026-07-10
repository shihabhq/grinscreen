export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string; // emoji or icon name
};

export const services: Service[] = [
  {
    id: "reel-making",
    title: "Reel Making",
    description: "Short-form 9:16 video crafted to go viral. We concept, shoot, edit, and deliver reels that rack up millions of views.",
    icon: "▶",
  },
  {
    id: "static-design",
    title: "Static Design",
    description: "Scroll-stopping social creatives that make your brand impossible to ignore in a crowded feed.",
    icon: "◈",
  },
  {
    id: "social-campaigns",
    title: "Social Media Campaigns",
    description: "End-to-end campaign strategy and execution across all major platforms — from brief to results.",
    icon: "◎",
  },
  {
    id: "ad-services",
    title: "Ad Services",
    description: "Paid media and performance ads that put your brand in front of the right people at the right moment.",
    icon: "◇",
  },
  {
    id: "photoshoots",
    title: "Photoshoots",
    description: "Product, food, and brand photography that makes everything look as good as it tastes — or better.",
    icon: "◉",
  },
  {
    id: "360-support",
    title: "360° Support",
    description: "Full-service brand management: positioning, content calendars, community management, and everything in between.",
    icon: "○",
  },
];
