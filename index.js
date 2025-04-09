require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Blog = require("./models/blogs");

const app = require("./app");
const config = require("./utils/config");
const logger = require("./utils/logger");
const errorHandler = require("./utils/middleware").errorHandler;

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});

app.use(cors());
app.use(express.json());

app.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

app.use(errorHandler);
