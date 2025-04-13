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

app.get("/", (req, res) => {
  res.send("<h1>¡Servidor en ejecución!</h1>");
});

app.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post("/api/blogs", (request, response) => {
  const body = request.body;

  if (body.likes === undefined) {
    return response.status(400).json({ error: "likes missing" });
  }

  if (body.title === undefined || body.url === undefined) {
    return response.status(400).json({ error: "title or url missing" });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });

  blog.save().then((savedBlog) => {
    response.status(201).json(savedBlog);
  });
});

app.use(errorHandler);
