const databaseController = require("../helpers/databaseController.js");
const path = require("path");
const filename = path.join(__dirname, "../database/todos.txt");

const deleteDeletedItem = async (req, res) => {
  const worker = new databaseController(filename);
  const deleteResult = await worker.deleteDeletedItem(req.params.id);
  res.status(deleteResult.success === true ? 200 : 400).json({
    ...deleteResult,
  });
};

module.exports = deleteDeletedItem;
