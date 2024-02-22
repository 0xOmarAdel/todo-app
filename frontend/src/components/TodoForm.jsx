import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (title && description && dueDate) {
      console.log(title, description, dueDate);
      setTitle("");
      setDescription("");
      setDueDate("");
    }
  };

  return (
    <div className="lg:h-fit lg:sticky lg:top-[6.2rem] mb-4 lg:mb-0 pb-12 lg:pb-0">
      <h2 className="text-2xl font-bold mb-4">Create Todo</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          id="title"
          name="title"
          placeholder="Enter todo title"
          value={title}
          onChange={setTitle}
        />
        <Input
          id="description"
          name="description"
          placeholder="Enter todo description"
          value={description}
          onChange={setDescription}
        />
        <Input
          type="date"
          id="dueDate"
          name="dueDate"
          value={dueDate}
          onChange={setDueDate}
        />

        <Button type="submit" text="Create" />
      </form>
    </div>
  );
};
export default TodoForm;
