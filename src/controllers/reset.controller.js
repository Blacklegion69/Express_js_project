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

const reset = async (req, res) => {
  const worker = new databaseController(filename);

  const generateItem = (title, description, checked) => {
    return {
      title,
      description,
      checked,
      uuid: crypto.randomUUID(),
      lastUpdated: new Date().toLocaleString(),
      change_history: [],
    };
  };
  const someItems = [];
  someItems.push(
    generateItem("Reading a book", "Reading a book about future", false),
  );
  someItems.push(
    generateItem(
      "Revision animejs",
      "Revision animejs so that I can use it for reactjs",
      false,
    ),
  );
  someItems.push(
    generateItem(
      "Typescript nodejs",
      "Learn how to use typescript with nodejs code so that we can bundlethem in single file",
      false,
    ),
  );
  const someDeletedItems = [];
  someDeletedItems.push(
    generateItem(
      "Life is awesome",
      "Yeah!!! life is so beautiful as it hard",
      true,
    ),
  );

  const database = await worker.readDatabase();
  database.items = someItems;
  database.deletedItems = someDeletedItems;
  database.items_popularity = [];

  const saveDatabase = await worker.saveDatabase(database);

  res.status(200).json({
    someItems,
    someDeletedItems,
    saveDatabase,
  });
};

module.exports = reset;
