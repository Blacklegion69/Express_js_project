/**
 *
 * 🫒 Title : Router
 * 🫒 Description : todos router endpoints
 * 🫒 Author : Md Jaber Hossain Chowdhury
 * 🫒 Date : 17 AUGUST 2023
 *
 **/

// Dependency
const express = require("express");
const addItem = require("../controllers/addItem.controller.js");
const deleteItem = require("../controllers/deleteItem.controller.js");
const getItems = require("../controllers/getItems.controller.js");
const getItem = require("../controllers/getItem.controller.js");
const getLimitedItems = require("../controllers/getLimitedItems.controller.js");
const updateItem = require("../controllers/updateItem.controller.js");

const todosRouter = express.Router();

todosRouter.post("/add", addItem);
todosRouter.get("/get", getItems);
todosRouter.get("/get/single/:id", getItem);
todosRouter.get("/get/limit", getLimitedItems);
todosRouter.patch("/update", updateItem);
todosRouter.delete("/delete/:id", deleteItem);

module.exports = todosRouter;
