"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import Image from "next/image";
import SignInForm from "@/components/Form/SignInForm ";
import assets from "@/public";


const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const SignIn = () => {
  return (
    <AnimatePresence>
      <motion.div
        className="flex items-center justify-center mt-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 border-[.25px] border-primary/40 p-4 rounded-lg ">
          <motion.div
            className="flex-shrink-0 hidden md:block"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Image
              src={assets.images.register}
              width={200}
              height={200}
              alt="Login Illustration"
            />
          </motion.div>
          <motion.div
            className="w-full max-w-md"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ ease: "easeInOut", duration: 0.8, delay: 0.5 }}
          >
            <SignInForm />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SignIn;