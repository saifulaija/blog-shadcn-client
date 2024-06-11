


'use client';


import SignUpForm from "@/components/Form/SignUpForm";
import { AnimatePresence, motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const SignUp = () => {
  return (
    <AnimatePresence>
      <motion.div
        className="flex items-center justify-center mt-5 md:p-4 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="max-w-3xl w-full space-y-4 rounded-lg  border py-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <h2 className="text-xl md:text-2xl text-primary font-semibold">Register Now</h2>
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