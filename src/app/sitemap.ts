import { MetadataRoute } from "next";
import { specialisationsList } from "@/data/specialisations";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://trinityinternationaluniversity.edu.in";

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
    "/accreditations",
    "/certificates-and-awards",
    "/vision-and-mission",
    "/contact",
    "/disclaimer",
    "/privacy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const specialisationRoutes = specialisationsList.map((spec) => ({
    url: `${baseUrl}/academics/${spec.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...specialisationRoutes];
}
