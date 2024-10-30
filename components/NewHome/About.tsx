import CustomHeader from '../shared/CustomHeader/CustomHeader';

const About = () => {
  return (
    <div>
      <div className="max-w-xs mx-auto border border-gray-300 rounded-lg p-4 mt-8 mb-8 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-red-500 rounded-t-lg"></div>
        <h2 className="w-full text-center text-lg font-semibold text-gray-700 mb-4 tracking-wide border-b border-gray-300 pb-2">
          ABOUT
        </h2>
        <div className="flex flex-col items-center">
          <img
            src="https://via.placeholder.com/150" // Replace this with your image URL
            alt="Shane"
            className="w-32 h-32 object-cover rounded"
          />
          <p className="text-center mt-4 text-gray-600">
            I’m <span className="text-red-500 font-semibold">Shane</span>, a
            girly girl and lover of life. Join me on the journey to find the
            latest in fashion.
          </p>
          <button className="mt-4 text-red-500 font-semibold tracking-wider hover:underline">
            READ MORE
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
