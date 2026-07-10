export type StaticProject = {
  id: string;
  title: string;
  client?: string;
  images: string[];   // paths to /statics/
};

export const staticProjects: StaticProject[] = [
  {
    id: "artboard",
    title: "Artboard Series",
    images: [
      "/statics/artboard-1v1.webp",
      "/statics/artboard-2v1.webp",
      "/statics/artboard-3v1.webp",
      "/statics/artboard-4v1.webp",
    ],
  },
  {
    id: "wooking",
    title: "Wooking",
    client: "Wooking",
    images: [
      "/statics/wooking.webp",
      "/statics/wooking-2.webp",
      "/statics/wooking-3.webp",
      "/statics/wooking-4.webp",
    ],
  },
  {
    id: "cnb",
    title: "CNB",
    client: "CNB",
    images: ["/statics/cnb1.webp"],
  },
  {
    id: "the-bowl",
    title: "The Bowl",
    client: "The Bowl",
    images: ["/statics/the-bowl.webp"],
  },
];
