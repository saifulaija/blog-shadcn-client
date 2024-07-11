'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import { Separator } from '@/components/ui/separator';
import { useGetMetaQuery } from '@/redux/api/metaDataApi';

export const description = 'An interactive bar chart';

const chartConfig: any = {
  projects: {
    label: 'Projects',
    color: 'hsl(var(--chart-1))',
  },
  blogs: {
    label: 'Blogs',
    color: 'hsl(var(--chart-2))',
  },
  frontendSkills: {
    label: 'Frontend Skills',
    color: 'hsl(var(--chart-3))',
  },
  backendSkills: {
    label: 'Backend Skills',
    color: 'hsl(var(--chart-4))',
  },
  toolsSkills: {
    label: 'Tools Skills',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

export function BloggerDashboardChart() {
  const { data, isLoading } = useGetMetaQuery(undefined);
  console.log(data);

  console.log(data);

  const chartData = React.useMemo(() => {
    if (!data || isLoading) return [];

    return [
      { name: 'Blogs', value: data.blogCount },
      { name: 'ApprovedBlog', value: data.approvedBlogCount },
      { name: 'Pending Blog', value: data.pendingBlogCount },
      { name: 'Cancel Blog', value: data.cancelBlogCount },
      { name: 'Comments', value: data.commentCount },
    ];
  }, [data, isLoading]);

  return (
    <Card className="mt-10">
      <div className=""></div>
      <Separator />
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="name"
                  labelFormatter={(value) => value}
                />
              }
            />
            {Object.keys(chartConfig).map((key) => (
              <Bar
                key={key}
                dataKey="value"
                fill={chartConfig[key].color as any}
                label={{ position: 'top', formatter: (value: any) => value }}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
