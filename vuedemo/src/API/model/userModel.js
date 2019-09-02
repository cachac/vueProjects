var mysqlConnection = require("../database");

//object constructor
const User = function(user) {
  this.id = user.id;
  this.nombre = user.nombre;
  this.cedula = user.cedula;
  this.correo = user.correo;
  this.usuario = user.usuario;
  this.passwd = user.passwd;
  this.empresa = user.empresa;
  this.fechaCreacion = user.fechaCreacion;
};

User.readAll = function(result) {
  mysqlConnection.query(
    "select * from control_acceso_cdc_dbp.usuario_n order by fechaCreacion desc limit 10;",
    function(err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

User.readById = function(id, result) {
  mysqlConnection.query(
    "SELECT id, usuario, passwd, cedula, nombre, correo, empresa, estado FROM usuario_n WHERE id = ?",
    id,
    function(err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

User.create = function(_new, result) {
  const uuid = require("uuid/v1");
  _new.id = uuid();
  mysqlConnection.query("INSERT INTO usuario_n set ?", _new, function(err) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, _new);
    }
  });
};

User.checkUsername = function(username, result) {
  mysqlConnection.query(
    "SELECT count(*) as resultado FROM usuario_n WHERE usuario = ?",
    username,
    function(err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res[0].resultado);
      }
    }
  );
};

User.update = function(id, _obj, result) {
  mysqlConnection.query(
    "UPDATE usuario_n SET ? WHERE id = ?",
    [_obj, id],
    function(err) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, _obj);
      }
    }
  );
};

User.delete = function(id, result) {
  mysqlConnection.query("DELETE FROM usuario_n WHERE id = ?", id, function(
    err
  ) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, id);
    }
  });
};

module.exports = User;
