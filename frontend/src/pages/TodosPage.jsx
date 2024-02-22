import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "../utils/todosActions";
import ErrorMessage from "../ui/ErrorMessage";
import TodoSkeletons from "../skeletons/TodoSkeletons";

const TodosPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  return (
    <div className="mt-24 w-full px-8 grid grid-cols-1 lg:grid-cols-3 lg:gap-10">
      <TodoForm />
      <div className="col-span-2">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0">
          <h1 className="flex flex-row items-center gap-2 text-3xl font-bold">
            Todos
            {data?.todos.length > 0 && (
              <span className="text-xl">({data?.todos.length})</span>
            )}
          </h1>
        </div>
        <hr className="my-4" />
        {isError && <ErrorMessage error="An error occurred." />}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pb-8">
          {isLoading ? (
            <TodoSkeletons number={3} />
          ) : data?.todos.length === 0 ? (
            <p className="text-gray-800 font-medium">
              There&apos;re No Todos To Show!
            </p>
          ) : (
            <TodoList todos={data?.todos} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TodosPage;
