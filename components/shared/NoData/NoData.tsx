import { Button, buttonVariants } from '@/components/ui/button';
import assets from '@/public';
import { ReloadIcon, ResetIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';

// Enhanced NoData component
interface NoDataProps {
  buttonText?: string;
  onButtonClick?: () => void;
}

export function NoData({
  buttonText = 'Reload',
  onButtonClick = () => window.location.reload(),
}: NoDataProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
      <Image
        src={assets.images.noData}
        width={400}
        height={300}
        alt="No data"
      />
      <Link href="/blogs" className={` ${'-mt-14'} ${buttonVariants()}`}>
        <div className="flex items-center group">
          <ResetIcon className="transition-transform duration-300 ease-in-out transform group-hover:-translate-x-1 mr-2" />
          {buttonText}
        </div>
      </Link>
    </div>
  );
}
