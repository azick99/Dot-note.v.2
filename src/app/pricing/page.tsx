import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PLANS } from "@/config/stripe";
import { cn } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, Check, HelpCircle, Minus } from "lucide-react";
import Link from "next/link";

const pricingItems = [
  {
    plan: "Free",
    tagline: "Perfect for trying things out.",
    quota: 10,
    features: [
      { text: "5 pages per PDF", footnote: "Maximum pages per PDF file." },
      {
        text: "4MB file size limit",
        footnote: "Maximum size of a single PDF.",
      },
      { text: "Mobile-friendly interface" },
      {
        text: "Higher-quality responses",
        footnote: "Better algorithmic responses for enhanced content quality.",
        negative: true,
      },
      { text: "Priority support", negative: true },
    ],
  },
  {
    plan: "Standard",
    tagline: "For growing projects.",
    quota: 50,
    features: [
      { text: "15 pages per PDF", footnote: "Maximum pages per PDF file." },
      {
        text: "8MB file size limit",
        footnote: "Maximum size of a single PDF.",
      },
      { text: "Mobile-friendly interface" },
      {
        text: "Higher-quality responses",
        footnote: "Better algorithmic responses for enhanced content quality.",
        negative: true,
      },
      { text: "Priority support", negative: true },
    ],
  },
  {
    plan: "Pro",
    tagline: "For teams with serious needs.",
    quota: PLANS.find((p) => p.slug === "pro")!.quota,
    features: [
      { text: "25 pages per PDF", footnote: "Maximum pages per PDF file." },
      {
        text: "16MB file size limit",
        footnote: "Maximum size of a single PDF.",
      },
      { text: "Mobile-friendly interface" },
      {
        text: "Higher-quality responses",
        footnote: "Better algorithmic responses for enhanced content quality.",
      },
      { text: "Priority support" },
    ],
  },
];

async function PricingPage() {
  const user = await currentUser();

  return (
    <MaxWidthWrapper
      as="section"
      className="mb-16 mt-24"
    >
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="mx-auto mb-14 max-w-lg text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
          Pricing
        </p>
        <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
          Simple, honest pricing
        </h1>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          Whether you&apos;re just trying out our service or need more,
          we&apos;ve got you covered.
        </p>
      </div>

      {/* ── Cards ──────────────────────────────────────────────── */}
      <TooltipProvider>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-6 items-start">
          {pricingItems.map(({ plan, tagline, quota, features }) => {
            const price =
              PLANS.find((p) => p.slug === plan.toLowerCase())?.price.amount ??
              0;
            const isPro = plan === "Pro";
            const isFree = plan === "Free";

            return (
              <div
                key={plan}
                className={cn(
                  "relative flex flex-col rounded-2xl bg-background transition-shadow duration-200 h-full",
                  isPro
                    ? "border-2 border-primary shadow-xl shadow-primary/10 ring-1 ring-primary/20"
                    : "border border-border shadow-sm hover:shadow-md",
                )}
              >
                {/* Popular badge */}
                {isPro && (
                  <div className="absolute -top-4 inset-x-0 flex justify-center">
                    <span className="rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground shadow-sm">
                      Most popular
                    </span>
                  </div>
                )}

                {/* Plan header */}
                <div className="p-7 pb-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    {plan}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {tagline}
                  </p>

                  <div className="mt-6 flex items-end gap-1">
                    <span className="text-5xl font-bold tracking-tight text-foreground">
                      {price === 0 ? "Free" : `${price} zł`}
                    </span>
                    {price > 0 && (
                      <span className="mb-1 text-sm text-muted-foreground">
                        /mo
                      </span>
                    )}
                  </div>
                  {price === 0 && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      No credit card required
                    </p>
                  )}
                </div>

                {/* Quota bar */}
                <div className="flex items-center justify-center gap-2 border-y border-border bg-muted/40 px-6 py-4 text-sm text-foreground">
                  <span className="font-medium">
                    {quota.toLocaleString()} PDFs
                  </span>
                  <span className="text-muted-foreground">per month</span>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger className="cursor-default">
                      <HelpCircle className="h-3.5 w-3.5 text-muted-foreground/60" />
                    </TooltipTrigger>
                    <TooltipContent className="w-72 p-2 text-sm">
                      How many PDFs you can upload per month.
                    </TooltipContent>
                  </Tooltip>
                </div>

                {/* Feature list */}
                <ul className="flex flex-col gap-3.5 p-7">
                  {features.map(({ text, footnote, negative }) => (
                    <li
                      key={text}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-0.5 flex-shrink-0">
                        {negative ? (
                          <Minus className="h-4 w-4 text-muted-foreground/40" />
                        ) : (
                          <Check
                            className={cn(
                              "h-4 w-4",
                              isPro ? "text-primary" : "text-primary/70",
                            )}
                          />
                        )}
                      </span>
                      <span
                        className={cn(
                          "text-sm leading-snug",
                          negative
                            ? "text-muted-foreground/50"
                            : "text-muted-foreground",
                        )}
                      >
                        {text}
                        {footnote && (
                          <Tooltip delayDuration={300}>
                            <TooltipTrigger className="cursor-default inline-flex align-middle ml-1">
                              <HelpCircle className="h-3.5 w-3.5 text-muted-foreground/40" />
                            </TooltipTrigger>
                            <TooltipContent className="w-72 p-2 text-sm">
                              {footnote}
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-auto border-t border-border p-7 pt-6">
                  <Link
                    href={
                      isFree ? (user ? "/dashboard" : "/sign-in") : "/sign-in"
                    }
                    className={cn(
                      buttonVariants({
                        variant: isPro ? "default" : "outline",
                        className: "group w-full gap-1.5",
                      }),
                    )}
                  >
                    {isFree
                      ? user
                        ? "Go to dashboard"
                        : "Get started free"
                      : user
                        ? "Upgrade now"
                        : "Get started"}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </TooltipProvider>

      {/* ── Footer note ────────────────────────────────────────── */}
      <p className="mt-12 text-center text-sm text-muted-foreground">
        All plans include a 14-day free trial. No credit card required to start.
      </p>
    </MaxWidthWrapper>
  );
}

export default PricingPage;
