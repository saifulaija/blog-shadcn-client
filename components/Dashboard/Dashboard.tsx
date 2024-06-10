'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Search, CircleUser, Package2, Bell } from 'lucide-react';

import { getUserInfo } from '@/services/authServices';
import { headerItems } from '@/utils/headerItems';
import HeaderLink from './HeaderLink';
import { UserRole } from '@/types';
import AuthDropdown from '../shared/AuthDropdown/AuthDropdown';
import Image from 'next/image';
import assets from '@/public';
import { APP_NAME } from '@/lib/constants';

export function Dashboard({ children }: { children: React.ReactNode }) {
  const [userRole, setUserRole] = useState("");



  useEffect(() => {
    const { role } = getUserInfo();
    setUserRole(role);
  }, []);
 

  const sidebarItems = headerItems(userRole as UserRole);
  
  return (
   
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky  top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5  md:text-sm lg:gap-6">
        <div className="flex-start">
                <Link href="/" className="flex-start">
                  <Image
                    src={assets.images.logo}
                    width={30}
                    height={30}
                    alt={`${APP_NAME} logo`}
                    className="rounded-lg"
                  />
                  {APP_NAME}
                </Link>
              </div>
          {sidebarItems.map((item, index) => (
                <HeaderLink key={index} item={item} />
              ))}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
          {/* <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link> */}
            <nav className="grid gap-2 text-sm font-sm">
            {sidebarItems.map((item, index) => (
                <HeaderLink key={index} item={item} />
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        
        <div className="flex w-full justify-center sm:hidden">
        <div className="flex-start">
                <Link href="/" className="flex-start">
                  <Image
                    src={assets.images.logo}
                    width={30}
                    height={30}
                    alt={`${APP_NAME} logo`}
                    className="rounded-lg"
                  />
                  {APP_NAME}
                </Link>
              </div>
          </div>
          <Bell className="ml-auto  sm:flex-initial" />
         <AuthDropdown/>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  );
}


