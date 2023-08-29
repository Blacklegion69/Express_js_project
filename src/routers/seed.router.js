const express = require("express");

const reset = require("../controllers/reset.controller.js");
const info = require("../controllers/info.controller.js");

const seedRouter = express.Router();

seedRouter.get("/seed", reset);
seedRouter.get("/info", info);

module.exports = seedRouter;
