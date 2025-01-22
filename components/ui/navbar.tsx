
import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ModeToggle } from "../layout/mode-toggle";

const Navbar = () => {
return (
    <nav className="navbar">
        <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2">
            <Link
                href={"/"}
                className="text-2xl md:text-5xl font-semibold uppercase"
            >
                Mike Nguyen
            </Link>
            <div className="flex items-center gap-3 uppercase font-bold">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                        {/* Update the href to use a hash (#) pointing to the target section */}
                        <Link href="#about" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            About
                            </NavigationMenuLink>
                        </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                        {/* Update the href to use a hash (#) pointing to the target section */}
                        <Link href="#experience" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Tech Stack
                            </NavigationMenuLink>
                        </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                        {/* Update the href to use a hash (#) pointing to the target section */}
                        <Link href="#experience" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Contact
                            </NavigationMenuLink>
                        </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                <ModeToggle/>
            </div>
        </div>
    </nav>
    );
};

export default Navbar;