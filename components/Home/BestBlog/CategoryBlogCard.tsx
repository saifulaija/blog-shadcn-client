'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaFacebook, FaWhatsapp, FaLinkedin } from 'react-icons/fa';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { MyAvatar } from '@/components/shadcn/MyAvatar';

import { truncateTitle } from '@/utils/truncateTitle';
import { Button } from '@/components/ui/button';
import { Bookmark, BookmarkCheck, ArrowBigUp, Clipboard } from 'lucide-react';

import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { motion } from 'framer-motion';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { formateDate } from '@/utils/common';
import { useCountBlogVoteMutation } from '@/redux/features/blog/blogApi';
import { IBlog } from '@/types/blog';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const CategoryBlogCard = ({ blog }: { blog: IBlog }) => {
  const [voteCountNumber, { isLoading, isError }] = useCountBlogVoteMutation();
  const { toast } = useToast();
  const router = useRouter();
  const truncatedTitle = truncateTitle(blog?.title, 30);
  const currentUrl = `https://blogplex.vercel.app/blogs/details/${blog?.id}`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${blog?.title} - ${currentUrl}`)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?display=page&u=${encodeURIComponent(currentUrl)}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isUpvoted, setIsUpvoted] = useState(false);

  useEffect(() => {
    setIsBookmarked(localStorage.getItem(`bookmark-${blog?.id}`) === 'true');
    setIsUpvoted(localStorage.getItem(`vote-${blog?.id}`) === 'upvote');
  }, [blog?.id]);

  const handleDetails = () => {
    router.push(`/blogs/details/${blog?.id}`);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newValue = !isBookmarked;
    setIsBookmarked(newValue);
    localStorage.setItem(`bookmark-${blog?.id}`, newValue.toString());
    toast({
      variant: 'destructive',
      title: 'Success',
      description: newValue ? 'Blog bookmarked!' : 'Bookmark removed!',
      action: <ToastAction altText="Undo">Undo</ToastAction>,
    });
  };

  const handleVote = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const newValue = !isUpvoted;
    setIsUpvoted(newValue);
    const action = newValue ? 'upvote' : 'downvote';

    try {
      const response = await voteCountNumber({ id: blog?.id, action }).unwrap();
      localStorage.setItem(`vote-${blog?.id}`, newValue ? 'upvote' : '');
    } catch (error) {
      console.error('Error updating vote count:', error);
    }
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(currentUrl);
    toast({
      variant: 'destructive',
      title: 'Success',
      description: 'Link copied to clipboard!',
      action: <ToastAction altText="Undo">Undo</ToastAction>,
    });
  };
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Card
      onClick={handleDetails}
      // className={cn(
      //   'hover:shadow-lg border border-green-500 hover:shadow-slate-400 max-w-md w-full hover:border hover:cursor-pointer transition duration-300 ',
      // )}

      className={cn(
        'hover:shadow-lg  hover:shadow-slate-400 max-w-md w-full hover:cursor-pointer transition duration-300 ',
      )}
    >
      <CardHeader className="p-0 items-center">
        <div className="relative w-full" style={{ height: '200px' }}>
          <Image
            src={blog?.image || '/placeholder-image.jpg'}
            alt="Blog Image"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="rounded-t-md"
          />
        </div>
      </CardHeader>
      <div className="flex justify-between items-center p-1">
        <div className="flex items-center gap-2">
          <MyAvatar
            url={blog?.author?.profilePhoto || '/photo'}
            alt={blog?.author?.name || 'author'}
          />
          <p className="text-sm font-medium">{blog?.author?.name}</p>
        </div>
        <p className="text-sm">{formateDate(blog?.createdAt)}</p>
      </div>
      <Separator />
      <CardContent className="p-2">
        <p className="text-lg font-semibold">{truncatedTitle}</p>
      </CardContent>
      <CardFooter className={cn('flex justify-between items-center p-2 mb-0')}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={whatsappShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-800"
                onClick={(e) => e.stopPropagation()}
              >
                <FaWhatsapp className="w-5 h-5" />
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={facebookShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
                onClick={(e) => e.stopPropagation()}
              >
                <FaFacebook className="w-5 h-5" />
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={linkedinShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
                onClick={(e) => e.stopPropagation()}
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="link" onClick={handleCopyLink}>
                <Clipboard className="w-5 h-5  text-gray-600" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy Link</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="link" onClick={handleBookmark}>
                {isBookmarked ? (
                  <BookmarkCheck className="w-5 h-5 text-gray-600" />
                ) : (
                  <Bookmark className="w-5 h-5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isBookmarked ? 'Remove Bookmark' : 'Bookmark'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 1.2 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant="ghost"
                  className="text-gray-500 font-bold"
                  onClick={handleVote}
                >
                  <ArrowBigUp
                    className={`w-5 h-5 ${isUpvoted ? 'text-green-600' : ''}`}
                  />
                  {blog?.votes}
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isUpvoted ? 'Remove Vote' : 'Vote'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default CategoryBlogCard;
