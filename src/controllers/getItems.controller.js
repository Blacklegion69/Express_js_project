const databaseController = require("../helpers/databaseController.js");
const path = require("path");
const filename = path.join(__dirname, "../database/todos.txt");

const getItems = async (req, res) => {
  const worker = new databaseController(filename);
  const database = await worker.readDatabase();
  const todos = database.items;
  res.status(200).json({
    success: true,
    todos: todos || [{ message: "something is wrong" }],
  });
};

module.exports = getItems;
