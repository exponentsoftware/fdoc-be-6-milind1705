const express = require("express");
const router = express.Router();

const todo = require("../controller/todoController");
const checkAuth = require("../middleware/checkAuth");

router.post("/:id", todo.createTodo);
router.get("/", todo.getAllTodo);
router.get("/title", todo.getAllTodoByTitle);
router.get("/sort", todo.getAllTodoSort);
router.put("/:id", todo.updateTodo);
router.put("/done/:id", todo.doneTodo);
router.get("/completed", todo.getCompletedTodo);
router.get("/:id", todo.getTodoById);
router.delete("/:id", todo.deletTodoById);

module.exports = router;
