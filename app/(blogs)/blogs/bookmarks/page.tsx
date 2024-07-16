import { Metadata } from 'next';
import Bookmark from '../components/Bookmark';

export const metadata: Metadata = {
  title: 'Details-blog || BlogPlex-bookmark',
  description: 'An BlogPlex built with Next.js, Postgres, Shadcn signin',
};

const BookmarkPage = () => {
  return (
    <div>
      <Bookmark />
    </div>
  );
};

export default BookmarkPage;
