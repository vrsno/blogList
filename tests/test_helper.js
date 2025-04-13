const Blog = require("../models/blogs");
const { favoriteBlog } = require("../utils/list_helper");

const initialBlogs = [
  {
    title: "Primer post",
    author: "Miguelito",
    url: "https://miguelangelmartinez.info",
    likes: 9999,
    id: "67f5a24e886e025030bae845",
  },
];

const nonExistingId = async () => {
  const Blog = new favoriteBlog({
    title: "willremovethissoon",
    author: "none",
    url: "https://fullstackopen.com/es",
    likes: 0,
  });
  await Blog.save();
  await Blog.deleteOne();

  return Blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
