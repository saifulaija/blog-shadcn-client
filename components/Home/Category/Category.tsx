import CustomHeader from "@/components/shared/CustomHeader/CustomHeader";
import { CategoryCarousel } from './categoryCarousel';





const Category = () => {
  return (
    <div className="w-full my-4 container mx-auto">
     <CustomHeader title="Blog Categories"/>
      <div className=" container mx-auto mt-6">
        <CategoryCarousel />
      </div>
    </div>
  );
};

export default Category;
