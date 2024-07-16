import { Metadata } from 'next';
import Bookmark from '../components/Bookmark';

export const metadata: Metadata = {
  title: 'Details-blog || BlogPlex-bookmark',
  description: 'An BlogPlex built with Next.js, Postgres, Shadcn signin',
};

const BookmarkPage = ({
  searchParams,
}: {
  searchParams?: {
    q?: string;
  };
}) => {
  const q = searchParams?.q || '';
  return (
    <div>
      <Bookmark q={q} />
    </div>
  );
};

export default BookmarkPage;
