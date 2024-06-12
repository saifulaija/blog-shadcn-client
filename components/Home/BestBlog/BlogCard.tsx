'use client'

import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { IBlog } from '@/types/blog'
import { MyAvatar } from '@/components/shadcn/MyAvatar'
import { dateFormat, formateDate } from '@/utils/common'

import { truncateTitle } from '@/utils/truncateTitle'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { getUserInfo } from '@/services/authServices'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

const BestBlogCard = ({ blog }: { blog: IBlog }) => {
    const user =getUserInfo()
    const router=useRouter()
    const truncatedTitle = truncateTitle(blog?.title, 30);

    const handleDetails=()=>{

        router.push(`blogs/details/${blog?.id}`)

    }

    const handleLogin = () => {
        router.push('/signin')
      }

    return (
        <Card className="w-full max-w-sm outline-0 focus:ring-2 hover:ring-2 ring-primary transition duration-300 rounded-lg">
            <CardHeader className="p-0 items-center">
                <div className="relative w-full" style={{ height: '200px' }}>
                    <Image
                        src={blog?.image || "/placeholder-image.jpg"}
                        alt="Blog Image"
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                         className="rounded-sm"
                    />
                </div>
            </CardHeader>
            <div className='flex-between p-1'>
                <div className="flex-center gap-2">
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
                {/* <Button variant='default'>Read More</Button> */}
                {
            user?.userId ? <Button onClick={handleDetails}>Read More</Button> : (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button>Read More</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you want to read more?</AlertDialogTitle>
                    <AlertDialogDescription>
                      You need to login at first. Would you like to go to the login page?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogin}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )
          }

            </div>


        </Card>
    )
}

export default BestBlogCard
