'use client';

import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  TimeScale,
} from 'chart.js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetMetaQuery } from '@/redux/api/metaDataApi';
import {
  CheckCheck,
  CircleEllipsis,
  CircleOff,
  NotebookPen,
  User,
  View,
} from 'lucide-react';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  TimeScale,
);

const AdminDashboardPage = () => {
  const { data, isLoading } = useGetMetaQuery(undefined);
  console.log(data);
  const barChartData = {
    labels: data?.barChartData?.map((item: any) => new Date(item.day)) || [],
    datasets: [
      {
        label: 'Counts by Date',
        data: data?.barChartData?.map((item: any) => item.count) || [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Count',
        },
      },
    },
    responsive: true,
  } as const;

  const pieChartData = {
    labels: [
      'Admin Count',
      'Approved Blog Count',
      'Blog Count',
      'Blogger Count',
      'Cancel Blog Count',
      'Comment Count',
      'Like Count',
      'Moderator Count',
      'Pending Blog Count',
    ],
    datasets: [
      {
        label: 'Counts',
        data: [
          data?.adminCount,
          data?.approvedBlogCount,
          data?.blogCount,
          data?.bloggerCount,
          data?.cancelBlogCount,
          data?.commentCount,
          data?.likeCount,
          data?.moderatorCount,
          data?.pendingBlogCount,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(199, 199, 199, 0.6)',
          'rgba(83, 102, 255, 0.6)',
          'rgba(155, 99, 132, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(199, 199, 199, 1)',
          'rgba(83, 102, 255, 1)',
          'rgba(155, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
            <NotebookPen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.blogCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Approved Blogs
            </CardTitle>
            <CheckCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.approvedBlogCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Blogs</CardTitle>
            <CircleEllipsis className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.pendingBlogCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cancel Blogs</CardTitle>
            <CircleOff className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.cancelBlogCount}</div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 flex container flex-col md:flex-row md:gap-10">
        <div className="flex-1 mb-10 md:mb-0">
          <h2 className="text-xl font-semibold mb-3 text-center">Bar Chart</h2>
          <Bar data={barChartData} options={barChartOptions} />
        </div>

        <div className="flex-1 max-w-[450px]">
          <h2 className="text-xl font-semibold mb-3 text-center">Pie Chart</h2>
          <Pie data={pieChartData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
