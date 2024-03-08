const { Router } = require("express");
const {
  writeDatabaseFile,
  readDatabaseFile,
} = require("../utils/databaseHelpers");

const uuid = require("uuid");
const { validateUser } = require("../utils/validationHelpers");

const router = Router();

const databasePath = "./database/users.json";

router.post("/api/v1/users", async (req, res) => {
  //Get user from body

  const newUser = {
    ...req.body,
    id: uuid.v4(),
  };

  // Validate fields
  const [errors, hasErrors] = validateUser(newUser);
  if (hasErrors) {
    return res.status(400).json({
      data: errors,
    });
  }

  try {
    let users = await readDatabaseFile(databasePath);
    users.push(newUser);
    await writeDatabaseFile(databasePath, users);
    res.status(201).json(newUser);
  } catch (error) {
    console.warn("Error creating user", error);
    res.status(500).json({
      message: error,
    });
  }
});

// Read
router.get("/api/v1/users", async (req, res) => {
  const { isTeacher } = req.query;
  const users = await readDatabaseFile(databasePath);
  let userResponse = [...users];

  if (isTeacher) {
    console.log(isTeacher, typeof isTeacher);
    const isTeacherValue = isTeacher === "true";
    userResponse = userResponse.filter((u) => u.isTeacher === isTeacherValue);
  }

  res.json(userResponse);
});

router.get("/api/v1/users/:id", async (req, res) => {
  const { id } = req.params;
  const users = await readDatabaseFile(databasePath);

  const user = users.find((u) => u.id == id);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  res.json(user);
});

// Update
router.put("/api/v1/users/:id", async (req, res) => {
  const { id } = req.params;
  const userBody = req.body;

  const [errors, hasErrors] = validateUser(userBody);
  if (hasErrors) {
    return res.status(400).json({
      data: errors,
    });
  }

  let users = [];
  try {
    users = await readDatabaseFile(databasePath);
  } catch (error) {
    console.warn("Error in updating user", error);
    res.status(500).json({
      message: error,
    });
  }

  const userIndex = users.findIndex((u) => u.id == id);
  const user = users?.[userIndex];
  if (!user || userBody?.id != user?.id) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const updatedUser = {
    ...user,
    ...userBody,
  };
  users[userIndex] = updatedUser;

  try {
    await writeDatabaseFile(databasePath, users);
  } catch (error) {
    console.warn("Error in updating user", error);
    res.status(500).json({
      message: error,
    });
  }

  res.json(updatedUser);
});

// Delete
router.delete("/api/v1/users/:id", async (req, res) => {
  const { id } = req.params;
  let users = await readDatabaseFile(databasePath);
  const user = users.find((u) => u.id == id);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  users = users.filter((u) => u.id != id);
  try {
    await writeDatabaseFile(databasePath, users);
    res.status(204).json();
  } catch (error) {
    console.warn("Error in deleting user", error);
    res.status(500).json({
      message: error,
    });
  }
});

module.exports = router;
