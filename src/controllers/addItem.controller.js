const databaseController = require("../helpers/databaseController.js");
const path = require("path");
const filename = path.join(__dirname, "../database/todos.txt");
const duplicateDatabase = path.join(__dirname, "../database/duplicateDb.txt");

const addItem = async (req, res) => {
  const todo = {
    uuid: req.body.uuid,
    // uuid: crypto.randomUUID(),
    title: req.body.title,
    description: req.body.description,
    checked: req.body.checked || false,
    lastUpdated: new Date().toLocaleString(),
    change_history: [],
  };
  if (todo.title.length > 1 && todo.description.length > 1) {
    const workerTwo = new databaseController(duplicateDatabase);
    const worker = new databaseController(filename);
    const addInDuplicateDb = await workerTwo.addItem(todo);
    const addResult = await worker.addItem(todo);

    res.status(addResult.success === true ? 200 : 400).json({
      ...addResult,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Title and description length must be greaterthan 1",
    });
  }
};

module.exports = addItem;
