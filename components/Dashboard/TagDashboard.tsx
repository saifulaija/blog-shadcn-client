'use client';
import Link from 'next/link';
import {
  Bell,
  Bike,
  CheckCheck,
  CircleUser,
  Code,
  CookingPot,
  Cpu,
  Globe,
  GraduationCapIcon,
  Home,
  LifeBuoy,
  LifeBuoyIcon,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  SearchCheck,
  ShoppingCart,
  Soup,
  Users,
  LucideHome,
  Book,
  BookMarkedIcon,
  Tag,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import assets from '@/public';
import Image from 'next/image';
import { APP_NAME } from '@/lib/constants';
import { useGetAllBlogsQuery } from '@/redux/features/blog/blogApi';
import { Separator } from '../ui/separator';
import { ComponentType, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import GlobalSearch from '../shared/GlobalSearch/GlobalSearch';
import AuthButton from '../shared/AuthButton/AuthButton';
import { getUserInfo } from '@/services/authServices';
import {
  GlobeIcon,
  HamburgerMenuIcon,
  PersonIcon,
  TextAlignCenterIcon,
} from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function TagDashboard({ children }: { children: React.ReactNode }) {
  const user = getUserInfo();
  const pathname = usePathname();

  const menuItems = [
    {
      label: 'Dashboard',
      path: `/dashboard/${user?.role}`,
      show: user?.role && user.role !== 'subscriber',
    },
  ];
  const { data } = useGetAllBlogsQuery({});
  const blogs = data?.blogs || [];
  const [q, setQ] = useState('');

  const technology = blogs.filter((item) => item.category === 'technologies');
  const programming = blogs.filter((item) => item.category === 'programming');
  const travel = blogs.filter((item) => item.category === 'travels');
  const food = blogs.filter((item) => item.category === 'foods');
  const educations = blogs.filter((item) => item.category === 'educations');
  const lifestyle = blogs.filter((item) => item.category === 'lifestyles');
  const fashion = blogs.filter((item) => item.category === 'fashions');
  const fitness = blogs.filter((item) => item.category === 'fitness');
  const devops = blogs.filter((item) => item.category === 'devops');

  interface IMenuItem {
    title: string;
    path: string;
    icon: ComponentType<React.SVGProps<SVGSVGElement>>;
    count: number;
  }

  const sideMenu: IMenuItem[] = [
    {
      title: 'Programming',
      path: `/blogs/category/programming`,
      icon: Code,
      count: programming.length,
    },
    {
      title: 'Technology',
      path: `/blogs/category/technologies`,
      icon: Cpu,
      count: technology.length,
    },

    {
      title: 'Devops',
      path: `/blogs/category/devops`,
      icon: Globe,
      count: devops.length,
    },
    {
      title: 'Travel',
      path: `/blogs/category/travels`,
      icon: Bike,
      count: travel.length,
    },
    {
      title: 'Educations',
      path: `/blogs/category/educations`,
      icon: GraduationCapIcon,
      count: educations.length,
    },
    {
      title: 'Lifestyle',
      path: `/blogs/category/lifestyles`,
      icon: LifeBuoy,
      count: lifestyle.length,
    },
    {
      title: 'Fitness',
      path: `/blogs/category/fitness`,
      icon: CheckCheck,
      count: fitness.length,
    },
    {
      title: 'Fashions',
      path: `/blogs/category/fashions`,
      icon: CheckCheck,
      count: fashion.length,
    },
    {
      title: 'Foods',
      path: `/blogs/category/foods`,
      icon: Soup,
      count: food.length,
    },
  ];

  const headerMenu = [
    {
      title: 'Home',
      path: `/`,
      icon: LucideHome,
    },
    {
      title: 'Bookmark',
      path: `/blogs/bookmarks`,
      icon: BookMarkedIcon,
    },
    {
      title: 'Tags',
      path: `/blogs/tags`,
      icon: Tag,
    },
    {
      title: 'Blogs',
      path: `/blogs`,
      icon: Book,
    },
  ];

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2 fixed">
          <div className="flex h-14 items-center border-b p-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image
                src={assets.images.logo}
                width={40}
                height={40}
                alt={`${APP_NAME} logo`}
                className="rounded-md mr-1"
              />
              {APP_NAME}
            </Link>
            <Button variant="link" size="icon" className="ml-auto h-8 w-8">
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-md font-medium lg:px-4">
              <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                <SearchCheck className="h-4 w-4" />
                Find by Category
              </div>
              <Separator />

              {sideMenu.map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    pathname === item.path &&
                      'text-primary bg-muted border-r-4 border-r-primary',
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    {item.count}
                  </Badge>
                </Link>
              ))}
            </nav>
            <Separator />
            <div className="mb-auto p-4 ">
              {headerMenu.map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    pathname === item.path &&
                      'text-primary bg-muted border-r-4 border-r-primary',
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <motion.header
          initial={{ y: -150 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className={`flex justify-between h-14 items-center fixed top-0 left-0 md:left-[280px] right-0 z-50 gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 ${
            scrolled ? 'bg-opacity-90 border-b backdrop-blur-xl' : ''
          }`}
        >
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <TextAlignCenterIcon className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="flex flex-col overflow-y-auto max-h-full"
            >
              <nav className="grid gap-2 text-lg font-medium">
                <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                  <SearchCheck className="h-4 w-4" />
                  Find by Category
                </div>
                <Separator />
                <GlobalSearch placeholder="Search blogs....." />
                {sideMenu.map((item, index) => (
                  <Link
                    key={index}
                    href={item.path}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                      pathname === item.path &&
                        'text-primary bg-muted border-r-4 border-r-primary',
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.title}
                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                      {item.count}
                    </Badge>
                  </Link>
                ))}
              </nav>
              <div className="mt-auto">
                {headerMenu.map((item, index) => (
                  <Link
                    key={index}
                    href={item.path}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                      pathname === item.path &&
                        'text-primary bg-muted border-r-4 border-r-primary',
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.title}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          <div className="hidden md:block flex-1">
            <GlobalSearch placeholder="Search blog..........." />
          </div>
          <div className="flex items-center gap-2   md:block">
            {menuItems.map((menuItem) =>
              menuItem.show ? (
                <Link
                  href={menuItem.path}
                  key={menuItem.label}
                  className={`link ${
                    pathname === menuItem.path
                      ? 'bg-muted text-primary  rounded-sm px-3 py-2 transition-all'
                      : ''
                  } text-foreground`}
                >
                  {menuItem.label}
                </Link>
              ) : null,
            )}
          </div>

          <AuthButton />
        </motion.header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
