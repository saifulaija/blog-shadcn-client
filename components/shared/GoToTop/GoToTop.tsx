'use client';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const goToBtn = () => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  };
  const listenToScroll = () => {
    const heightToHidden: number = 250;
    const winScroll: number = (document.body.scrollTop ||
      document.documentElement.scrollTop) as number;
    if (winScroll > heightToHidden) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', listenToScroll);
    return () => window.removeEventListener('scroll', listenToScroll);
  }, []);

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-10 right-10 z-50">
          <button
            className=" bg-secondary text-primary rounded-full w-10 h-10 flex justify-center items-center shadow-md focus:outline-none hover:bg-primary-dark transition-colors duration-300"
            onClick={goToBtn}
          >
            <ArrowUp className="animate-bounce" />
          </button>
        </div>
      )}
    </>
  );
};

export default GoToTop;
