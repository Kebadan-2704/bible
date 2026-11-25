import type { Metadata } from "next";
import { Cinzel, Inter, Noto_Sans_Tamil } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { AnnouncementTicker } from "@/components/layout/AnnouncementTicker";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { BackToTop } from "@/components/layout/BackToTop";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import { institutionConfig } from "@/data/config";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-cinzel",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansTamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-tamil",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://trinityinternationaluniversity.edu.in";

export const metadata: Metadata = {
  title: {
    template: `%s | University of Trinity International`,
    default: `${institutionConfig.institutionName} | Theological Education`,
  },
  description:
    "Theological education legally constituted under the Christian Legal Rites and Traditions (Trinity Church of India Diocese), Regd. Indian Trusts Act, 1882.",
  keywords: [
    "University of Trinity International",
    "Trinity Church of India Diocese",
    "Theological Education India",
    "Bachelor of Theology",
    "Master of Divinity",
    "Doctor of Theology",
    "Christian Ministry",
    "YGM Bangalore Bible College",
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: institutionConfig.institutionName,
    title: `${institutionConfig.institutionName} – Faith, Knowledge & Service`,
    description:
      "Christian theological institution offering biblical studies, ministry curriculum, languages, and doctoral programmes.",
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
    description: institutionConfig.subheading,
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    email: institutionConfig.contact.admissionsEmail,
    address: {
      "@type": "PostalAddress",
      addressLocality: institutionConfig.headquarters.city,
      addressRegion: institutionConfig.headquarters.state,
      addressCountry: "IN",
    },
    parentOrganization: {
      "@type": "Organization",
      name: institutionConfig.diocesanAffiliation,
    },
  };

  const serializedJsonLd = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${inter.variable} ${notoSansTamil.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializedJsonLd }}
        />
      </head>
      <body className="bg-ivory text-navy-950 font-sans antialiased flex flex-col min-h-screen selection:bg-gold-500 selection:text-navy-950">
        <LocaleProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2.5 focus:rounded-lg focus:bg-gold-500 focus:text-navy-950 focus:font-bold focus:shadow-lg"
          >
            Skip to main content
          </a>
          <ScrollProgress />
          <Navbar />
          <AnnouncementTicker />
          <main id="main-content" className="flex-1" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <BackToTop />
        </LocaleProvider>
      </body>
    </html>
  );
}
