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
    <nav className="navbar border-b-2">
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

          {/* <NavigationMenu className="uppercase font-semibold">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="#demo" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Project Demos
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu> */}

          <NavigationMenu className="uppercase font-semibold">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="#contact" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Let&apos;s Connect!
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <ModeToggle />
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="flex items-center gap-3 lg:hidden block p-2">
          <ModeToggle />
          <Menu onClick={() => setIsMenuOpen(!isMenuOpen)} />
        </div>
      </div>

      {/* Mobile Menu */}
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden block bg-gray-100 dark:bg-gray-800 px-4 py-2">
          <ul className="space-y-2 upp">
            <li>
              <div
                onClick={() => {
                  const sectionId = "about";
                  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
                  setIsMenuOpen(false); // Close the menu after selection
                }}
                className="uppercase w-full text-left text-black dark:text-white py-2 border-b-2 dark:border-gray-900 focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                About
              </div>
            </li>
            {/* <li>
              <div
                onClick={() => {
                  const sectionId = "demo";
                  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
                  setIsMenuOpen(false); // Close the menu after selection
                }}
                className="uppercase w-full text-left text-black dark:text-white py-2 border-b-2 dark:border-gray-900 focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                Project Demos
              </div>
            </li> */}
            <li>
              <button
                onClick={() => {
                  const sectionId = "contact";
                  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
                  setIsMenuOpen(false); // Close the menu after selection
                }}
                className="uppercase w-full text-left text-black dark:text-white py-1 focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                Let&apos;s Connect!
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}