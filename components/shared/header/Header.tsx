import Image from 'next/image'
import Link from 'next/link'
import { APP_NAME } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import assets from '@/public'
import { UserIcon } from 'lucide-react'
// import Menu from './menu'

const Header = async () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <Link href="/" className="flex-start">
            <Image
              src={assets.images.logo}
              width={40}
              height={40}

              alt={`${APP_NAME} logo`}
              className='rounded-md'
            />
            {APP_NAME}
          </Link>
        </div>
        {/* <Menu /> */}
        <Button asChild>
          <Link href='/signin'>
            <UserIcon />
            Sign In
          </Link>

        </Button>
      </div>
    </header>
  )
}

export default Header