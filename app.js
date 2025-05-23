const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const cors = require("cors");

const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blog");
const app = express();
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const userRouter = require("./controllers/user");
const loginRouter = require("./controllers/login");

mongoose.set("strictQuery", false);
logger.info("connecting to", config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
