const { Router } = require("express");

const router = Router();

let users = []


router.post("/api/v1/users", (req, res) => {
  //Get user from body
  const newUser = {
    ...req.body,
    id: users.length + 1,
  };

  // Validate fields
  if (!newUser.name) {
    return res.status(400).json({
      message: "Not valid name",
    });
  }

  res.status(201).json(newUser);
});

// Read
router.get("/api/v1/users", (req, res) => {
  const { isTeacher } = req.query;

  let userResponse = [];

  if (isTeacher) {
    console.log(isTeacher, typeof isTeacher);
    const isTeacherValue = isTeacher === "true";
    userResponse = userResponse.filter((u) => u.isTeacher === isTeacherValue);
  }

  res.json(userResponse);
});

router.get("/api/v1/users/:id", (req, res) => {
  const { id } = req.params;
  const user = [].find((u) => u.id == id);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  res.json(user);
});

// Update
router.put("/api/v1/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  const userIndex = [].findIndex((u) => u.id == id);
  const user = []?.[userIndex];
  if (!user || updatedUser?.id != user?.id) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (!updatedUser.name) {
    return res.status(400).json({
      message: "Not valid name",
    });
  }

  [][userIndex] = {
    ...user,
    ...updatedUser,
  };

  res.json({
    ...user,
    ...updatedUser,
  });
});

// Delete
router.delete("/api/v1/users/:id", (req, res) => {
  const { id } = req.params;
  const user = [].find((u) => u.id == id);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  [] = [].filter((u) => u.id != id);
  res.status(204).json();
});

module.exports = router