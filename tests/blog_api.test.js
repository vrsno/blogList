const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");

const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blogs");
const { title } = require("node:process");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("property id is defined", async () => {
  const response = await api.get("/api/blogs");
  const blogs = response.body;
  blogs.forEach((blog) => {
    assert.ok(blog.id);
  });
});

test("post a new blog", async () => {
  const newBlog = {
    title: "Un nuevo post",
    author: "Miguel",
    url: "https://miguelangelmartinez.info",
    likes: 9,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogAdded = await helper.blogsInDb();
  assert.strictEqual(blogAdded.length, helper.initialBlogs.length + 1);

  const content = blogAdded.map((blog) => blog.title);
  assert.ok(content.includes("Un nuevo post"));
});

test("blog without likes is added with default value 0", async () => {
  const newBlog = {
    title: "Un nuevo post",
    author: "Miguel",
    url: "https://miguelangelmartinez.info",
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.likes, 0);

  const blogAdded = await helper.blogsInDb();
  assert.strictEqual(blogAdded.length, helper.initialBlogs.length + 1);
});

test("blog without title returns 400 Bad Request", async () => {
  const newBlog = {
    author: "Miguelito",
    url: "https://miguelangelmartinez.info",
    likes: 9,
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(
    response.body.error,
    "Blog validation failed: title: Path `title` is required."
  );

  const blogAdded = await helper.blogsInDb();
  assert.strictEqual(blogAdded.length, helper.initialBlogs.length);
});

test("blog without url returns 400 Bad Request", async () => {
  const newBlog = {
    title: "Un nuevo post",
    author: "Miguelito",
    likes: 9,
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(
    response.body.error,
    "Blog validation failed: url: Path `url` is required."
  );

  const blogAdded = await helper.blogsInDb();
  assert.strictEqual(blogAdded.length, helper.initialBlogs.length);
});

after(async () => {
  await mongoose.connection.close();
});
