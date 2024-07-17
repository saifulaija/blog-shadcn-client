'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { getUserInfo } from '@/services/authServices';
import { headerItems } from '@/utils/headerItems';
import HeaderLink from './HeaderLink';
import { UserRole } from '@/types';
import AuthDropdown from '../shared/AuthDropdown/AuthDropdown';
import Image from 'next/image';
import assets from '@/public';
import { APP_NAME } from '@/lib/constants';
import { ModeToggle } from '../shared/header/ModeToggle';
import { motion } from 'framer-motion';
import NotificationDropdown from '../shared/NotificationDropdown/NotificationDropwon';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { Badge } from '../ui/badge';
import { clearStatusItems } from '@/redux/features/blog/approveSlice';
import { clearBlogItems } from '@/redux/features/blog/blogSlice';

export function Dashboard({ children }: { children: React.ReactNode }) {
  const [userRole, setUserRole] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const blogs = useAppSelector((state: RootState) => state.blog.blogItems);
  const approves = useAppSelector(
    (state: RootState) => state.approve.statusItems,
  );
  const blogLength = blogs?.length;
  const approveLength = approves?.length;

  useEffect(() => {
    const { role } = getUserInfo();
    setUserRole(role);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const sidebarItems = headerItems(userRole as UserRole);
  const dispatch = useAppDispatch();

  const handleNotificationClick = () => {
    if (userRole === 'blogger') {
      dispatch(clearStatusItems());
    } else {
      dispatch(clearBlogItems());
    }
    // Force component update
    setUserRole((prevRole) => prevRole);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <motion.header
        initial={{ y: -150 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className={`sticky top-0 flex h-16 items-center z-50 transition-shadow duration-300 justify-between gap-4 border-b  px-4 md:px-6 ${scrolled ? 'shadow-md border-b bg-background/90 backdrop-blur-lg' : 'bg-background/70 border-b'}`}
      >
        <div className="hidden sm:block">
          <Link href="/" className="flex-start">
            <Image
              src={assets.images.logo}
              width={30}
              height={30}
              alt={`${APP_NAME} logo`}
              className="rounded-lg mr-1"
            />
            {APP_NAME}
          </Link>
        </div>
        <nav className="hidden md:flex gap-5 text-lg font-medium md:text-sm">
          {sidebarItems.map((item, index) => (
            <HeaderLink key={index} item={item} />
          ))}
        </nav>
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-2 text-sm font-medium">
                {sidebarItems.map((item, index) => (
                  <HeaderLink key={index} item={item} />
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex sm:hidden">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={assets.images.logo}
              width={30}
              height={30}
              alt={`${APP_NAME} logo`}
              className="rounded-lg"
            />
            <span className="text-lg font-semibold">{APP_NAME}</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />

          <div>{userRole && <NotificationDropdown />}</div>

          <AuthDropdown />
        </div>
      </motion.header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  );
}
