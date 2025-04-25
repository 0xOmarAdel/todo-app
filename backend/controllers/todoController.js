const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");
const Todo = require("../models/TodoModel");

const getAllTodos = async (req, res) => {
  const user = req.user;

  const todos = await Todo.find({ createdBy: user.userId }).sort("createdAt");

  res.status(StatusCodes.OK).json({ todos, count: todos.length });
};

const createTodo = async (req, res) => {
  const user = req.user;
  const { title, description, dueDate } = req.body;

  if (!title || !description | dueDate) {
    throw new BadRequestError("Please provide all the required fields.");
  }

  const todo = await Todo.create({
    title,
    description,
    dueDate,
    createdBy: user.userId,
  });

  res.status(StatusCodes.CREATED).json({ todo });
};

const updateTodo = async (req, res) => {
  const user = req.user;
  const todoId = req.params.id;
  const { title, description, dueDate } = req.body;

  if (!title || !description | dueDate) {
    throw new BadRequestError("Please provide all the required fields.");
  }

  const todo = await Todo.findOneAndUpdate(
    { _id: todoId, createdBy: user.userId },
    { title, description, dueDate },
    { new: true, runValidators: true }
  );

  if (!todo) throw new NotFoundError(`No todo with id ${todoId}`);

  res.status(StatusCodes.OK).json({ todo });
};

const deleteTodo = async (req, res) => {
  const user = req.user;
  const todoId = req.params.id;

  const todo = await Todo.findByIdAndDelete({
    _id: todoId,
    createdBy: user.userId,
  });

  if (!todo) throw new NotFoundError(`No todo with id ${todoId}`);

  res.status(StatusCodes.OK).send();
};

const toggleCompleted = async (req, res) => {
  const user = req.user;
  const todoId = req.params.id;

  const todo = await Todo.findOne({ _id: todoId, createdBy: user.userId });

  if (!todo) {
    throw new NotFoundError(`No todo with id ${todoId}`);
  }

  todo.isCompleted = !todo.isCompleted;

  await todo.save();

  res.status(StatusCodes.OK).json({ todo });
};

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleCompleted,
};
