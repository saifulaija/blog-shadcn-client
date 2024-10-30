'use client';
import React from 'react';
import { Triangle } from 'react-loader-spinner';
import { Slide } from 'react-awesome-reveal';

const Loading = () => {
  const text = 'Blog Plex ...'; // The text to animate

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <Triangle
          visible={true}
          height="200"
          width="200"
          color="#000"
          ariaLabel="triangle-loading"
          wrapperStyle={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          wrapperClass=""
        />
        <div className="flex justify-center mt-4">
          {text.split('').map((letter, index) => (
            <Slide key={index} duration={500} delay={index * 200}>
              <p
                className={`inline-block text-2xl font-semibold text-opacity-70 animate-pulse ${index >= 5 ? 'text-red-500' : 'text-black'}`}
              >
                {letter}
              </p>
            </Slide>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
