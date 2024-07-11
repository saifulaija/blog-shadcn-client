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
  Users,
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
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import GlobalSearch from '../shared/GlobalSearch/GlobalSearch';

export function TagDashboard({ children }: { children: React.ReactNode }) {
  const { data } = useGetAllBlogsQuery({});
  const blogs = data?.blogs || [];
   const [q, setQ] = useState('');

  const router=useRouter();

  const technology = blogs.filter((item) => item.category === 'Technology');
  const programming = blogs.filter((item) => item.category === 'programming');
  const travel = blogs.filter((item) => item.category === 'Travel');
  const food = blogs.filter((item) => item.category === 'Food');
  const lifestyle = blogs.filter((item) => item.category === 'Lifestyle');
  const fashion = blogs.filter((item) => item.category === 'Fashion');
  const fitness = blogs.filter((item) => item.category === 'Fitness');

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


  console.log(q);
  


  //  const handleSearch = (e:any) => {
  //   console.log(e);
    
  //    e.preventDefault();
  //    router.push(`/blogs?q=${encodeURIComponent(searchText)}`);
  //  };



  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2 fixed">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
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

              <Link
                href={`/blogs/tag/programming`}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Code className="h-5 w-5" />
                Programming
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  {programming.length}
                </Badge>
              </Link>
              <Link
                href={`/blogs/tag/Technology`}
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
              >
                <Cpu className="h-5 w-5" />
                Technology
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  {technology.length}
                </Badge>
              </Link>
              <Link
                href={`/blogs/tag/Technology`}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Bike className="h-5 w-5" />
                Travel
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  {travel.length}
                </Badge>
              </Link>
              <Link
                href={`/blogs/tag/lifestyle`}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <LifeBuoyIcon className="h-5 w-5" />
                Lifestyle
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  {lifestyle.length}
                </Badge>
              </Link>
              <Link
                href={`/blogs/tag/lifestyle`}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <CookingPot className="h-5 w-5" />
                Fashion
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  {fashion.length}
                </Badge>
              </Link>
              <Link
                href={`/blogs/tag/lifestyle`}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <CheckCheck className="h-5 w-5" />
                Fitness
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  {fitness.length}
                </Badge>
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header
          className={`flex h-14 items-center fixed top-0 left-0 md:left-[280px] right-0 z-50 gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 ${
            scrolled ? 'bg-opacity-90 border-b backdrop-blur-lg' : ''
          }`}
        >
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                  <SearchCheck className="h-4 w-4" />
                  Find by Category
                </div>
                <Separator />

                <Link
                  href={`/blogs/tag/programming`}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Code className="h-5 w-5" />
                  Programming
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    {programming.length}
                  </Badge>
                </Link>
                <Link
                  href={`/blogs/tag/Technology`}
                  className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                >
                  <Cpu className="h-5 w-5" />
                  Technology
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    {technology.length}
                  </Badge>
                </Link>
                <Link
                  href={`/blogs/tag/Technology`}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Bike className="h-5 w-5" />
                  Travel
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    {travel.length}
                  </Badge>
                </Link>
                <Link
                  href={`/blogs/tag/lifestyle`}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <LifeBuoyIcon className="h-5 w-5" />
                  Lifestyle
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    {lifestyle.length}
                  </Badge>
                </Link>
                <Link
                  href={`/blogs/tag/lifestyle`}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <CookingPot className="h-5 w-5" />
                  Fashion
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    {fashion.length}
                  </Badge>
                </Link>
                <Link
                  href={`/blogs/tag/lifestyle`}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <CheckCheck className="h-5 w-5" />
                  Fitness
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    {fitness.length}
                  </Badge>
                </Link>
              </nav>
              <div className="mt-auto">
                {/* <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card> */}
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <div className="relative">
              {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products..."
                className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
              /> */}

              <GlobalSearch placeholder='Search blog...........'/>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
