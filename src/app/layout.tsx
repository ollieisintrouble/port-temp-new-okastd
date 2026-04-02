import NavbarWrapper from "@/components/navbar-wrapper";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import AuroraBackground from "@/components/tripled/aurora-background";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
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
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="min-h-screen font-sans antialiased"
      >
        <ThemeProvider defaultTheme="light">
          <TooltipProvider delayDuration={0}>
            <AuroraBackground>
              <div className="max-w-[1200px] mx-auto py-10 px-6 md:px-0">
                {children}
              </div>
              <NavbarWrapper />
            </AuroraBackground>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
