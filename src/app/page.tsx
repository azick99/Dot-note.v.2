import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, FileText, MessageSquare, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Dot Note — AI PDF Chat App",
  description:
    "Chat with your PDF documents using the power of AI. Ask questions, get instant answers — all from your browser.",
  authors: [{ name: "Azizbek", url: "https://dot-note-aziz.vercel.app/" }],
  openGraph: {
    title: "Dot Note — AI PDF Chat App",
    description:
      "Chat with your PDF documents using the power of AI. Ask questions, get instant answers — all from your browser.",
    url: "https://dot-note-aziz.vercel.app/",
    siteName: "Dot Note",
    type: "website",
    images: [
      {
        url: `https://dot-note-aziz.vercel.app/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Dot Note — Chat with your documents in seconds",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dot Note — AI PDF Chat App",
    description:
      "Chat with your PDF documents using the power of AI. Ask questions, get instant answers — all from your browser.",
    images: [`https://dot-note-aziz.vercel.app/opengraph-image`],
  },
};

export default async function Home() {
  const user = await currentUser();

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <MaxWidthWrapper className="relative flex flex-col items-center pt-14 pb-6 sm:pt-26 sm:pb-4 text-center">
        {/* Radial glow behind headline */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex justify-center"
        >
          <div className="h-[400px] w-[700px] rounded-full bg-primary/10 blur-[120px]" />
        </div>

        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 shadow-sm transition-colors hover:bg-muted/60">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          <p className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
            Now in public beta
          </p>
        </div>

        {/* Headline */}
        <h1 className="max-w-3xl text-5xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          Chat with your{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-primary">documents</span>
            {/* Underline accent */}
            <svg
              aria-hidden="true"
              viewBox="0 0 200 8"
              className="absolute -bottom-1 left-0 w-full"
              preserveAspectRatio="none"
            >
              <path
                d="M0 6 Q50 0 100 4 Q150 8 200 2"
                stroke="hsl(var(--primary))"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                opacity="0.5"
              />
            </svg>
          </span>{" "}
          in seconds
        </h1>

        {/* Subheadline — typos fixed */}
        <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg leading-relaxed">
          Upload any PDF and start a conversation instantly. Dot Note reads,
          understands, and answers questions about your file — no copy-pasting
          required.
        </p>

        {/* CTA */}
        <div className="mt-10 flex items-center gap-3">
          <div
            className={cn(
              buttonVariants({ size: "lg" }),
              "group relative shadow-md hover:shadow-lg transition-shadow",
            )}
          >
            {user ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-2"
              >
                Get started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ) : (
              <SignInButton forceRedirectUrl="/dashboard">
                <div className="flex items-center gap-2 cursor-pointer">
                  Get started
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </SignInButton>
            )}
          </div>

        </div>

        {/* Social proof hint */}
        <p className="mt-5 text-xs text-muted-foreground/60">
          Free to start · No credit card required
        </p>
      </MaxWidthWrapper>

      {/* ── Dashboard preview ───────────────────────────────────── */}
      <div className="relative isolate">
        {/* Top blob */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/688] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary/30 to-[#9089fc]/30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>

        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mt-8 flow-root sm:mt-16">
            <div className="-m-2 rounded-2xl bg-foreground/5 ring-1 ring-inset ring-foreground/10 lg:-m-4 lg:rounded-3xl lg:p-4">
              <Image
                src="/dashboard-preview.jpg"
                width={1364}
                height={866}
                quality={100}
                alt="Dot Note dashboard preview"
                className="rounded-xl bg-background shadow-2xl ring-1 ring-foreground/10"
              />
            </div>
          </div>
        </div>

        {/* Bottom blob */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[calc(100%-13rem)] -z-10 overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/688] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary/20 to-[#9089fc]/20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>

      {/* ── How it works ────────────────────────────────────────── */}
      <div className="mx-auto mb-24 mt-24 max-w-5xl px-6 sm:mt-28 lg:px-8">
        {/* Section header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            How it works
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Up and running in minutes
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Chatting with your PDFs has never been this simple.
          </p>
        </div>

        {/* Steps */}
        <ol className="grid gap-8 md:grid-cols-3 md:gap-6">
          {[
            {
              step: "01",
              icon: <FileText className="h-5 w-5 text-primary" />,
              title: "Create an account",
              body: (
                <>
                  Start free or pick a{" "}
                  <Link
                    href="/pricing"
                    className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                  >
                    pro plan
                  </Link>{" "}
                  for larger files and more conversations.
                </>
              ),
            },
            {
              step: "02",
              icon: <Zap className="h-5 w-5 text-primary" />,
              title: "Upload your PDF",
              body: "We'll process and index your file so it's ready to talk to immediately.",
            },
            {
              step: "03",
              icon: <MessageSquare className="h-5 w-5 text-primary" />,
              title: "Start asking questions",
              body: "Ask anything about the document — summaries, details, comparisons. Takes less than a minute.",
            },
          ].map(({ step, icon, title, body }) => (
            <li
              key={step}
              className="group relative flex flex-col gap-4"
            >
              {/* Top border accent */}
              <div className="h-0.5 w-full rounded-full bg-border transition-colors group-hover:bg-primary/40" />

              <div className="flex items-center gap-3 pt-1">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
                  {icon}
                </span>
                <span className="text-xs font-mono font-semibold text-muted-foreground/50 tracking-widest">
                  {step}
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg font-semibold text-foreground">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* Upload preview image */}
        <div className="mt-20 flow-root">
          <div className="-m-2 rounded-2xl bg-foreground/5 ring-1 ring-inset ring-foreground/10 lg:-m-4 lg:rounded-3xl lg:p-4">
            <Image
              src="/file-upload-preview.jpg"
              width={1419}
              height={732}
              quality={100}
              alt="PDF upload preview"
              className="rounded-xl bg-background shadow-2xl ring-1 ring-foreground/10"
            />
          </div>
        </div>
      </div>
    </>
  );
}
