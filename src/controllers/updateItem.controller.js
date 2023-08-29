const databaseController = require("../helpers/databaseController.js");
const path = require("path");
const filename = path.join(__dirname, "../database/todos.txt");

const updateItem = async (req, res) => {
  const worker = new databaseController(filename);
  const todo = {
    uuid: req.body.uuid,
    title: req.body.title,
    description: req.body.description,
    checked: req.body.checked || false,
    lastUpdated: req.body.lastUpdated,
    change_history: req.body.change_history || [],
  };
  const updateResult = await worker.updateItem(todo);

  res.status(200).json({
    ...updateResult,
  });
};

module.exports = updateItem;
