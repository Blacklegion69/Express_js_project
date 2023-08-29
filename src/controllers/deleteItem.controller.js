const databaseController = require("../helpers/databaseController.js");
const path = require("path");
const filename = path.join(__dirname, "../database/todos.txt");

const deleteItem = async (req, res) => {
  const worker = new databaseController(filename);
  const deleteResult = await worker.deleteItem(req.params.id);
  res.status(deleteResult.success === true ? 200 : 400).json({
    ...deleteResult,
  });
};

module.exports = deleteItem;
