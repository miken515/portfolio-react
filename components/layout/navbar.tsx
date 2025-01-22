"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar border-b-1">
      <div className="flex items-center justify-between px-4 py-2 lg:py-4">
        {/* Logo/Name Section */}
        <Link href={"/"} className="text-2xl md:text-5xl font-semibold uppercase">
          Mike Nguyen
        </Link>

        {/* Navigation Links on Larger Screens */}
        <div className="lg:flex hidden gap-3 items-center">
          <NavigationMenu className="uppercase font-semibold">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="#about" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <NavigationMenu className="uppercase font-semibold">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="#experience" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Tech Stack
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <NavigationMenu className="uppercase font-semibold">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="#contact" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Lets Connect!
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <ModeToggle />
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="lg:hidden block p-2">
          <Menu onClick={() => setIsMenuOpen(!isMenuOpen)} />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden block bg-white px-4 py-2">
          <NavigationMenu className="uppercase font-semibold">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="#about" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <NavigationMenu className="uppercase font-semibold">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="#experience" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Tech Stack
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <NavigationMenu className="uppercase font-semibold">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="#contact" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Lets Connect!
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <ModeToggle />
        </div>
      )}
    </nav>
  );
}