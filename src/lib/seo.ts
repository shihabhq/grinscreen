import type { Metadata } from "next";
import { site } from "@/data/site";

/** Per-page metadata with canonical URL + matching Open Graph/Twitter text. */
export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const { title, description, path } = opts;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | ${site.name}`, description, url: path },
    twitter: { title: `${title} | ${site.name}`, description },
  };
}

/** Organization + WebSite structured data (JSON-LD). Only facts we actually have. */
export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${site.url}/#organization`,
      name: site.name,
      alternateName: ["Grinscreen", "GrinScreen Digital"],
      url: site.url,
      logo: `${site.url}/grinscreen/logo.png`,
      image: `${site.url}/opengraph-image.jpg`,
      description: site.description,
      email: site.contact.email,
      telephone: "+8801886189297",
      areaServed: { "@type": "Country", name: "Bangladesh" },
      knowsAbout: [
        "Digital marketing",
        "Short-form video reels",
        "Social media marketing",
        "Paid advertising",
        "Brand identity design",
        "Photography",
      ],
      sameAs: Object.values(site.socials),
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: site.contact.email,
        telephone: "+8801886189297",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      publisher: { "@id": `${site.url}/#organization` },
      inLanguage: "en",
    },
  ],
};
