const databaseController = require("../helpers/databaseController.js");
const path = require("path");
const filename = path.join(__dirname, "../database/todos.txt");

const getLimitedDeletedItems = async (req, res) => {
  const worker = new databaseController(filename);
  const database = await worker.readDatabase();
  const todos = database.deletedItems;

  const final = todos.slice(0, parseFloat(req.query.count));

  res.status(200).json({
    success: true,
    message:
      todos.length > parseFloat(req.query.count)
        ? "data served"
        : "our data is limited",
    todos: final,
  });
};

module.exports = getLimitedDeletedItems;
