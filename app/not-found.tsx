// pages/404.tsx
import Link from 'next/link';

import { HomeIcon, StickyNote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Custom404 = () => {
  return (
    <div className="flex-center">
      <div className="min-h-screen flex flex-col  items-center justify-center max-w-md  text-center p-4">
        <StickyNote className="w-16 h-16 text-muted mb-4" />
        <h1 className="text-6xl font-bold text-gray-600 mb-4">404</h1>
        <h2 className="text-2xl font-medium text-gray-600 mb-6">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-500 mb-6 text-balance">
          But if you don&apos;t change your direction, and if you keep looking,
          you may end up where you are heading.
        </p>
        <Link href="/">
          <Button
            variant="outline"
            size="sm"
            className=" text-white flex items-center"
          >
            <HomeIcon className="w-5 h-5 mr-2" />
            Take Me Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
