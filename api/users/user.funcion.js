const pool = require("../../config/database");

let UserPerfil = (perfil, callBack) => {
    pool.query(
        `select * from perfilusuario where perfilUsuarioNombre = ?`,
        [perfil],
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0].perfilUsuarioID);
        }
    );
}
module.exports = {
    UserPerfil
}