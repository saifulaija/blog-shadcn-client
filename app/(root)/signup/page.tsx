import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import SignUp from '../signup/components/SignUp';

import { Metadata } from 'next';

import BloggerRegister from './components/BloggerRegister';

export const metadata: Metadata = {
  title: 'SignUp || BlogPlex ',
  description: 'An BlogPlex built with Next.js, Postgres, Shadcn signin',
};

const SignUpPage = () => {
  return (
    <div className="flex justify-center items-center mx-auto p-5">
      <Tabs orientation="vertical" defaultValue="signin" className="w-[600px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Register as User</TabsTrigger>
          <TabsTrigger value="signup">Register as Blogger</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <SignUp />
        </TabsContent>
        <TabsContent value="signup">
          <BloggerRegister />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SignUpPage;
