const NewsShelter = () => {
  return (
    <div className="max-w-xs mx-auto border border-gray-300 rounded-lg p-6 mt-8 mb-8 bg-gray-50 text-center">
      <h2 className="text-lg font-semibold text-gray-700 tracking-wide mb-2">
        NEWSLETTER
      </h2>
      <div className="w-6 h-0.5 bg-gray-300 mx-auto mb-4"></div>
      <p className="text-gray-600 mb-4">
        Enter your email address below to subscribe to my newsletter
      </p>
      <input
        type="email"
        placeholder="Your email address.."
        className="w-full px-4 py-2 border border-gray-300 rounded mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-300"
      />
      <button className="w-full py-2 bg-pink-400 text-white font-semibold rounded hover:bg-pink-500 transition">
        SUBSCRIBE
      </button>
    </div>
  );
};

export default NewsShelter;
