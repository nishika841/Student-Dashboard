import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexus | Student Cognitive Dashboard",
  description: "A premium, futuristic dark-mode student dashboard for cognitive learning and tracking. Built with Next.js, Supabase, Framer Motion, and Tailwind CSS.",
  authors: [{ name: "Pathfinder Team" }],
  keywords: ["student dashboard", "learning metrics", "Next.js", "Supabase", "Framer Motion"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-dark-bg text-slate-100 font-sans selection:bg-cyber-cyan/35 selection:text-white">
        {/* Subtle Cybernetic Grid Canvas */}
        <div className="cyber-grid" />
        
        {/* Textured SVG Grain Layer */}
        <div className="grain-overlay" />
        
        {children}
      </body>
    </html>
  );
}
