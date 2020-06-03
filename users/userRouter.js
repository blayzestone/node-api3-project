const express = require("express");
const db = require("./userDb");

const router = express.Router();

router.post("/", (req, res) => {
  const user = {
    ...req.body,
    id: Date.now(),
  };
  db.insert(user).then((data) => res.status(201).json(data));
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

router.get("/", (req, res) => {
  db.get().then((data) => res.status(200).json(data));
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.getById(Number(id)).then((data) => res.status(200).json(data));
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.remove(Number(id)).then((data) => res.status(201).json(data));
});

router.put("/:id", (req, res) => {
  const { id } = req.params;

  db.getById(Number(id)).then((user) => {
    const updatedUser = {
      ...user,
      ...req.body,
    };
    db.update(Number(id), updatedUser)
      .then(() => res.status(201).json(updatedUser))
      .catch((err) => console.log(err));
  });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
