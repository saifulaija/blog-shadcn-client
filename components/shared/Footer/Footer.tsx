import { APP_NAME } from '@/lib/constants';

const Footer = () => {
  return (
    <footer className="bg-primary/75 text-muted">
      <div className="p-5 flex-center">
        2024 {APP_NAME}. All Rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
