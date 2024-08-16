const CustomHeader = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center justify-center">
      <p className="text-xl md:text-2xl lg:text-2xl font-bold text-center">
        {title}
      </p>
    </div>
  );
};

export default CustomHeader;
