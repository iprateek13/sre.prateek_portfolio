import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/sections/Footer";
import { MotionBackground } from "@/components/ui/MotionBackground";
import { FloatingContactWidget } from "@/components/ui/FloatingContactWidget";

export const metadata: Metadata = {
  metadataBase: new URL("https://sre-prateek-portfolio.vercel.app"),
  title: "Prateek Gupta | SRE, DevOps & Cloud Architect",
  description:
    "Portfolio of Prateek Gupta — Site Reliability & DevOps Specialist. Multi-Cloud Azure & AWS Landing Zones, 15+ Terraform IaC Child Modules, DevSecOps pipelines, and 99.99% SLA reliability.",
  keywords: [
    "Prateek Gupta",
    "SRE Engineer",
    "DevOps Engineer",
    "Cloud Architect",
    "Azure Specialist",
    "Multi-Cloud AWS & Azure",
    "Terraform IaC",
    "Azure Landing Zone",
    "DevSecOps Pipelines",
    "Prometheus Monitoring",
  ],
  authors: [{ name: "Prateek Gupta", url: "https://github.com/iprateek13" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Prateek Gupta | SRE, DevOps & Cloud Architect",
    description:
      "Enterprise Site Reliability & DevOps Specialist. Multi-Cloud Azure & AWS Landing Zones, 15+ Child Modules, Terraform IaC, DevSecOps Pipelines, and 99.99% SLA Reliability.",
    url: "https://sre-prateek-portfolio.vercel.app",
    siteName: "Prateek Gupta SRE Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/favicon.svg",
        width: 1200,
        height: 630,
        alt: "Prateek Gupta - SRE & Cloud Architecture Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prateek Gupta | SRE, DevOps & Cloud Architect",
    description:
      "Enterprise Site Reliability & DevOps Specialist. Multi-Cloud Azure & AWS Landing Zones, 15+ Child Modules, Terraform IaC, DevSecOps Pipelines, and 99.99% SLA Reliability.",
    images: ["/favicon.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-cream-100 dark:bg-dark-950 text-dark-900 dark:text-cream-300 antialiased font-body min-h-screen selection:bg-azure-500 selection:text-white relative">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {/* Animated Digital Infrastructure Motion Background */}
          <MotionBackground />

          {/* Global Noise Grain Texture Overlay */}
          <div className="fixed inset-0 bg-noise pointer-events-none z-50 opacity-30" />

          {/* Header Navbar */}
          <Navbar />

          {/* Main Page Content */}
          <main className="relative z-10">{children}</main>

          {/* Floating Speed Dial Contact Widget */}
          <FloatingContactWidget />

          {/* Footer */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
