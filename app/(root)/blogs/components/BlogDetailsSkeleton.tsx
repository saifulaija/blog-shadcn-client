// components/shared/BlogDetailsSkeleton.tsx

import { Skeleton } from "@/components/ui/skeleton";

const BlogDetailsSkeleton = () => {
    return (
        <div className="w-full p-10">
            <div className="wrapper border">
                <div className="flex flex-col md:flex-row md:justify-between gap-2 p-10 space-y-8 md:space-y-0">
                    <div className="md:w-1/3 space-y-4">
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-6 w-1/3" />
                    </div>
                    <div className="md:w-2/3 space-y-4">
                        <div className="relative w-full max-w-[800px] h-[300px] overflow-hidden rounded-md">
                            <Skeleton className="w-full h-full" />
                        </div>
                        <div>
                            <Skeleton className="h-6 w-1/4" />
                            <Skeleton className="h-4 w-1/2 mt-2" />
                        </div>
                        <div>
                            <Skeleton className="h-6 w-1/4" />
                            <Skeleton className="h-4 w-1/2 mt-2" />
                        </div>
                        <div>
                            <Skeleton className="h-6 w-1/4" />
                            <Skeleton className="h-4 w-full mt-2" />
                            <Skeleton className="h-4 w-full mt-2" />
                            <Skeleton className="h-4 w-full mt-2" />
                        </div>
                        <div>
                            <Skeleton className="h-6 w-1/4" />
                            <Skeleton className="h-4 w-1/2 mt-2" />
                        </div>
                    </div>
                </div>
                <div className="flex justify-between p-4">
                    <Skeleton className="h-10 w-1/4" />
                    <Skeleton className="h-10 w-1/4" />
                </div>
            </div>
        </div>
    );
};

export default BlogDetailsSkeleton;
