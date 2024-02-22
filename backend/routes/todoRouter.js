const express = require("express");
const router = express.Router();

const {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleCompleted,
} = require("../controllers/todoController");

router.get("/", getAllTodos);
router.post("/", createTodo);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteTodo);
router.patch("/:id/toggleCompleted", toggleCompleted);

module.exports = router;
