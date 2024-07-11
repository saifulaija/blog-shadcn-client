import { Badge } from '@/components/ui/badge';

export function MyBadge({ title }: { title: string }) {
  const variant =
    title === 'PENDING'
      ? 'secondary'
      : title === 'APPROVED'
        ? 'default'
        : title === 'CANCEL'
          ? 'destructive'
          : 'secondary';

  return <Badge variant={variant}>{title}</Badge>;
}
