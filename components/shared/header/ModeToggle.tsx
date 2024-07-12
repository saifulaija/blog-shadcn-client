'use client';

import * as React from 'react';

import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';

import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-100 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    </div>
  );
}

// 'use client';

// import * as React from 'react';

// import { useTheme } from 'next-themes';

// import { Switch } from '@/components/ui/switch';

// export function ModeToggle() {
//   const { theme, setTheme } = useTheme();

//   return (
//     <div className="flex items-center space-x-2">
//       <Switch onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
//     </div>
//   );
// }
