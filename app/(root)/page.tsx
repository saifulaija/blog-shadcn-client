// import BestBlogs from '@/components/Home/BestBlog/BestBlogs';
// import Category from '@/components/Home/Category/Category';
// import { Hero } from '@/components/Home/Hero/Hero';

import Category from "@/components/Home/Category/Category";
import { Hero } from "@/components/Home/Hero/Hero";
import About from "@/components/NewHome/About";
import BelowFooter from "@/components/NewHome/BellowFooter";
import Categories from "@/components/NewHome/Categories";
import JoinUs from "@/components/NewHome/JoinUs";
import LatestPosts from "@/components/NewHome/LatestPosts";
import NewBlogCards from "@/components/NewHome/NewBlogCards";
import NewsShelter from "@/components/NewHome/NewsShelter";
import SocialFollow from "@/components/NewHome/SocialFollow";
import TopNavbar from "@/components/NewHome/TopNavbar";



// import NewsLetter from '@/components/Home/NewsLetter/NewsLetter';

// import WorkWithUs from '@/components/Home/WorkWithUs/WorkWithUs';

// export default function Home() {
//   return (
//     <>
//       <Hero />
     
//       <Category/>
//       <BestBlogs />
//       <NewsLetter />
//       <WorkWithUs />
//     </>
//   );
// }





export default function Home() {
  return (
    <main>
      <Hero/>
      <Category/>
      <div className="flex justify-center items-center gap-12">
        <div className="flex justify-start items-start gap-6">
          {/* Main blog content area */}
          <div>
            {/* <CardsGrid /> */}

            <NewBlogCards/>
          </div>

          {/* Sidebar with fixed positioning */}
          <div>
            {/* <TopNavbar /> */}
            <About />
            <SocialFollow />
            <NewsShelter />
            <LatestPosts />
            <Categories />
            <JoinUs />
          </div>
        </div>
      </div>
      {/* <Loading /> */}
      <BelowFooter />
    </main>
  );
}
