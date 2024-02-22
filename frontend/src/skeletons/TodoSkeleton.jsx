const TodoSkeleton = () => {
  return (
    <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-lg flex flex-col sm:flex-row gap-5 select-none">
      <div className="w-full flex flex-col gap-5 sm:p-2">
        <div className="flex flex-col gap-3">
          <div className="bg-gray-200 w-full animate-pulse h-12 rounded-2xl"></div>
          <div className="bg-gray-200 w-full animate-pulse h-6 rounded-2xl"></div>
          <div className="bg-gray-200 w-full animate-pulse h-6 rounded-2xl"></div>
        </div>
        <div className="flex gap-3 justify-between">
          <div className="bg-gray-200 w-52 h-8 animate-pulse rounded-full"></div>
          <div className="bg-gray-200 w-20 h-8 animate-pulse rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
export default TodoSkeleton;
