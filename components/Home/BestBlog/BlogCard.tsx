
// 'use client'

// import Image from 'next/image'
// import { useRouter } from 'next/navigation'
// // Using react-icons as an alternative for icons
// import { FaFacebook, FaWhatsapp } from 'react-icons/fa'
// import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
// import { IBlog } from '@/types/blog'
// import { MyAvatar } from '@/components/shadcn/MyAvatar'
// import { formateDate } from '@/utils/common'
// import { truncateTitle } from '@/utils/truncateTitle'
// import { Button } from '@/components/ui/button'
// import { getUserInfo } from '@/services/authServices'
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from '@/components/ui/alert-dialog'
// import { ChevronRight } from 'lucide-react'

// const BestBlogCard = ({ blog }: { blog: IBlog }) => {
//   const user = getUserInfo()
//   const router = useRouter()
//   const truncatedTitle = truncateTitle(blog?.title, 30)
//   const currentUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blogs/details/${blog?.id}`
//   const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${blog?.title} - ${currentUrl}`)}`
//   const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`

//   const handleDetails = () => {
//     router.push(`blogs/details/${blog?.id}`)
//   }

//   const handleLogin = () => {
//     router.push('/signin')
//   }

//   return (
//     <Card className="w-full max-w-sm outline-0 focus:ring-2 hover:ring-2 ring-primary transition duration-300 rounded-md">
//       <CardHeader className="p-0 items-center">
//         <div className="relative w-full" style={{ height: '200px' }}>
//           <Image
//             src={blog?.image || "/placeholder-image.jpg"}
//             alt="Blog Image"
//             layout="fill"
//             objectFit="cover"
//             quality={100}
//             className="rounded-t-md"
//           />
//         </div>
//       </CardHeader>
//       <div className='flex-between p-1'>
//         <div className="flex items-center gap-2">
//           <MyAvatar url={blog?.author?.profilePhoto || '/photo'} alt={blog?.author?.name || 'author'} />
//           <p className="text-sm font-medium text-gray-700">{blog?.author?.name}</p>
//         </div>
//         <p className="text-sm text-gray-500">{formateDate(blog?.createdAt)}</p>
//       </div>
//       <CardContent className="p-2">
//         <p className="text-lg font-semibold">{truncatedTitle}</p>
//       </CardContent>
//       <CardFooter className='flex justify-between p-2'>
//         <div className="text-sm text-gray-600">
//           <p> Likes: {blog?.likeCount}</p>
//           <p> Views: {blog?.views}</p>
//         </div>
//         <div className="flex items-center gap-2">
//           <a href={whatsappShareUrl} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800">
//             <FaWhatsapp className="w-5 h-5" />
//           </a>
//           <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
//             <FaFacebook className="w-5 h-5" />
//           </a>
//         </div>
//       </CardFooter>
//       <div className='mb-0'>
//         {user?.userId ? (
//           <Button onClick={handleDetails} className="w-full group ">Read More
//              <ChevronRight className="transition-transform duration-300 ease-in-out transform group-hover:translate-x-1" />
//           </Button>
//         ) : (
//           <AlertDialog>
//             <AlertDialogTrigger asChild>
//               <Button className="w-full">Read More</Button>
//             </AlertDialogTrigger>
//             <AlertDialogContent>
//               <AlertDialogHeader>
//                 <AlertDialogTitle>Want to read more?</AlertDialogTitle>
//                 <AlertDialogDescription>
//                   You need to login first. Would you like to go to the login page?
//                 </AlertDialogDescription>
//               </AlertDialogHeader>
//               <AlertDialogFooter>
//                 <AlertDialogCancel>Cancel</AlertDialogCancel>
//                 <AlertDialogAction onClick={handleLogin}>Continue</AlertDialogAction>
//               </AlertDialogFooter>
//             </AlertDialogContent>
//           </AlertDialog>
//         )}
//       </div>
//     </Card>
//   )
// }

// export default BestBlogCard


'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaFacebook, FaWhatsapp } from 'react-icons/fa'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { IBlog } from '@/types/blog'
import { MyAvatar } from '@/components/shadcn/MyAvatar'
import { formateDate } from '@/utils/common'
import { truncateTitle } from '@/utils/truncateTitle'
import { Button } from '@/components/ui/button'
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
} from '@/components/ui/alert-dialog'
import { ChevronRight } from 'lucide-react'

const BestBlogCard = ({ blog }: { blog: IBlog }) => {
  const user = getUserInfo()
  const router = useRouter()
  const truncatedTitle = truncateTitle(blog?.title, 30)
  const currentUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blogs/details/${blog?.id}`
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${blog?.title} - ${currentUrl}`)}`
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`

  const handleDetails = () => {
    router.push(`blogs/details/${blog?.id}`)
  }

  const handleLogin = () => {
    router.push('/signin')
  }

  return (
    <Card className="w-full max-w-sm outline-0 focus:ring-2 hover:bg-muted-foreground/15 ring-primary transition duration-300 rounded-md">
      <CardHeader className="p-0 items-center">
        <div className="relative w-full" style={{ height: '200px' }}>
          <Image
            src={blog?.image || "/placeholder-image.jpg"}
            alt="Blog Image"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="rounded-t-md"
          />
        </div>
      </CardHeader>
      <div className='flex-between p-1'>
        <div className="flex items-center gap-2">
          <MyAvatar url={blog?.author?.profilePhoto || '/photo'} alt={blog?.author?.name || 'author'} />
          <p className="text-sm font-medium text-gray-700">{blog?.author?.name}</p>
        </div>
        <p className="text-sm text-gray-500">{formateDate(blog?.createdAt)}</p>
      </div>
      <CardContent className="p-2">
        <p className="text-lg font-semibold">{truncatedTitle}</p>
      </CardContent>
      <CardFooter className='flex justify-between p-2'>
        <div className="text-sm text-gray-600">
          <p> Likes: {blog?.likeCount}</p>
          <p> Views: {blog?.views}</p>
        </div>
        <div className="flex items-center gap-2">
          <a href={whatsappShareUrl} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800">
            <FaWhatsapp className="w-5 h-5" />
          </a>
          <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
            <FaFacebook className="w-5 h-5" />
          </a>
        </div>
      </CardFooter>
      <div className='mb-0'>
        {user?.userId ? (
          <Button onClick={handleDetails} className="w-full group">Read More
            <ChevronRight className="transition-transform duration-300 ease-in-out transform group-hover:translate-x-1" />
          </Button>
        ) : (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="w-full">Read More</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Want to read more?</AlertDialogTitle>
                <AlertDialogDescription>
                  You need to login first. Would you like to go to the login page?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogin}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </Card>
  )
}

export default BestBlogCard

