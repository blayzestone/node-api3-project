const express = require("express");
const db = require("./userDb");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
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

router.get("/:id", validateUserId, (req, res) => {
  const { id } = req.params;
  db.getById(Number(id)).then((data) => res.status(200).json(data));
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/:id", validateUserId, (req, res) => {
  const { id } = req.params;
  db.remove(Number(id)).then((data) => res.status(201).json(data));
});

router.put("/:id", validateUserId, (req, res) => {
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
  const { id } = req.params;

  db.getById(Number(id)).then((user) => {
    if (user) {
      next();
    } else {
      res.status(400).json({ message: "invalid user id" });
    }
  });
}

function validateUser(req, res, next) {
  if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = router;
