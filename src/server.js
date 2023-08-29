/**
 *
 * 🫒 Title : server
 * 🫒 Description : listening on the server port
 * 🫒 Author : Md Jaber Hossain Chowdhury
 * 🫒 Date : 17 AUGUST 2023
 *
 **/

// Dependency
const app = require("./app.js");
const { PORT } = require("./secret.js");

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
