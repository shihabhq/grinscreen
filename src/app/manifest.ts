import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "GrinScreen",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0A0B0A",
    theme_color: "#0A0B0A",
    icons: [{ src: "/grinscreen/logo.png", sizes: "1000x1000", type: "image/png" }],
  };
}
