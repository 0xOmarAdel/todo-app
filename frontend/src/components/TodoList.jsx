import SingleTodo from "./SingleTodo";

const TodoList = ({ todos }) => {
  return todos?.map((todo) => <SingleTodo key={todo._id} todo={todo} />);
};

export default TodoList;
