import dateFormatter from "../utils/dateFormatter";
import { calculateDaysDifference } from "../utils/calculateDaysDifference";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineDateRange } from "react-icons/md";
import { useState } from "react";
import Button from "../ui/Button";

const SingleTodo = ({ todo }) => {
  const today = new Date().toISOString().split("T")[0];
  const remainingDays = calculateDaysDifference(today, todo.dueDate);

  const [todoIsCompleted, setTodoIsCompleted] = useState(todo.isCompleted);

  const toggleCompleted = () => {
    setTodoIsCompleted((prevState) => !prevState);
  };

  const deleteTodoHandler = () => {
    console.log("deleteTodoHandler");
  };

  return (
    <div
      className={`group relative h-full  ${
        todoIsCompleted ? "opacity-70 bg-green-200" : "bg-white"
      } rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-200 ease-in-out p-4`}
    >
      <h2
        className={`text-xl font-bold ${
          todoIsCompleted == true && "line-through"
        }`}
      >
        {
          <IoMdCheckmarkCircleOutline
            className={`absolute top-2 right-2 cursor-pointer ${
              todoIsCompleted ? "text-green-500" : "text-gray-600"
            }`}
            size={24}
            onClick={toggleCompleted}
          />
        }
        {todo.title}
      </h2>
      <p className="mt-2 text-gray-700">{todo.description}</p>
      <div className="mt-4 flex flex-col sm:flex-row flex-wrap justify-between sm:items-center gap-y-4">
        <span className="flex flex-row items-center gap-2">
          <MdOutlineDateRange className="shrink-0 text-lg" />
          <div className="flex flex-row flex-wrap items-center gap-1">
            {dateFormatter(todo.dueDate)}
            <span className="text-sm break-keep">({remainingDays}d left)</span>
          </div>
        </span>
        <div className="flex flex-row flex-wrap sm:flex-nowrap gap-2">
          <Button text="Delete" onClick={deleteTodoHandler} />
        </div>
      </div>
    </div>
  );
};
export default SingleTodo;
