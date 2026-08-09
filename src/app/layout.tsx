import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/sections/Footer";
import { MotionBackground } from "@/components/ui/MotionBackground";

export const metadata: Metadata = {
  title: "Prateek Gupta | SRE, DevOps & Cloud Engineer",
  description:
    "Portfolio of Prateek Gupta — SRE & DevOps Engineer specializing in Azure Landing Zones, Terraform IaC, DevSecOps pipelines, Prometheus telemetry, and site reliability.",
  keywords: [
    "Prateek Gupta",
    "SRE Engineer",
    "DevOps Engineer",
    "DevSecOps",
    "Azure Specialist",
    "Terraform IaC",
    "Azure Landing Zone",
    "Prometheus Monitoring",
  ],
  authors: [{ name: "Prateek Gupta", url: "https://github.com/iprateek13" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Prateek Gupta | SRE, DevOps & Cloud Engineer",
    description:
      "Architecting resilient cloud infrastructure on Azure with Terraform IaC, DevSecOps pipelines, and 99.99% reliability.",
    url: "https://github.com/iprateek13",
    siteName: "Prateek Gupta SRE Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prateek Gupta | SRE, DevOps & Cloud Engineer",
    description:
      "Architecting resilient cloud infrastructure on Azure with Terraform IaC, DevSecOps pipelines, and 99.99% reliability.",
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

          {/* Main Content Area */}
          <main className="relative z-10">{children}</main>

          {/* Footer */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
