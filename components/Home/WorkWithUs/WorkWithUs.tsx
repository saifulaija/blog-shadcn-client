'use client';

import { Card } from '@/components/ui/card';
import assets from '@/public';
import { Users, Eye, Mail } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function WorkWithUs() {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [visitorCount, setVisitorCount] = useState(0);
  const [subscriberCount, setSubscriberCount] = useState(0);

  const [isCounting, setIsCounting] = useState(false);
  const sectionRef = useRef(null);

  // Mock function to simulate data fetching
  const fetchData = () => {
    // Replace this with actual data fetching logic
    setEmployeeCount(25); // Replace with real data
    setVisitorCount(10000); // Replace with real data
    setSubscriberCount(3000); // Replace with real data
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to handle the count-up animation
  const handleCountUp = (startValue:any, endValue:any, setValue:any) => {
    let start = startValue;
    const duration = 2000; // Duration in ms
    const increment = endValue / (duration / 16.67); // Calculate the increment per frame (approx. 60fps)

    function step() {
      start += increment;
      if (start < endValue) {
        setValue(Math.floor(start));
        requestAnimationFrame(step);
      } else {
        setValue(endValue);
      }
    }

    requestAnimationFrame(step);
  };

  useEffect(() => {
    // Intersection Observer to check if the section is in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isCounting) {
          setIsCounting(true);
          handleCountUp(0, 25, setEmployeeCount);
          handleCountUp(0, 10000, setVisitorCount);
          handleCountUp(0, 3000, setSubscriberCount);
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Cleanup observer on unmount
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isCounting]);

  return (
    <div ref={sectionRef} className="px-6 sm:px-8 lg:px-10 mb-16 -mt-5">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <h2 className="text-3xl font-bold  sm:text-4xl">
              Work with BlogPlex
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              At BlogPlex, we are committed to creating a vibrant community of
              content creators and readers. Join our team to contribute to a
              platform that reaches thousands of visitors daily, and help shape
              the future of content creation and consumption.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <Card className="flex flex-col items-center pt-4 group">
              <Image
                src={assets.images.user || '/default-category.jpg'}
                alt={'image'}
                width={40}
                height={40}
                quality={100}
                className="group-hover:scale-90 transition-all duration-75"
              />
              <h3 className="mt-4 text-2xl font-semibold ">
                {employeeCount} +
              </h3>
              <p className="mt-2 text-base text-gray-500">Total Employees</p>
            </Card>
            <Card className="flex flex-col items-center p-4 group">
              <Image
                src={assets.images.visitors || '/default-category.jpg'}
                alt={'image'}
                width={40}
                height={40}
                quality={100}
                className="group-hover:scale-90 transition-all duration-75"
              />
              <h3 className="mt-4 text-2xl font-semibold ">{visitorCount} +</h3>
              <p className="mt-2 text-base text-gray-500">Total Visitors</p>
            </Card>
            <Card className="flex flex-col items-center p-4 group">
              <Image
                src={assets.images.subscriber || '/default-category.jpg'}
                alt={'image'}
                width={40}
                height={40}
                quality={100}
                className="group-hover:scale-90 transition-all duration-75"
              />
              <h3 className="mt-4 text-2xl font-semibold ">
                {subscriberCount} +
              </h3>
              <p className="mt-2 text-base text-gray-500">Total Subscribers</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
