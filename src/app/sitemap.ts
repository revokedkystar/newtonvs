import type { MetadataRoute } from "next";
import { business } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: business.siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${business.siteUrl}/ecu-remapping`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
