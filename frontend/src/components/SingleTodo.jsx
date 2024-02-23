import dateFormatter from "../utils/dateFormatter";
import { calculateDaysDifference } from "../utils/calculateDaysDifference";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineDateRange } from "react-icons/md";
import Button from "../ui/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo, toggleCompletedTodo } from "../utils/todosActions";
import { useState } from "react";
import Modal from "../ui/Modal";
import TodoForm from "./TodoForm";

const SingleTodo = ({ todo }) => {
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const toggleCompletedMutation = useMutation({
    mutationFn: toggleCompletedTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const today = new Date().toISOString().split("T")[0];
  const remainingDays = calculateDaysDifference(today, todo.dueDate);

  const toggleCompleted = () => {
    toggleCompletedMutation.mutate(todo._id);
  };

  const deleteTodoHandler = () => {
    deleteTodoMutation.mutate(todo._id);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      className={`group relative h-full  ${
        todo.isCompleted ? "opacity-70 bg-green-200" : "bg-white"
      } rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-200 ease-in-out p-4`}
    >
      <h2
        className={`text-xl font-semibold ${
          todo.isCompleted == true && "line-through"
        }`}
      >
        <button
          onClick={toggleCompleted}
          disabled={toggleCompletedTodo.isPending}
        >
          <IoMdCheckmarkCircleOutline
            className={`absolute top-2 right-2 cursor-pointer ${
              todo.isCompleted ? "text-green-500" : "text-gray-600"
            }`}
            size={24}
          />
        </button>
        {todo.title}
      </h2>
      <p className="mt-2 text-gray-700">{todo.description}</p>
      <div className="mt-4 flex flex-col sm:flex-row flex-wrap justify-between sm:items-center gap-y-4">
        <span className="flex flex-row items-center gap-2">
          <MdOutlineDateRange className="shrink-0 text-lg" />
          <div className="flex flex-row flex-wrap items-center gap-1">
            {dateFormatter(todo.dueDate)}
            <span className="text-sm break-keep">
              ({remainingDays > 0 ? remainingDays : 0}d left)
            </span>
          </div>
        </span>
        <div className="flex flex-row flex-wrap sm:flex-nowrap gap-2">
          {!todo.isCompleted && (
            <>
              <Button text="Edit" onClick={() => setIsModalOpen(true)} />
              <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
                <TodoForm setIsModalOpen={setIsModalOpen} todoToEdit={todo} />
              </Modal>
            </>
          )}
          <Button
            text="Delete"
            onClick={deleteTodoHandler}
            disabled={deleteTodoMutation.isPending}
          />
        </div>
      </div>
    </div>
  );
};
export default SingleTodo;
