// components/AboutUs.tsx

import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { LucideIcon, Briefcase, Users, Globe } from 'lucide-react';

const AboutUs = () => {
  return (
    <ScrollArea className="p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="mt-4 text-gray-600">
          Welcome to BloxPlex, where innovation meets creativity.
        </p>
      </div>
      <Separator />
      <div className="mt-8 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold flex items-center">
            <Briefcase className="w-6 h-6 mr-2 text-primary" />
            Our Mission
          </h2>
          <p className="mt-2 text-gray-600">
            At BloxPlex, our mission is to revolutionize the digital landscape
            by providing cutting-edge solutions that empower businesses and
            individuals alike.
          </p>
        </section>
        <Separator />
        <section>
          <h2 className="text-2xl font-semibold flex items-center">
            <Users className="w-6 h-6 mr-2 text-primary" />
            Our Team
          </h2>
          <p className="mt-2 text-gray-600">
            Our team is composed of passionate and talented professionals
            dedicated to pushing the boundaries of technology and design.
          </p>
        </section>
        <Separator />
        <section>
          <h2 className="text-2xl font-semibold flex items-center">
            <Globe className="w-6 h-6 mr-2 text-primary" />
            Our Vision
          </h2>
          <p className="mt-2 text-gray-600">
            We envision a world where technology seamlessly integrates with
            daily life, enhancing productivity, creativity, and connectivity for
            everyone.
          </p>
        </section>
      </div>
    </ScrollArea>
  );
};

export default AboutUs;
