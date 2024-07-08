// "use client";
// import React from "react";
// import { AnimatePresence, motion } from "framer-motion";

// import Image from "next/image";
// import SignInForm from "@/components/Form/SignInForm ";
// import assets from "@/public";

// const sectionVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0 },
// };

// const SignIn = () => {
//   return (
//     <AnimatePresence>
//       <motion.div
//         className="flex items-center justify-center mt-5"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 0.5, ease: "easeInOut" }}
//       >
//         <div className="flex flex-col md:flex-row items-center justify-center gap-8 border p-4 rounded-lg ">

//           <motion.div
//             className="w-full max-w-md"
//             variants={sectionVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             transition={{ ease: "easeInOut", duration: 0.8, delay: 0.5 }}
//           >
//             <SignInForm />
//           </motion.div>
//         </div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default SignIn;

"use client";

import SignInForm from "@/components/Form/SignInForm ";
import SignUpForm from "@/components/Form/SignUpForm";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { APP_NAME } from "@/lib/constants";
import assets from "@/public";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const SignIn = () => {
  return (
    <AnimatePresence>
      <motion.div
        className="flex items-center justify-center mt-14 md:p-4 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="max-w-xl w-full space-y-4 rounded-lg  border py-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <div className="flex flex-col items-center space-y-1 text-center">
             
              <h1 className="text-2xl font-semibold tracking-tight text-primary capitalize">
                Sign in to your account
              </h1>

              <Link
                className={buttonVariants({
                  variant: "link",
                  className: "gap-1.5",
                })}
                href="/signup"
              >
                Don&apos;t have an account?
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Separator/>
            </div>
          </motion.div>
          <motion.div
            className="pb-2 px-4  rounded-lg sm:px-6 "
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ ease: "easeInOut", duration: 0.8, delay: 0.5 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-center">
              <div className="w-full md:w-2xl">
                <SignInForm />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SignIn;
