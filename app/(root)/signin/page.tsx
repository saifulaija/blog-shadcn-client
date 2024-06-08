
import React from 'react'

import { Metadata } from 'next';
import SignIn from './components/SignIn';

export const metadata: Metadata = {
  title: "SignIn || BlogPlex ",
  description: 'An BlogPlex built with Next.js, Postgres, Shadcn signin'
};

const SignInPage = () => {
  return (
    <div className='wrapper'>
      <SignIn/>
    </div>
  )
}

export default SignInPage