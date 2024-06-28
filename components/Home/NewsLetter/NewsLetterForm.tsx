

'use client'


import React, { useRef, useState } from "react";

import { motion } from "framer-motion";
import { sendEmail } from "@/services/actions/sendEmail";
import SubmitBtn from "@/components/submitButton/SubmitButton";
import { useToast } from "@/components/ui/use-toast";


export default function NewsLetterForm() {
    const {toast}=useToast()
 
  const formRef = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(formRef.current!);
    const { data, error } = await sendEmail(formData);

    setLoading(false);
    if (error) {
      toast({
        variant:'destructive',
        title:'Error',
        description:error
      });
      return;
    }

    toast({
        title:"Subscription",
        description:"Congratulation subscription successfully"
    });
    if (formRef.current) {
      formRef.current.reset(); // Reset the form after successful submission
    }
  };

  return (
    <motion.section
  
    
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
     

    

      <form
        ref={formRef}
        className="mt-4 flex flex-col dark:text-black space-y-2"
        onSubmit={handleSubmit}
      >
        <input
         className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          name="senderEmail"
          type="email"
          required
          maxLength={500}
          placeholder="Your email"
        />
        
        <input
          className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          name="message"
          placeholder="Your Name"
          required
          maxLength={5000}
        />
        <SubmitBtn loading={loading} />
      </form>
    </motion.section>
  );
}
