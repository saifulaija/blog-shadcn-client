import { useState } from 'react';
import { Copy } from 'lucide-react';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

const Credential = () => {
  const { toast } = useToast();
  const [copiedBloggerEmail, setCopiedBloggerEmail] = useState(false);
  const [copiedBloggerPassword, setCopiedBloggerPassword] = useState(false);
  const [copiedUserEmail, setCopiedUserEmail] = useState(false);
  const [copiedUserPassword, setCopiedUserPassword] = useState(false);
  const [copiedAdminEmail, setCopiedAdminEmail] = useState(false);
  const [copiedAdminPassword, setCopiedAdminPassword] = useState(false);

  const userCredentials = {
    email: 'user1@gmail.com',
    password: '111111',
  };

  const adminCredentials = {
    email: 'admin@gmail.com',
    password: '111111',
  };
  const bloggerCredentials = {
    email: 'blogger2@gmail.com',
    password: '111111',
  };

  const handleCopy = (text: any, setCopied: any) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        toast({
          title: 'Success',
          description: 'Credentials copied to clipboard!',
          action: <ToastAction altText="Close">Close</ToastAction>,
        });
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        toast({
          variant: 'destructive',
          title: 'Failed',
          description: 'Failed to copy credentials!',
          action: <ToastAction altText="Close">Close</ToastAction>,
        });
      });
  };

  return (
    <div className="w-full max-w-lg container mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Login Credentials
      </h2>
      {/* Admin Credentials */}
      <div className="mb-2">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          Admin Credentials
        </h3>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium">Email:</span>
              <span className="text-gray-600">{adminCredentials.email}</span>
            </div>

            <Button
              variant={'link'}
              onClick={() =>
                handleCopy(adminCredentials.email, setCopiedAdminEmail)
              }
            >
              {copiedAdminEmail ? 'Copied!' : 'Copy Email'}
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-medium">Password:</span>
              <span className="text-gray-600">{adminCredentials.password}</span>
            </div>
            <Button
              variant={'link'}
              onClick={() =>
                handleCopy(adminCredentials.password, setCopiedAdminPassword)
              }
            >
              {copiedAdminPassword ? 'Copied!' : ' Copy Password'}
            </Button>
          </div>
        </div>
      </div>
      {/* Blogger Credentials */}
      <div className="mb-2">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          Blogger Credentials
        </h3>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium">Email:</span>
              <span className="text-gray-600">{bloggerCredentials.email}</span>
            </div>

            <Button
              variant={'link'}
              onClick={() =>
                handleCopy(bloggerCredentials.email, setCopiedBloggerEmail)
              }
            >
              {copiedBloggerEmail ? 'Copied!' : 'Copy Email'}
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-medium">Password:</span>
              <span className="text-gray-600">
                {bloggerCredentials.password}
              </span>
            </div>
            <Button
              variant={'link'}
              onClick={() =>
                handleCopy(
                  bloggerCredentials.password,
                  setCopiedBloggerPassword,
                )
              }
            >
              {/* <Copy/> */}

              {copiedBloggerPassword ? 'Copied!' : 'Copy Password'}
            </Button>
          </div>
        </div>
      </div>
      <div className="mb-2">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          User Credentials
        </h3>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium">Email:</span>
              <span className="text-gray-600">{userCredentials.email}</span>
            </div>

            <Button
              variant={'link'}
              onClick={() =>
                handleCopy(userCredentials.email, setCopiedUserEmail)
              }
            >
              {copiedUserEmail ? 'Copied!' : 'Copy Email'}
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-medium">Password:</span>
              <span className="text-gray-600">{userCredentials.password}</span>
            </div>
            <Button
              variant={'link'}
              onClick={() =>
                handleCopy(userCredentials.password, setCopiedUserPassword)
              }
            >
              {copiedUserPassword ? 'Copied!' : 'Copy Password'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credential;
