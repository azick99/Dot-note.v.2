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
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dot Note — AI PDF Chat App",
  description:
    "Chat with your PDF documents using the power of AI. Ask questions, get instant answers — all from your browser.",
  openGraph: {
    title: "Dot Note — AI PDF Chat App",
    description: "Chat with your PDF documents using the power of AI.",
    url: "https://dot-note-aziz.vercel.app",
    siteName: "Dot Note",
    images: [
      {
        url: "https://dot-note-aziz.vercel.app/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Dot Note Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dot Note — AI PDF Chat App",
    description: "Chat with your PDF documents using the power of AI.",
    images: ["https://dot-note-aziz.vercel.app/thumbnail.png"],
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
        <Providers>
          <Head>
            <meta
              property="og:title"
              content="chat with pdf"
            />
            <meta
              property="og:description"
              content="A description of your website."
            />
            <meta
              property="og:image"
              content="https://res.cloudinary.com/djldkocgz/image/upload/v1746395958/1_ft5xsq.png"
            />
            <meta
              property="og:url"
              content="https://dot-note-aziz.vercel.app"
            />
            <meta
              name="twitter:card"
              content="summary_large_image"
            />
          </Head>
          <body
            className={cn(
              "min-h-screen font-sans antialised grainy",
              inter.className,
            )}
          >
            <Toaster />
            <Navbar />
            {children}
          </body>
        </Providers>
      </html>
    </ClerkProvider>
  );
}
