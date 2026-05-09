import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import "./global.css";
import "react-loading-skeleton/dist/skeleton.css";
import "simplebar-react/dist/simplebar.min.css";
import Providers from "@/components/Provider";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

const BASE_URL = "https://dot-note-aziz.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Dot Note — AI PDF Chat App",
  description:
    "Chat with your PDF documents using the power of AI. Ask questions, get instant answers — all from your browser.",
  openGraph: {
    title: "Dot Note — AI PDF Chat App",
    description:
      "Chat with your PDF documents using the power of AI. Ask questions, get instant answers.",
    url: BASE_URL,
    siteName: "Dot Note",
    images: [
      {
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Dot Note — Chat with your documents in seconds",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dot Note — AI PDF Chat App",
    description:
      "Chat with your PDF documents using the power of AI. Ask questions, get instant answers.",
    images: [`${BASE_URL}/opengraph-image`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className="light"
      >
        <body
          className={cn(
            "min-h-screen font-sans antialiased grainy",
            inter.className,
          )}
        >
          <Providers>
            <Toaster />
            <Navbar />
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
