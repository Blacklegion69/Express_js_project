const databaseController = require("../helpers/databaseController.js");
const path = require("path");
const filename = path.join(__dirname, "../database/todos.txt");

const getDeletedItem = async (req, res) => {
  const worker = new databaseController(filename);
  const getItemResult = await worker.singleDeletedItem(req.params.id);

  res.status(getItemResult.success === true ? 200 : 400).json({
    ...getItemResult,
  });
};

module.exports = getDeletedItem;
