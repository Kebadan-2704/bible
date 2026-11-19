import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { BackToTop } from "@/components/layout/BackToTop";
import { institutionConfig } from "@/data/config";

export const metadata: Metadata = {
  title: {
    template: `%s | ${institutionConfig.institutionName}`,
    default: `${institutionConfig.institutionName} | ${institutionConfig.tagline}`,
  },
  description:
    "An institution legally established under Christian clerical rites and traditions (Indian Trinity Church Diocese). Offering theological degrees from B.Th. to Ph.D., ministerial curriculum, and pastoral ordination.",
  keywords: [
    "Trinity International University",
    "Indian Trinity Church Diocese",
    "Bible College India",
    "Theology Degrees",
    "Bachelor of Theology",
    "Master of Divinity",
    "Doctor of Theology",
    "Christian Ministry",
    "Pastoral Ordination",
    "Bangalore Bible College",
  ],
  metadataBase: new URL("https://trinityinternationaluniversity.edu.in"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://trinityinternationaluniversity.edu.in",
    siteName: institutionConfig.institutionName,
    title: `${institutionConfig.institutionName} - A Global University for Faith, Knowledge & Service`,
    description:
      "Christian theological institution established under clerical rites and traditions. Degrees in Biblical Studies, Systematic Theology, and Christian Ministry.",
  },
  twitter: {
    card: "summary_large_image",
    title: institutionConfig.institutionName,
    description: institutionConfig.tagline,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: institutionConfig.institutionName,
    alternateName: institutionConfig.institutionNameAlt,
    description: institutionConfig.subheading,
    url: "https://trinityinternationaluniversity.edu.in",
    logo: "https://trinityinternationaluniversity.edu.in/logo.svg",
    address: {
      "@type": "PostalAddress",
      addressLocality: institutionConfig.headquarters.city,
      addressCountry: "IN",
    },
    parentOrganization: {
      "@type": "Organization",
      name: institutionConfig.diocesanAffiliation,
    },
  };

  return (
    <html lang="en">
      <head>
        <meta name="layoza-motion" content="calm" />
        <meta name="layoza-brand-allow" content="font:inter, palette:cream" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-ivory text-navy-950 font-sans antialiased flex flex-col min-h-screen selection:bg-gold-500 selection:text-navy-950">
        <ScrollProgress />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
