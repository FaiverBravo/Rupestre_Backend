require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const adminRouter = require("./api/administrador/admin.router");

app.use(express.json());

app.use("/api/users", userRouter);
//app.use("/api/admin", adminRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("servidor corriendo en PUERTO :", port);
});
