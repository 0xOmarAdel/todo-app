import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import { useState } from "react";
import fakeTodos from "../data/fakeTodos";

const TodosPage = () => {
  const [todos, setTasks] = useState(fakeTodos);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="mt-24 w-full px-8 grid grid-cols-1 lg:grid-cols-3 lg:gap-10">
      <div className="h-fit sticky top-[6.2rem]">
        <TodoForm />
      </div>

      <div className="col-span-2">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0">
          <h1 className="flex flex-row items-center gap-2 text-3xl font-bold">
            Todos
            {todos.length > 0 && (
              <span className="text-xl">({todos.length})</span>
            )}
          </h1>
        </div>
        <hr className="my-4" />
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pb-8">
          {loading ? (
            <p>Loading...</p>
          ) : todos.length === 0 ? (
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
