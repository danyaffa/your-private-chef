import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


export const metadata: Metadata = {
  title: "Your Private Chef — Premium Meals Delivered",
  description:
    "Your Private Chef delivers custom chef-prepared meals to your door. Personalized meal plans, health-focused cooking, GLP-1 friendly options, high-protein meals, gourmet dining, and AI-powered meal building. Fresh, delicious, and made just for you.",
  keywords: [
    "private chef",
    "meal delivery",
    "custom meals",
    "healthy meal plans",
    "gourmet food delivery",
    "personal chef service",
    "GLP-1 meals",
    "high protein meals",
    "AI meal planner",
    "chef prepared meals",
    "diet meal delivery",
    "fresh meals delivered",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Your Private Chef — Premium Meals Delivered",
    description:
      "Custom chef-prepared meals delivered fresh to your door. Personalized meal plans, health-focused options, and AI-powered meal building.",
    type: "website",
    siteName: "Your Private Chef",
  },
};

export const viewport: Viewport = {
  themeColor: "#C8986E",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#C8986E" />
      </head>
      <body className="font-sans text-cream bg-darkBg antialiased">
        <Navbar />
        <main className="pt-24 md:pt-[104px] xl:pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
