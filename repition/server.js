const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let users = [
  { name: "Per", id: 1, isTeacher: false },
  { name: "Matilda", id: 2, isTeacher: true },
  { name: "Rut", id: 2, isTeacher: false },
];

//! CRUD - views

// Create
app.post("/api/v1/users", (req, res) => {
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
app.get("/api/v1/users", (req, res) => {
  const { isTeacher } = req.query;

  let userResponse = [...users];

  if (isTeacher) {
    console.log(isTeacher, typeof isTeacher);
    const isTeacherValue = isTeacher === "true";
    userResponse = userResponse.filter((u) => u.isTeacher === isTeacherValue);
  }

  res.json(userResponse);
});

app.get("/api/v1/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u.id == id);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  res.json(user);
});

// Update
app.put("/api/v1/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

    const userIndex = users.findIndex((u) => u.id == id);
    const user = users?.[userIndex];
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

  users[userIndex] = {
    ...user,
    ...updatedUser,
  };

  res.json({
    ...user,
    ...updatedUser,
  });
});

// Delete
app.delete("/api/v1/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u.id == id);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  users = users.filter((u) => u.id != id);
  res.status(204).json();
});

app.listen(3000, () => console.log("Listening on :3000"));

// 200 - OK
// 201 - Created
// 204 - No Content
// 400 - Bad Request
// 401 - Unauthorized
// 403 - Forbidden
// 404 - Not Found
// 500 - Internal Server Error
