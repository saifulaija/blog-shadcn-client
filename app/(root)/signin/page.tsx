
// import React from 'react'

// import { Metadata } from 'next';
// import SignIn from './components/SignIn';

// export const metadata: Metadata = {
//   title: "SignIn || BlogPlex ",
//   description: 'An BlogPlex built with Next.js, Postgres, Shadcn signin'
// };

// const SignInPage = () => {
//   return (
//     <div className='wrapper'>
//       <SignIn/>
//     </div>
//   )
// }

// export default SignInPage




import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import SignUp from "../signup/components/SignUp"

import { Metadata } from 'next';
import SignIn from './components/SignIn';

export const metadata: Metadata = {
  title: "SignIn || BlogPlex ",
  description: 'An BlogPlex built with Next.js, Postgres, Shadcn signin'
};

const  SignInPage=()=> {
  return (
 <div className="flex justify-center items-center mx-auto p-10">
      <Tabs defaultValue="signin" className="w-[600px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <SignIn/>
        </TabsContent>
        <TabsContent value="signup">
         <SignUp/>
        </TabsContent>
      </Tabs>
 </div>
  )
}

export default SignInPage
