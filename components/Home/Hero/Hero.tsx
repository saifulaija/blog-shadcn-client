'use client'
import React from 'react';
import Image from 'next/image';
import assets from '@/public';
import { Button } from '@/components/ui/button';
import { APP_NAME } from '@/lib/constants';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <motion.div
      className="relative w-full h-[480px] flex items-center justify-center"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
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
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1 className="text-3xl md:text-5xl text-primary font-semibold mb-4">
              Welcome to Our {APP_NAME}
            </h1>
            <p className="text-xl mb-6 md:text-muted-foreground text-black">
              Discover the latest articles, news, and insights from our
              community.
            </p>
            <Button asChild className="group">
              <Link href="/blogs" className="flex items-center gap-2">
                Explore More
                <ChevronRight className="transition-transform duration-300 ease-in-out transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;


