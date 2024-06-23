import { IBlog } from "@/types/blog";
import BestBlogCard from "./BlogCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {  SendHorizonal } from "lucide-react";



const BestBlogs = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/blog`, {
    cache: "no-store",

  });

  const blogData = await res.json();
  const blogs = blogData?.data;

  return (
    <div className="w-full p-0 md:p-8">
      <div className="wrapper">
        <h1 className="h2-bold text-center p-10 ">Popular Blogs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:m-0">
          {blogs?.slice(0, 8).map((blog: IBlog) => (
            <BestBlogCard blog={blog} key={blog.id} />
          ))}
        </div>

        <div className="flex-center mt-10">
        <Button asChild className="group animate-in zoom-in duration-500">
              <Link href="/all_blogs" className="flex items-center gap-2 font-semibold">
                View All
                <SendHorizonal className="transition-transform duration-300 ease-in-out transform group-hover:translate-x-1" />

              </Link>
            </Button>
        
        </div>

      </div>

    </div>
  )
}

export default BestBlogs;
