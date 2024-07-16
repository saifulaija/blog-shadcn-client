'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface GlobalSearchProps {
  placeholder: string;
  onSearch: (term: string) => void;
}

export default function BookmarkSearch({
  placeholder,
  onSearch,
}: GlobalSearchProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    onSearch(term);
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="max-w-full w-full">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          placeholder={placeholder}
          className={cn(
            'w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3 rounded-xl',
          )}
          defaultValue={searchParams.get('query')?.toString()}
        />
      </div>
    </div>
  );
}
