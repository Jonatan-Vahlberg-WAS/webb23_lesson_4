const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const users = [
  { name: "Per", id: 1, isTeacher: false },
  { name: "Matilda", id: 2, isTeacher: true },
  { name: "Rut", id: 2, isTeacher: false },
];

//! CRUD - views

// Create
app.post("/api/v1/users", (req, res) => {
  //TODO: create user return 201
  //TODO: if invalid return 400
});

// Read
app.get("/api/v1/users", (req, res) => {
  //TODO: get users
  //TODO: filter on property
});

app.get("/api/v1/users/:id", (req, res) => {
  //TODO: get user on id
  //TODO: otherwise return 404
});

// Update
app.put("/api/v1/users/:id", (req, res) => {
  //TODO: update user on id
  //TODO: if invalid return 400
  //TODO: otherwise return 404
});

// Delete
app.delete("/api/v1/users/:id", (req, res) => {
  //TODO: delete user on id return 204
  //TODO: otherwise return 404
});

app.listen(3000, () => console.log("Listening on :3000"))


// 200 - OK
// 201 - Created
// 204 - No Content
// 400 - Bad Request
// 401 - Unauthorized
// 403 - Forbidden
// 404 - Not Found
// 500 - Internal Server Error