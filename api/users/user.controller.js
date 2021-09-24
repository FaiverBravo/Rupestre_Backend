const {
  create,
  Anfitrion,
  Turista,
  getUserByUserEmail,
  getUserById,
  getUsers,
  getUserPerfil,
  getUserByPerfil,
  updateUser,
  deleteUser 
} = require("./user.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { UserPerfil } = require("./user.funcion");

module.exports = {
  login: (req, res) => {
    const body = req.body;
    getUserByUserEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 101,
          data: "Invalid email"
        });
      }
      const result = compareSync(body.password, results.loginUsuarioPassword);
      if (result) {
      //  results.password = undefined;
        const jsontoken = sign({ result: results },
          process.env.JWT_KEY, {
          expiresIn: "1h"
        });
        return res.json({
          success: 100,
          id: results.loginUsuarioID,
          loginUsuario: results.loginUsuarioNikName,
          loginUsuarioName: results.loginUsuarioFullName,
          loginUsuarioAvatar: results.loginUsuarioAvatar,
          message: "login successfully",
          token: jsontoken
        });
      } else {
        return res.json({
          success: 102,
          data: "Invalid password"
        });
      }
    });
  },

  createUser: (req, res) => {
    const body = req.body;
    getUserByUserEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!!results) {
        return res.status(402).json({
          success: 101,
          data: "Invalid email"
        });
      }
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      create(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection errror"
          });
        }
        const jsontoken = sign({ result: results },
          process.env.JWT_KEY, {
          expiresIn: "1h"
        });
        return res.status(200).json({
          success: 100,
          id: results.insertId,
          loginUsuario: body.email,
          loginUsuarioName: body.email,
          message: "login successfully",
          token: jsontoken
        });
      });
      // fin getUserByUserEmail
    }); 
  },

  getUserById: (req, res) => {
    const id = req.params.id;
    getUserById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found"
        });
      }
      results.password = undefined;
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },

  getUserPerfil: (req, res) => {
    getUserPerfil((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },

   createAnfitrion: (req, res) => {
     const body = req.body;
    Anfitrion(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 101,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 100,
        data: results
      });
    });
  },

  createTurista: (req, res) => {
    const body = req.body;
    Turista(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },

  getUserByPerfil: (req, res) => {
    const perfil = req.params.perfil;
    getUserByPerfil(perfil, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },



/*   updateUsers: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "updated successfully"
      });
    });
  }, */


/*   deleteUser: (req, res) => {
    const data = req.body;
    deleteUser(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record Not Found"
        });
      }
      return res.json({
        success: 1,
        message: "user deleted successfully"
      });
    });
  } */
};


