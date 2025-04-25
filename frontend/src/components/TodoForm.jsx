import Button from "../ui/Button";
import ErrorMessage from "../ui/ErrorMessage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import createTodoSchema from "../schema/createTodoSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo, updateTodo } from "../utils/todosActions";

const TodoForm = ({ setIsModalOpen, todoToEdit }) => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: todoToEdit && {
      ...todoToEdit,
      dueDate: new Date(todoToEdit.dueDate).toISOString().split("T")[0],
    },
    resolver: zodResolver(createTodoSchema),
  });

  const queryClient = useQueryClient();

  const newTodoMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      reset();
    },
    onError: () => {
      setError("root", { message: "An error occurred while submitting" });
    },
  });

  const updateTodoMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setIsModalOpen(false);
    },
    onError: () => {
      setError("root", { message: "An error occurred while saving" });
    },
  });

  const onSubmit = (data) => {
    if (todoToEdit) {
      updateTodoMutation.mutate({ _id: todoToEdit._id, ...data });
    } else {
      newTodoMutation.mutate(data);
    }
  };

  return (
    <div className="lg:h-fit lg:sticky lg:top-[6.2rem] mb-4 lg:mb-0 flex flex-col gap-4">
      <h2 className="text-2xl text-gray-700 font-semibold">
        {todoToEdit ? "Edit" : "Create"} Todo
      </h2>
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
            min={new Date().toISOString().split("T")[0]}
          />
          {errors.dueDate && <ErrorMessage error={errors.dueDate.message} />}
        </div>
        <Button
          type="submit"
          text={
            isSubmitting ||
            newTodoMutation.isPending ||
            updateTodoMutation.isPending
              ? "Loading..."
              : todoToEdit
              ? "Save"
              : "Create"
          }
          disabled={isSubmitting || newTodoMutation.isPending}
        />
      </form>
      {errors.root && <ErrorMessage error={errors.root.message} />}
    </div>
  );
};
export default TodoForm;
