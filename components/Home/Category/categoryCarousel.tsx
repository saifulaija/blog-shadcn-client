'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import { cn } from '@/lib/utils';
import assets from '@/public';
import CategoryCard from './categoryCard';

// Mock data or replace with actual API data
export interface ICategories {
  title: string;
  path: string;
  icon: string;
}
export function CategoryCarousel() {
  const categories: ICategories[] = [
    {
      title: 'Programming',
      path: `/blogs/category/programming`,
      icon: assets.category.programming,
    },
    {
      title: 'Technology',
      path: `/blogs/category/technologies`,
      icon: assets.category.technology,
    },

    {
      title: 'Devops',
      path: `/blogs/category/devops`,
      icon: assets.category.deveOps,
    },
    {
      title: 'Travel',
      path: `/blogs/category/travels`,
      icon: assets.category.travel,
    },
    {
      title: 'Educations',
      path: `/blogs/category/educations`,
      icon: assets.category.education,
    },
    {
      title: 'Lifestyle',
      path: `/blogs/category/lifestyles`,
      icon: assets.category.lifeStyle,
    },
    {
      title: 'Fitness',
      path: `/blogs/category/fitness`,
      icon: assets.category.fitness,
    },
    {
      title: 'Fashions',
      path: `/blogs/category/fashions`,
      icon: assets.category.fashion,
    },
    {
      title: 'Foods',
      path: `/blogs/category/foods`,
      icon: assets.category.food,
    },
  ];

  return (
    <Carousel className="w-full max-w-sm md:max-w-7xl">
      <CarouselContent className="-ml-1">
        {categories.map((category: any, index: number) => (
          <CarouselItem
            key={index}
            className="pl-2 basis-1/2 md:basis-1/2 lg:basis-1/5"
          >
            <div className="p-2 space-x-4">
              <CategoryCard category={category} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        className={cn(
          'bg-primary  hover:bg-blue-400  text-white hover:text-gray-600',
        )}
      />
      <CarouselNext
        className={cn(
          'bg-primary  hover:bg-blue-400 text-white hover:text-gray-600',
        )}
      />
    </Carousel>
  );
}

// "use client";

// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

// import { TCategory } from "@/types/category";
// import CategoryCard from "./CategoryCard";
// import { useGetAllCategoryQuery } from "@/redux/api/features/category/categoryApi";
// import Loader from "@/components/shared/Loader";
// import { cn } from "@/lib/utils";

// // Carousel Component
// export function CategoryCarousel() {
//   const { data: categories, isLoading } = useGetAllCategoryQuery({});

//   if (isLoading) {
//     return <Loader />;
//   }

//   return (
//     <div className="container mx-auto my-8">
//       <Carousel className="w-full max-w-7xl">
//         <CarouselContent className="-ml-2 flex flex-wrap">
//           {categories.map((category: TCategory, index: number) => (
//             <CarouselItem
//               key={index}
//               className={cn(
//                 "px-2",
//                 "w-full",
//                 "sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
//               )}
//             >
//               <div className="p-2">
//                 <CategoryCard category={category} />
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white" />
//         <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white" />
//       </Carousel>
//     </div>
//   );
// }
