const pool = require("../../config/database");

module.exports = {
  getUsers: callBack => {
    pool.query(
      `select * from loginusuario`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getUserPerfil: callBack => {
    pool.query(
      `select * from perfilusuario`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `select * from loginusuario where loginUsuarioNikName = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getUserById: (id, callBack) => {
    pool.query(
      `select * from loginusuario where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getUserByPerfil: (perfil, callBack) => {
    pool.query(
      `select * from perfilusuario where perfilUsuarioNombre = ?`,
      [perfil],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  create: (data, callBack) => {
    pool.query(
      `insert into loginusuario(perfilUsuarioID,loginUsuarioNikName,loginUsuarioPassword,loginUsuarioFullName,loginUsuarioEstado)
                values(?,?,?,?,?,?)`,
      [data.idperfil,data.email,data.password,data.nombres, data.estado],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  Anfitrion: (data, callBack) => {
    pool.query(
      `insert into anfitrion(_loginUsuarioID,
                              anfitrionNombres,
                              anfitrionApellidos,
                              anfitrionDescripcion,
                              anfitrionEstado,
                              afitrionFechaAlta,
                              anfitrionFechaAprobacion,
                              anfitrionTelefono,
                              anfitrionWhatsApp,
                              anfitrionEmail,
                              anfitrionDireccion,
                              anfitrionFacebook,
                              anfitrionInstagram,
                              website,
                              coordenadas,
                              tipoAnfitrionID,
                              ciudadID)
                values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                 [data.loginusuario_loginUsuarioID,
                  data.anfitrionNombres,
                  data.anfitrionApellidos,
                  data.anfitrionDescripcion,
                  data.anfitrionEstado,
                  data.afitrionFechaAlta,
                  data.anfitrionFechaAprobacion,
                  data.anfitrionTelefono,
                  data.anfitrionWhatsApp,
                  data.anfitrionEmail,
                  data.anfitrionDireccion,
                  data.anfitrionFacebook,
                  data.anfitrionInstagram,
                  data.website,
                  data.coordenadas,
                  data.tipoAnfitrionID,
                  data.ciudadID],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  Turista: (data, callBack) => {
    pool.query(
      `insert into turista(
        turistaID,
        loginUsuarioID,
        paisID,
        ciudadID,
        turistaNombres,
        turistaApellidos,
        turistaTelefono,
        turistaEmail)
         values(?,?,?,?,?,?,?,?)`,
      [
        data.turistaID,
        data.loginUsuarioID,
        data.paisID,
        data.ciudadID,
        data.turistaNombres,
        data.turistaApellidos,
        data.turistaTelefono,
        data.turistaEmail
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },



/*   updateUser: (data, callBack) => {
    pool.query(
      `update registration set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id = ?`,
      [
        data.first_name,
        data.last_name,
        data.gender,
        data.email,
        data.password,
        data.number,
        data.id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  deleteUser: (data, callBack) => {
    pool.query(
      `delete from registration where id = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  } */
};
