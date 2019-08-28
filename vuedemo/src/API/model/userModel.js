//import mysqlConnection from "../database";
var mysqlConnection = require("../database");

//object constructor
const User = function(user) {
  this.id = user.id;
  this.nombre = user.nombre;
  this.cedula = user.cedula;
};

User.getAll = function(result) {
  mysqlConnection.query(
    "select * from control_acceso_cdc_dbp.usuario_n limit 10;",
    function(err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        console.log("Sending DATA...");
        result(null, res);
      }
    }
  );
};

module.exports = User;
