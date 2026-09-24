import type { Metadata, Viewport } from "next";
import { Prata, Urbanist } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import { MotionProvider } from "@/components/motion/provider";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

// Display: Prata, a heavier-stroked Didone. One weight, no italic (so nothing
// in the system may ask for display italic or bold; see font-synthesis in CSS).
const prata = Prata({
  variable: "--font-prata",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// Body: Urbanist, clean geometric sans. Variable weight.
const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap",
});

const title = "Julio Juarez — Private Dining | Kansas City";
const description =
  "Private dining in Kansas City with Chef Julio Juarez. Eighteen years leading the city's finest kitchens, brought to a single table.";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: { default: title, template: "%s | Julio Juarez" },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Julio Juarez — Private Dining",
    title,
    description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f8f6f3",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${prata.variable} ${urbanist.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
