const express = require("express");
const userRouter = require("./routes/users")

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use imported router for all user requests
app.use(userRouter)

app.listen(3000, () => console.log("Listening on :3000"));

// 200 - OK
// 201 - Created
// 204 - No Content
// 400 - Bad Request
// 401 - Unauthorized
// 403 - Forbidden
// 404 - Not Found
// 500 - Internal Server Error
