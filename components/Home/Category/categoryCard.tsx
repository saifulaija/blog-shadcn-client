'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ICategories } from './categoryCarousel';
interface CategoryCardProps {
  category: ICategories;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const { icon, title, path } = category;

  return (
    <Link
      href={path}
      className="block group border rounded w-56 h-auto hover:border hover:border-red-300"
    >
      <div className="overflow-hidden group transition-shadow duration-300 rounded-lg shadow-md group-hover:shadow-lg">
        <div className="flex justify-center items-center p-4">
          <Image
            src={icon || '/default-category.jpg'}
            alt={title}
            width={60}
            height={60}
            quality={100}
            className="group-hover:scale-90 transition-all duration-75"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-center ">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
