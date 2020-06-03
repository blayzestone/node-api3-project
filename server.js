const express = require("express");

const server = express();

server.use(express.json());

server.get("/", logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `${req.method} ${req.protocol}://${req.hostname}${req.path} ${new Date()}`
  );
  next();
}

module.exports = server;
