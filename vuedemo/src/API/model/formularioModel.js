var mysqlConnection = require("../database");

//object constructor
const Formulario = function(formulario) {
  this.id = formulario.id;
  this.idTramitante = formulario.idTramitante;
  this.idAutorizador = formulario.idAutorizador;
  this.idResponsable = formulario.idResponsable;
  this.idEstado = formulario.idEstado;
  this.idSala = formulario.idSala;
  this.consecutivo = formulario.consecutivo;
  this.fechaSolicitud = formulario.fechaSolicitud;
  this.fechaIngreso = formulario.fechaIngreso;
  this.fechaSalida = formulario.fechaSalida;
  this.motivoVisita = formulario.motivoVisita;
  this.otrosDetalles = formulario.otrosDetalles;
};

Formulario.readAll = function(result) {
  mysqlConnection.query(
    "select * from control_acceso_cdc_dbp.formulario order by fechaSolicitud desc;",
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

Formulario.readById = function(id, result) {
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

Formulario.create = function(_new, result) {
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

Formulario.checkUsername = function(username, result) {
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

Formulario.update = function(id, _obj, result) {
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

Formulario.delete = function(id, result) {
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

module.exports = Formulario;
