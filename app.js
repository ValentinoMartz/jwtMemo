//
//https://www.youtube.com/watch?v=cL3bXzUBFUA&ab_channel=CodigoMentor

const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/api", (req, res) => {
  res.json({
    mensaje: "NodeJS and JWT",
  });
});

app.post("/api/login", (req, res) => {
  const user = {
    id: 1,
    nombre: "Valentino",
    email: "vale@gmail.com",
  };

  jwt.sign({ user }, "secretKey", { expiresIn: "32s" }, (err, token) => {
    res.json({
      token,
    });
  });
});

app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretKey", (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      res.json({
        mensaje: "Post created",
        authData,
      });
    }
  });
});

// Authorization: Bearer <token>
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

app.listen(3000, function () {
  console.log("jws running...");
});
