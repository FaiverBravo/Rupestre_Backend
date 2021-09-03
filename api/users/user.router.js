const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  createUser,
  login,
  getUserById,
  getUsers,
  createAnfitrion,
  createTurista,
  getUserByPerfil,
  getUserPerfil,
  /*updateUsers,
  deleteUser*/
} = require("./user.controller");

router.post("/login", login);
router.post("/", createUser);
router.post("/anfitrion", createAnfitrion);
router.post("/turista", createTurista);

router.get("/", getUsers);
router.get("/perfil/:perfil", getUserByPerfil);
router.get("/perfil", getUserPerfil);
router.get("/:id", checkToken, getUserById);

/* router.patch("/", checkToken, updateUsers);
router.delete("/", checkToken, deleteUser); */

module.exports = router;
