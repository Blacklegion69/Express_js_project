/**
 *
 * 🫒 Title : app block
 * 🫒 Description : created the server and handling routers
 * 🫒 Author : Md Jaber Hossain Chowdhury
 * 🫒 Date : 17 AUGUST 2023
 *
 **/

// Dependency
const express = require("express");
const cors = require("cors");
const xssClean = require("xss-clean");
const expressRateLimit = require("express-rate-limit");
const morgan = require("morgan");
const createError = require("http-errors");
const todosRouter = require("./routers/todos.router.js");
const deletedTodosRouter = require("./routers/deletedTodos.router.js");
const seedRouter = require("./routers/seed.router.js");

// initializing app opject
const app = express();

// initializing express-rate-limit
const rate_limit = expressRateLimit({
  windowMs: 1000 * 60 * 1,
  max: 80,
  message: {
    success: false,
    message:
      "You reached the limit of api call within 1 minutes try again later",
  },
});

// middlewares
app.use(cors());
app.use(xssClean());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rate_limit);
app.use(morgan("dev"));

// home route endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the server home endpoint",
  });
});

// api middlewares
app.use("/api/v1/todos", todosRouter);
app.use("/api/v1/deleted", deletedTodosRouter);
app.use("/api/v1/admin", seedRouter);

// handling client errors
app.use((req, res, next) => {
  next(createError(404, `route ${req.path} doesn't exist`));
});

// handling server errors
app.use((error, req, res, next) => {
  return res.status(error.status || 400).json({
    success: false,
    message: error.message,
  });
});

module.exports = app;
