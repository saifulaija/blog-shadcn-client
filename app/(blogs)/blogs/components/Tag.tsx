'use client';

import CustomLoader from '@/components/shared/CustomLoader/CustomLoader';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useGetAllTagsQuery } from '@/redux/features/tag/tagApi';
import { TTag } from '@/types/blog';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Slash } from 'lucide-react';

const Tag = () => {
  const { data, isLoading } = useGetAllTagsQuery({});

  if (isLoading) {
    return <CustomLoader />;
  }

  return (
    <div className="my-14">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/blogs">Blogs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>tags</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-xl font-bold text-primary text-center">All Tags</h1>
      <p className="text-center text-muted-foreground mt-4">
        Explore our collection of tags to find blogs that interest you. Click on
        a tag to view all blogs associated with it.
      </p>
      <Card className="flex items-center gap-4 flex-wrap p-20 mt-6">
        {data &&
          data?.map((item: TTag, index: number) => (
            <Badge key={index} variant="secondary">
              <Link
                href={`/blog/tag/${item.name}`}
                className={cn('font-medium tracking-normal text-xl')}
              >
                #{item.name}
              </Link>
            </Badge>
          ))}
      </Card>
    </div>
  );
};

export default Tag;
