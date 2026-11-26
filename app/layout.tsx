import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
      <body className={`${geistSans.variable} ${geistMono.variable} overflow-x-hidden antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          <main className="container mx-auto mt-10 px-5 py-4 sm:mt-24">{children}</main>
          <footer className="container mx-auto px-5 py-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Mike Nguyen · Built with Next.js, Tailwind &amp; Three.js
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
