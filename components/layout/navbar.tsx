"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#hobbies", label: "Off the Clock" },
  { href: "#contact", label: "Let's Connect!" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar border-b border-border/60 bg-card/75 backdrop-blur-md">
      <div className="flex items-center justify-between px-4 py-2 lg:py-4">
        <Link href="/" className="font-display text-2xl font-black md:text-3xl">
          Mike Nguyen
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(navigationMenuTriggerStyle(), "rounded-full bg-transparent font-bold hover:bg-secondary")}
            >
              {l.label}
            </Link>
          ))}
          <ModeToggle />
        </div>

        <div className="flex items-center gap-3 p-2 lg:hidden">
          <ModeToggle />
          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((o) => !o)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <ul className="space-y-1 border-t bg-card/95 px-4 py-2 lg:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setIsMenuOpen(false)}
                className="block border-b py-2 font-bold last:border-b-0"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
