/**
 *
 * 🫒 Title : reset everything
 * 🫒 Description : reset everything for seeding
 * 🫒 Author : Md Jaber Hossain Chowdhury
 * 🫒 Date : 22 AUGUST 2023
 *
 **/

// Dependency
const databaseController = require("../helpers/databaseController");

const path = require("path");
const filename = path.join(__dirname, "../database/todos.txt");

const info = async (req, res) => {
  const worker = new databaseController(filename);
  const todos = await worker.items();
  const todosLength = todos.length;

  const deletedItems = await worker.deletedItems();
  const deletedItemsLength = deletedItems.length;

  const database = await worker.readDatabase();

  let result = {};
  const dipl = database.items_popularity;
  for (let i = 0; i < dipl.length; i++) {
    result[dipl[i]] = (result[dipl[i]] || 0) + 1;
  }
  const final = Object.entries(result).map((each) => {
    return {
      uuid: each[0],
      count: each[1],
    };
  });
  res.status(200).json({
    success: true,
    information: {
      total_todo: todosLength,
      total_deletedTodos: deletedItemsLength,
      items_popularity: database.items_popularity,
      more: final,
    },
  });
};

module.exports = info;
