"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { AlignJustify, LogOut, Package2, UserIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";
import { motion } from "framer-motion";
import assets from "@/public";
import { APP_NAME } from "@/lib/constants";
import { getUserInfo } from "@/services/authServices";
import { useToast } from "@/components/ui/use-toast";
import { logoutUser } from "@/services/actions/logoutUser";

const Header = () => {
  const pathname = usePathname();
  const { toast } = useToast();

  const user = getUserInfo();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const menuItems = [
    { label: "Home", path: "/", show: true },
    { label: "Blogs", path: "/all_blogs", show: true },
    {
      label: "Dashboard",
      path: `/dashboard/${user?.role}`,
      show: user?.role && user.role !== "subscriber",
    },
  ];

  const router = useRouter();
  const handleLogout = () => {
    logoutUser(router);
    toast({ title: "Logout", description: "User logged out successfully" });
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 h-16 ${
        scrolled ? "shadow-md border-b bg-background/90 backdrop-blur-lg" : "bg-background/70 border-b"
      }`}
    >
      <div className="container mx-auto">
        <header className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="lg:hidden">
                  <AlignJustify className="h-6 w-6" />
                  <span className="sr-only">Toggle Navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex-start">
                  <Link href="/" className="flex-start">
                    <Image
                      src={assets.images.logo}
                      width={40}
                      height={40}
                      alt={`${APP_NAME} logo`}
                      className="rounded-md"
                    />
                    {APP_NAME}
                  </Link>
                </div>
                <div className="grid gap-2 py-6">
                  {menuItems.map((menuItem) =>
                    menuItem.show ? (
                      <Link
                        href={menuItem.path}
                        key={menuItem.label}
                        className={`link ${
                          pathname === menuItem.path
                            ? "border-b-2 space-x-2 w-[60px] border-primary"
                            : ""
                        } text-foreground`}
                      >
                        {menuItem.label}
                      </Link>
                    ) : null
                  )}
                </div>
              </SheetContent>
            </Sheet>

            <motion.div
              className="hidden md:flex"
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <div className="flex-start">
                <Link href="/" className="flex-start">
                  <Image
                    src={assets.images.logo}
                    width={40}
                    height={40}
                    alt={`${APP_NAME} logo`}
                    className="rounded-md"
                  />
                  {APP_NAME}
                </Link>
              </div>
            </motion.div>
          </div>

          <nav className="hidden lg:flex gap-6">
            {menuItems.map((menuItem) =>
              menuItem.show ? (
                <Link
                  href={menuItem.path}
                  key={menuItem.label}
                  className={`group inline-flex h-9 w-max items-center rounded-md px-4 py-2 text-sm font-medium ${
                    pathname === menuItem.path ? "border-b-2 border-primary" : ""
                  } text-foreground`}
                >
                  {menuItem.label}
                </Link>
              ) : null
            )}
          </nav>

          <div className="flex items-center gap-2">
            <ModeToggle />

            {user && user.userId ? (
              <Button onClick={handleLogout} asChild className="cursor-pointer">
                <span className="flex items-center gap-2">
                  <LogOut />
                  Logout
                </span>
              </Button>
            ) : (
              <Button asChild>
                <Link href="/signin" className="flex items-center gap-2">
                  <UserIcon />
                  Sign In
                </Link>
              </Button>
            )}
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
