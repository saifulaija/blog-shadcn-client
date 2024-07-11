'use client';

import SignUpForm from '@/components/Form/SignUpForm';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const SignUp = () => {
  return (
    <AnimatePresence>
      <motion.div
        className="flex items-center justify-center p-[4px] "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <div className="max-w-3xl w-full space-y-4 rounded-lg  border py-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            <h2 className="text-xl md:text-2xl mb-2 text-primary font-semibold">
              Register Now
            </h2>
            <div className="text-balance flex justify-center items-center gap-1 -mt-3 text-center">
              <Link
                className={buttonVariants({
                  variant: 'link',
                  className: 'gap-1.5',
                })}
                href="/signin"
              >
                Already have an account?
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <Separator className={cn('text-primary border-2')} />
          </motion.div>
          <motion.div
            className="pb-2 px-4  rounded-lg sm:px-6 "
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ ease: 'easeInOut', duration: 0.8, delay: 0.5 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-center">
              <div className="w-full md:w-2xl">
                <SignUpForm />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SignUp;
