'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetMetaQuery } from '@/redux/api/metaDataApi';
import { Book, CheckCheck, CircleEllipsis, CircleOff } from 'lucide-react';
import React from 'react';
import { BloggerDashboardChart } from './components/BloggerDashboardChart';

const BloggerDashboardPage = () => {
  const { data, isLoading } = useGetMetaQuery(undefined);

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>

            <Book className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold"> {data?.blogCount}</div>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approve Blogs</CardTitle>

            <CheckCheck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.approvedBlogCount}</div>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Blogs</CardTitle>
            {/* <CreditCard className="h-4 w-4 text-muted-foreground" /> */}
            <CircleEllipsis className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.pendingBlogCount}</div>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cancel Blogs</CardTitle>
            {/* <Activity className="h-4 w-4 text-muted-foreground" /> */}
            <CircleOff className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold"> {data?.cancelBlogCount}</div>
          </CardContent>
        </Card>
      </div>
      <BloggerDashboardChart />
    </div>
  );
};

export default BloggerDashboardPage;
