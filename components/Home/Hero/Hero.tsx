// 'use client';
// import React from 'react';
// import Image from 'next/image';
// import assets from '@/public';
// import { Button } from '@/components/ui/button';
// import { APP_NAME } from '@/lib/constants';
// import Link from 'next/link';
// import { ChevronRight } from 'lucide-react';
// import { motion } from 'framer-motion';

// const Hero = () => {
//   return (
//     <motion.div
//       className="relative w-full h-[480px] flex items-center justify-center"
//       initial={{ opacity: 0, y: -50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 1 }}
//     >
//       <Image
//         src={assets.images.banner}
//         alt="Hero Background"
//         layout="fill"
//         objectFit="cover"
//         quality={100}
//         className="z-0"
//       />
//       <div className="wrapper mx-auto px-4 z-10">
//         <div className="grid grid-cols-1 md:grid-cols-2 items-center max-w-[800px]">
//           <motion.div
//             className="text-center md:text-left"
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 1, delay: 0.5 }}
//           >
//             <h1 className="text-3xl md:text-5xl text-primary font-semibold mb-4">
//               Welcome to Our {APP_NAME}
//             </h1>
//             <p className="text-xl mb-6 md:text-muted-foreground text-black">
//               Discover the latest articles, news, and insights from our
//               community.
//             </p>
//             <Button asChild className="group">
//               <Link href="/blogs" className="flex items-center gap-2">
//                 Explore More
//                 <ChevronRight className="transition-transform duration-300 ease-in-out transform group-hover:translate-x-1" />
//               </Link>
//             </Button>
//           </motion.div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default Hero;



'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';

import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import assets from '@/public';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

export function Hero() {
  const plugin = React.useRef(Autoplay({ delay: 3000 }));
  const carousel01 = assets.images.banner01;
  const carousel02 = assets.images.banner02;
  const carousel03 = assets.images.banner03;
  // const carousel04 = assets.images.banner04;
 

  const carouselImages = [
    carousel01,
    carousel02,
    carousel03,
    // carousel04,
   
  ];

  return (
    <div>
      <Carousel
        plugins={[plugin.current]}
        opts={{ align: 'start', loop: true }}
        // onMouseEnter={plugin.current.stop}
        // onMouseLeave={plugin.current.reset}
        className="w-full max-w-full"
      >
        <CarouselContent>
          {carouselImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <CardContent>
                  <Image
                    src={image}
                    width={2000}
                    height={400}
                    alt={` logo`}
                    className="rounded-md mr-1"
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

