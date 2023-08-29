/**
 *
 * 🫒 Title : Router
 * 🫒 Description : deletedTodos router endpoints
 * 🫒 Author : Md Jaber Hossain Chowdhury
 * 🫒 Date : 19 AUGUST 2023
 *
 **/

// Dependency
const express = require("express");
const getDeletedItem = require("../controllers/getDeletedItem.controller.js");
const getDeletedItems = require("../controllers/getDeletedItems.controller.js");
const recoverItem = require("../controllers/recoverItem.controller.js");
const getLimitedDeletedItems = require("../controllers/getLimitedDeletedItems.controller.js");
const deleteDeletedItem = require("../controllers/deleteDeletedItem.controller.js");

const deletedTodosRouter = express.Router();

deletedTodosRouter.get("/get", getDeletedItems);
deletedTodosRouter.get("/get/single/:id", getDeletedItem);
deletedTodosRouter.get("/get/limit", getLimitedDeletedItems);
deletedTodosRouter.delete("/delete/:id", deleteDeletedItem);
deletedTodosRouter.delete("/recover/:id", recoverItem);

module.exports = deletedTodosRouter;
