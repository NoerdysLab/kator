import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { QuizProvider } from "@/context/QuizContext";

export const metadata: Metadata = {
  title: "Kator — Know Your Ballot Before You Vote",
  description:
    "Take a 3-minute quiz to match with candidates, get plain-English ballot measure explainers, and see why every race matters. Nonpartisan.",
  metadataBase: new URL("https://katorvote.org"),
  openGraph: {
    title: "Kator — Know Your Ballot Before You Vote",
    description:
      "Match with candidates based on your values. Understand every race and measure on your ballot.",
    url: "https://katorvote.org",
    siteName: "Kator",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kator — Know Your Ballot Before You Vote",
    description:
      "Match with candidates based on your values. Understand every race and measure on your ballot.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col font-sans">
        <QuizProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </QuizProvider>
      </body>
    </html>
  );
}
