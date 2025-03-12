const Loader = () => {
  return (
    <div className="max-w-min max-h-min  rounded-sm flex items-center justify-center h-screen ">
      <div className="flex space-x-2 p-2 rounded-md">
        <div className="w-2 h-2 rounded-full bg-sky-400 animate-bounce duration-500"></div>
        <div className="w-2 h-2 rounded-full bg-sky-400 animate-bounce duration-500 delay-100"></div>
        <div className="w-2 h-2 rounded-full bg-sky-400 animate-bounce duration-500 delay-200"></div>
      </div>
    </div>
  );
};

export { Loader };
