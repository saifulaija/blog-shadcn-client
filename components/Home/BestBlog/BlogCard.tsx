import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { IBlog } from '@/types/blog'
import { MyAvatar } from '@/components/shadcn/MyAvatar'
import { dateFormat, formateDate } from '@/utils/common'
import { CalendarDays } from 'lucide-react'
import { truncateTitle } from '@/utils/truncateTitle'
import { Button } from '@/components/ui/button'

const BestBlogCard = ({ blog }: { blog: IBlog }) => {
    const truncatedTitle = truncateTitle(blog?.title, 50);

    return (
        <Card className="w-full max-w-sm">
            <CardHeader className="p-0 items-center">
                <div className="relative w-full" style={{ height: '200px' }}>
                    <Image
                        src={blog?.image || "/placeholder-image.jpg"}
                        alt="Blog Image"
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                        className="rounded"
                    />
                </div>


            </CardHeader>
            <div className='flex-between p-1'>
                <div className="flex items-center">
                    <MyAvatar url={blog?.author?.profilePhoto || '/photo'} alt={blog?.author?.name || 'author'} />
                    <p>{blog?.author?.name}</p>
                </div>
                <p className="text-sm">{formateDate(blog?.createdAt)}</p>
            </div>
            <CardContent className=" grid ">
                <p>{truncatedTitle}</p>
            </CardContent>
            <div className='flex-between p-1'>
                <p> Likes: {blog?.likeCount}</p>
                <p> Views: {blog?.views}</p>
                <Button variant='outline'>Read More</Button>

            </div>


        </Card>
    )
}

export default BestBlogCard
