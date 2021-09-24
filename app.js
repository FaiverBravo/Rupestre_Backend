require("dotenv").config();
const express = require("express");
var cors = require('cors')
const app = express();

app.use(cors())

const userRouter = require("./api/users/user.router");
// const adminRouter = require("./api/administrador/admin.router");

app.use(express.json());

app.use("/api/users", userRouter);
//app.use("/api/admin", adminRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server corriendo en PUERTO :", port);
});
