// BlogCardSkeleton.jsx or BlogCardSkeleton.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const BlogCardSkeleton = () => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="p-0 items-center">
        <div className="relative w-full" style={{ height: '200px' }}>
          <Skeleton className="h-full w-full rounded" />
        </div>
      </CardHeader>
      <div className="flex-between p-1">
        <div className="flex-center gap-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-4 w-16" />
      </div>
      <CardContent className="grid p-1">
        <Skeleton className="h-6 w-3/4" />
      </CardContent>
      <div className="flex-between p-1">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-8 w-20" />
      </div>
    </Card>
  )
}

export default BlogCardSkeleton
