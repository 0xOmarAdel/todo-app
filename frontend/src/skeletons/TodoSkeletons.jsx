import TodoSkeleton from "./TodoSkeleton";

const TodoSkeletons = ({ number }) => {
  return (
    <>
      {Array.from({ length: number }).map((_, index) => (
        <TodoSkeleton key={index} />
      ))}
    </>
  );
};

export default TodoSkeletons;
