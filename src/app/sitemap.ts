import { MetadataRoute } from "next";
import { specialisationsList } from "@/data/specialisations";

const LAST_VERIFIED_RELEASE = new Date("2026-11-25T00:00:00Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://trinityinternationaluniversity.edu.in";

  const staticRoutes = [
    "",
    "/about",
    "/governance",
    "/centres",
    "/academics",
    "/curriculum",
    "/research",
    "/doctoral",
    "/affiliations",
    "/admissions",
    "/prospectus",
    "/accreditations",
    "/certificates-and-awards",
    "/vision-and-mission",
    "/contact",
    "/disclaimer",
    "/privacy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: LAST_VERIFIED_RELEASE,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const specialisationRoutes = specialisationsList.map((spec) => ({
    url: `${baseUrl}/academics/${spec.slug}`,
    lastModified: LAST_VERIFIED_RELEASE,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...specialisationRoutes];
}
