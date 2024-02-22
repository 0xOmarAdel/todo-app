import Button from "../ui/Button";
import ErrorMessage from "../ui/ErrorMessage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import createTodoSchema from "../schema/createTodoSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "../utils/todosActions";

const TodoForm = () => {
  const queryClient = useQueryClient();

  const newTodoMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createTodoSchema),
  });

  const onSubmit = async (data) => {
    await newTodoMutation.mutate(data);
    if (newTodoMutation.isError) {
      setError("An error occurred while submitting");
    } else {
      reset();
    }
  };

  return (
    <div className="lg:h-fit lg:sticky lg:top-[6.2rem] mb-4 lg:mb-0 pb-12 lg:pb-0">
      <h2 className="text-2xl font-bold mb-4">Create Todo</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <input
            className="appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-sky-500"
            {...register("title")}
            placeholder="Todo Title"
          />
          {errors.title && <ErrorMessage error={errors.title.message} />}
        </div>
        <div className="flex flex-col gap-1">
          <input
            className="appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-sky-500"
            {...register("description")}
            placeholder="Toto Description"
          />
          {errors.description && (
            <ErrorMessage error={errors.description.message} />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <input
            className="appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-sky-500"
            type="date"
            {...register("dueDate")}
            placeholder="Due Date"
          />
          {errors.dueDate && <ErrorMessage error={errors.dueDate.message} />}
        </div>
        <Button
          type="submit"
          text={
            isSubmitting || newTodoMutation.isPending ? "Loading..." : "Submit"
          }
          disabled={isSubmitting || newTodoMutation.isPending}
        />
      </form>
    </div>
  );
};
export default TodoForm;
