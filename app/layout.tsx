import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Infinite Machines",
  description: "Autonomous systems building things that matter.",
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
