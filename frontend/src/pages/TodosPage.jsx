import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "../utils/todosActions";
import ErrorMessage from "../ui/ErrorMessage";
import TodoSkeletons from "../skeletons/TodoSkeletons";
import SearchInput from "../components/SearchInput";
import { useEffect, useState } from "react";

const TodosPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const [todos, setTodos] = useState(data?.todos);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (data?.todos) {
      const filteredTodos = data.todos.filter(
        (todo) =>
          todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          todo.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setTodos(filteredTodos);
    }
  }, [data, searchQuery]);

  return (
    <div className="mt-24 w-full px-8 grid grid-cols-1 lg:grid-cols-3 gap-y-10 lg:gap-x-10">
      <TodoForm />
      <div className="col-span-2">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0">
          <h1 className="flex flex-row items-center gap-2 text-3xl text-gray-700 font-semibold">
            Todos
            {todos?.length > 0 && (
              <span className="text-xl">({todos?.length})</span>
            )}
          </h1>
        </div>
        <div className="my-4">
          <SearchInput
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
        <hr className="my-4" />
        {isError && (
          <ErrorMessage error="An error occurred while fetching your todos" />
        )}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-10">
          {isLoading ? (
            <TodoSkeletons number={3} />
          ) : todos?.length === 0 ? (
            <p className="text-gray-800 font-medium">
              There&apos;re No Todos To Show!
            </p>
          ) : (
            <TodoList todos={todos} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TodosPage;
