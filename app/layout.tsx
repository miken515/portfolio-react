import type { Metadata } from "next";
import { Klee_One, Nunito, Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { WorldBackground } from "@/components/layout/world-background";
import { ThemeProvider } from "@/components/theme-provider";

const display = Zen_Maru_Gothic({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  variable: "--font-display",
  display: "swap",
});
const body = Nunito({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const hand = Klee_One({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-hand", display: "swap" });

export const metadata: Metadata = {
  title: "Mike Nguyen · Software Engineer",
  description:
    "Mike Nguyen is a full-stack software engineer in Des Moines, Iowa, building event-driven AWS services and React frontends.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${body.variable} ${hand.variable} grain overflow-x-hidden antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <WorldBackground />
          <Navbar />
          <ScrollProgress />
          <main className="container mx-auto mt-10 px-5 py-4 sm:mt-24">{children}</main>
          <footer className="container mx-auto px-5 pb-10 pt-4">
            <p className="paper mx-auto w-fit px-6 py-3 text-center font-hand text-sm text-muted-foreground">
              © {new Date().getFullYear()} Mike Nguyen · painted with Next.js, Tailwind &amp; Three.js
            </p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
