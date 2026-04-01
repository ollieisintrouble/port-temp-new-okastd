"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "@/components/theme-provider";

export const ModeToggle = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof Button>>(
  ({ onClick, ...restProps }, ref) => {
    const { theme, setTheme } = useTheme();

    return (
      <Button
        ref={ref}
        variant="ghost"
        type="button"
        size="icon"
        className="px-2 cursor-pointer dark:text-neutral-200"
        {...restProps}
        onClick={(e) => {
          setTheme(theme === "dark" ? "light" : "dark");
          onClick?.(e);
        }}
      >
        {theme === "dark" ? (
          <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <SunIcon className="h-[1.2rem] w-[1.2rem]" />
        )}
      </Button>
    );
  }
);
ModeToggle.displayName = "ModeToggle";
