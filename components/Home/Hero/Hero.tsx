'use client';

import * as React from 'react';
import { CardContent } from '@/components/ui/card';

import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import assets from '@/public';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

export function Hero() {
  const plugin = React.useRef(Autoplay({ delay: 3000 }));
  const carousel01 = assets.images.banner01;
  const carousel02 = assets.images.banner02;

  const carouselImages = [carousel01, carousel02];

  return (
    <div>
      <Carousel
        plugins={[plugin.current]}
        opts={{ align: 'start', loop: true }}
        className="w-full max-w-full"
      >
        <CarouselContent>
          {carouselImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="w-full">
                <CardContent>
                  <Image
                    src={image}
                    width={0}
                    height={0}
                    sizes="100vw"
                    alt="banner"
                    placeholder="blur"
                    // className="transition-opacity opacity-0 duration-[2s]"
                    // onLoadingComplete={(image)=>image.classList.remove('opacity-0')}
                    style={{ width: '100%', height: 'auto' }}
                  />
                </CardContent>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}


