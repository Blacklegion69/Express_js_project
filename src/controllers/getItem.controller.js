const databaseController = require("../helpers/databaseController.js");
const path = require("path");
const filename = path.join(__dirname, "../database/todos.txt");

const getItem = async (req, res) => {
  const worker = new databaseController(filename);
  const getItemResult = await worker.singleItem(req.params.id);

  res.status(getItemResult.success === true ? 200 : 400).json({
    ...getItemResult,
  });
};

module.exports = getItem;
