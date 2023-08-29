const databaseController = require("./helpers/databaseController");
const path = require("path");

const filename = path.join(__dirname, "./database/todos.txt");

const worker = new databaseController(filename);

const test = async () => {
  console.log("🧄🧄🧄🧄 database 🧄🧄🧄🧄");
  const db = await worker.readDatabase();
  console.log(db);
};

test();
console.log(worker);
