import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MaxWidthWrapperProps {
  className?: string;
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

const MaxWidthWrapper = ({
  className,
  children,
  as: Tag = "div",
}: MaxWidthWrapperProps) => {
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-screen-xl px-4 md:px-8 lg:px-20",
        className,
      )}
    >
      {children}
    </Tag>
  );
};

export default MaxWidthWrapper;
