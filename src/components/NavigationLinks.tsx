"use client";

// This component is used in the Navbar, which is a client component, so this also needs to be a client component
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/pricing", label: "Pricing" },
  { href: "/dashboard", label: "Dashboard" },
];

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {links.map(({ href, label }) => {
        const isActive = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "relative transition-colors",
              isActive
                ? "text-foreground font-medium after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:rounded-full after:bg-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {label}
          </Link>
        );
      })}
    </>
  );
}

export default NavLinks;