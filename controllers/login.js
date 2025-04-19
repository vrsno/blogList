const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/users");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const passwordCorrect = await bcrypt.compareSync(password, user.passwordHash); // ← sincrónico, y funciona

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  //token generado 1 hjora expiraciuon
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });
  console.log("Token generado:", token);
  console.log("Usuario:", userForToken); // ← usuario para el token
  console.log("Usuario encontrado:", user); // ← usuario encontrado en la base de datos
  console.log("Contraseña correcta:", passwordCorrect); // ← contraseña correcta
  response.status(200).send({
    token,
    username: user.username,
    name: user.name,
  });
});

module.exports = loginRouter;
