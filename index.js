require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Blog = require("./models/blogs");
const User = require("./models/users");

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

app.get("/api/users", (req, res) => {
  User.find({}).then((users) => {
    res.json(users);
  });
});

app.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.get("/api/blogs/:id", (request, response, next) => {
  const id = request.params.id;
  Blog.findById(id)
    .then((blog) => {
      if (blog) {
        response.json(blog);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/blogs/:id", (request, response, next) => {
  const id = request.params.id;
  Blog.findByIdAndDelete(id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
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

//cambiar likes
app.put("/api/blogs/:id", (request, response, next) => {
  const { likes } = request.body;

  Blog.findByIdAndUpdate(
    request.params.id,
    { likes },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedBlog) => {
      if (updatedBlog) {
        response.json(updatedBlog);
      } else {
        response.status(404).send({ error: "Blog not found" });
      }
    })
    .catch((error) => next(error));
});

app.use(errorHandler);
