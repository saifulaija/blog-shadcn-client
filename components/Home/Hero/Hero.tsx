import React from 'react';
import Image from 'next/image';
import assets from '@/public';
import { Button } from '@/components/ui/button';
import { APP_NAME } from '@/lib/constants';
import Link from 'next/link';
import {SendHorizonal } from 'lucide-react';


const Hero = () => {
  return (
    <div className="relative w-full h-[480px] flex items-center justify-center">
      <Image
        src={assets.images.banner}
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0"
      />
      <div className="wrapper mx-auto px-4 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center max-w-[800px]">
          <div className=" text-center md:text-left">
            <h1 className="text-2xl md:text-5xl text-gray-500 sm:text-gray-700 font-semibold mb-4">Welcome to Our {APP_NAME}</h1>
            <p className="text-xl mb-6 text-muted-foreground">Discover the latest articles, news, and insights from our community.</p>
            <Button asChild className="group animate-in zoom-in duration-500">
              <Link href="/all_blogs" className="flex items-center gap-2">
                Explore More
                <SendHorizonal className="transition-transform duration-300 ease-in-out transform group-hover:translate-x-1" />

              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
