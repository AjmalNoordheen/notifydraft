import type { Metadata } from "next";
import "./globals.css";

// app/layout.tsx
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});


export const metadata: Metadata = {
  title: "NotiDraft",
  description: "UAE-Based Document Tracking & Automated Reminder Platform",
  icons:{
    icon: [{ url: "/notiLogo.png", type: "image/png" , sizes: "192x192"}],
    apple: "/notiLogo.png",
  },
  openGraph: { 
    title: "NotiDraft",
    description: "UAE-Based Document Tracking & Automated Reminder Platform",
    url: "https://notidraft.com",
    siteName: "NotiDraft",
    images: [
      {
        url: "https://notidraft.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "NotiDraft Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
