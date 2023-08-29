const databaseController = require("../helpers/databaseController.js");
const path = require("path");
const filename = path.join(__dirname, "../database/todos.txt");

const recoverItem = async (req, res) => {
  const worker = new databaseController(filename);
  const recoverResult = await worker.recoverDeletedItem(req.params.id);
  console.log(recoverResult);
  res.status(recoverResult.success === true ? 200 : 400).json({
    ...recoverResult,
  });
};

module.exports = recoverItem;
