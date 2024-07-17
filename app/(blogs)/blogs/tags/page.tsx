// TagPageClient.tsx
'use client';
import React from 'react';
import Tag from '../components/Tag';
import { Metadata } from 'next';

const metadata: Metadata = {
  title: 'Tags-Blogs || BlogPlex',
  description: 'An BlogPlex built with Next.js, Postgres, Shadcn signin',
};

const TagPageClient = () => {
  return (
    <div>
      <Tag />
    </div>
  );
};

export default TagPageClient;
