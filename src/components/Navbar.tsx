import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import { currentUser } from "@clerk/nextjs/server";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import NavLinks from "./NavigationLinks";

export default async function Navbar() {
  const user = await currentUser();

  return (
    <nav className="sticky inset-x-0 top-0 z-30 w-full border-b border-border bg-background/80 backdrop-blur-md backdrop-saturate-150 transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 transition-opacity hover:opacity-80"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 font-serif text-sm font-semibold text-primary-foreground shadow-sm ring-2 ring-primary/20 transition-transform group-hover:scale-95 group-hover:bg-primary ">
              N
            </span>
            <span className="text-sm font-semibold tracking-tight text-foreground">
              Dot<span className="text-muted-foreground/80"> Note</span>
            </span>
          </Link>

          {/* Nav actions */}
          <div className="flex items-center gap-1">
            {!user ? (
              <SignedOut>
                <SignInButton forceRedirectUrl="/dashboard">
                  <span
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                      className:
                        "cursor-pointer text-muted-foreground hover:text-foreground",
                    })}
                  >
                    Sign in
                  </span>
                </SignInButton>
                <SignUpButton forceRedirectUrl="/dashboard">
                  <span
                    className={buttonVariants({
                      size: "sm",
                      className: "cursor-pointer shadow-sm",
                    })}
                  >
                    Get started
                  </span>
                </SignUpButton>
              </SignedOut>
            ) : (
              <>
                {/* ← tiny client component, Navbar stays server */}
                <NavLinks />

                <div className="mx-1.5 h-4 w-px bg-border" />

                <SignedIn>
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox:
                          "h-7 w-7 ring-2 ring-border hover:ring-primary/40 transition-all rounded-full",
                      },
                    }}
                  />
                </SignedIn>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}
