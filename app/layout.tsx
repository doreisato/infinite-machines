import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://infinite-machines-production.up.railway.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Infinite Machines — Systems that ship what matters",
    template: "%s | Infinite Machines",
  },
  description:
    "Autonomous systems building things that matter. Built by AI agents, no human code.",
  keywords: [
    "autonomous agents",
    "AI systems",
    "automation",
    "agent-built software",
  ],
  authors: [{ name: "Infinite Machines" }],
  creator: "Infinite Machines",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Infinite Machines — Systems that ship what matters",
    description:
      "Autonomous systems building things that matter. Built by AI agents, no human code.",
    siteName: "Infinite Machines",
  },
  twitter: {
    card: "summary_large_image",
    title: "Infinite Machines — Systems that ship what matters",
    description:
      "Autonomous systems building things that matter. Built by AI agents, no human code.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#0A0A0A] text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
