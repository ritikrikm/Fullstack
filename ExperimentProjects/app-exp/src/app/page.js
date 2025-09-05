import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {
          /* 
          How to work with these NavigationMenu components (mainly about CSS):

          - The NavigationMenu and its subcomponents use Tailwind CSS utility classes for styling.
          - You can customize their appearance by passing a `className` prop to any component.
          - Example: <NavigationMenu className="bg-neutral-100 rounded-lg shadow-md" />
          - To override or extend styles, add your own Tailwind classes or custom CSS in globals.css.
          - The components are styled for dark mode if your Tailwind config and CSS support it.
          - For spacing, colors, and layout, use Tailwind classes like `gap-4`, `bg-accent`, `text-primary`, etc.
          - Example below shows custom classes applied to demonstrate:
*/
          <NavigationMenu className="bg-red/80 dark:bg-neutral-900/80 rounded-xl shadow-lg p-0">
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-800">
                  Features
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white dark:bg-neutral-800 rounded-lg p-4">
                  <NavigationMenuLink
                    className="block py-1 px-2 hover:bg-blue-100 dark:hover:bg-blue-700 rounded"
                    href="#"
                  >
                    Feature 1
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    className="block py-1 px-2 hover:bg-blue-100 dark:hover:bg-blue-700 rounded"
                    href="#"
                  >
                    Feature 2
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-800">
                  About
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white dark:bg-neutral-800 rounded-lg p-4">
                  <NavigationMenuLink
                    className="block py-1 px-2 hover:bg-green-100 dark:hover:bg-green-700 rounded"
                    href="#"
                  >
                    Team
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    className="block py-1 px-2 hover:bg-green-100 dark:hover:bg-green-700 rounded"
                    href="#"
                  >
                    Contact
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="text-purple-700 dark:text-purple-300 hover:underline"
                  href="#"
                >
                  Standalone Link
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        }
      </main>
    </div>
  );
}
