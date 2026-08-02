import type { Metadata } from "next";
import { Manrope, DM_Sans } from "next/font/google";

import { env } from "@/config/env";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(env.SITE_URL),
  title: {
    default: env.SITE_NAME,
    template: `%s | ${env.SITE_NAME}`,
  },
  description:
    "Regulated Canadian and Australian immigration consultants with offices in Dubai, Abu Dhabi, Doha, Kuwait and India.",
  applicationName: env.SITE_NAME,
  openGraph: {
    siteName: env.SITE_NAME,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${dmSans.variable}`}>
      <body className="flex min-h-dvh flex-col antialiased">
        <div className="flex grow flex-col">{children}</div>
      </body>
    </html>
  );
}
