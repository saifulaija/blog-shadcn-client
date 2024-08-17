import { Calendar, HandPlatter } from 'lucide-react';
import NewsLetterForm from './NewsLetterForm';
import Image from 'next/image';
import assets from '@/public';

export default function NewsLetter() {
  return (
    <div className="relative px-6 lg:px-8 mt-4 ">
      <div className="container mx-auto">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold  sm:text-4xl">
              Subscribe to our newsletter
            </h2>
            <p className="mt-4 text-lg  text-muted-foreground">
              Stay updated with the latest articles and discussions on BlogPlex.
              Get exclusive content, insights, and engage with our community. No
              spam, just quality content.
            </p>
            <div className="mt-6">
              <NewsLetterForm />
            </div>
          </div>
          <dl className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:gap-x-8 lg:gap-y-12">
            <div className="flex items-start space-x-4 group">
              <div className="flex-shrink-0">
                <Image
                  src={assets.images.application || '/default-category.jpg'}
                  alt={'image'}
                  width={40}
                  height={40}
                  quality={100}
                  className="group-hover:scale-90 transition-all duration-75"
                />
              </div>
              <div>
                <dt className="text-lg font-medium text-gray-900">
                  Weekly articles
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Discover new articles and discussions every week on BlogPlex.
                  Engage with a vibrant community.
                </dd>
              </div>
            </div>
            <div className="flex items-start space-x-4 group">
              <div className="flex-shrink-0">
                <Image
                  src={assets.images.spam || '/default-category.jpg'}
                  alt={'image'}
                  width={40}
                  height={40}
                  quality={100}
                  className="group-hover:scale-90 transition-all duration-75"
                />
              </div>
              <div>
                <dt className="text-lg font-medium text-gray-900">No spam</dt>
                <dd className="mt-2 text-base text-gray-500">
                  We value your privacy and time. Receive only the content you
                  love without any spam.
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}





