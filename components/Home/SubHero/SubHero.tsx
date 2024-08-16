// SubHero.tsx
import React from 'react';

import SubHeroCard from './SubHeroCard';
import assets from '@/public';

// TData type definition
export type TData = {
  title: string;
  icon: string;
  color: string;
};

const SubHero: React.FC = () => {
  // const icon: assets.subHero.upload;
const data: TData[] = [
  {
    title: 'Explore Diverse Topics',
    icon: assets.images.explore,
    color: 'purple-500',
   
  },
  {
    title: 'Subscribe for Updates',
    icon: assets.images.subscribe,
    color: '#ff8c00',
   
  },
  {
    title: 'Community Engagement',
    icon: assets.images.community,
    color: '#00bfff',
  
  },
  

  {
    title: 'User-Friendly Interface',
    icon: assets.images.share,
    color: '#32cd32',
  },
];


  return (
    <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4 -mt-2">
      {data.map((item, index) => (
        <SubHeroCard key={index} item={item} />
      ))}
    </div>
  );
};

export default SubHero;
