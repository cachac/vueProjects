const model = require("../model/userModel");

exports.READ_ALL = function(req, res) {
  model.readAll(function(err, model) {
    if (err) res.status(500).send(err);
    else res.send(model);
  });
};

exports.READ_BY_ID = function(req, res) {
  model.readById(req.params.id, function(err, model) {
    if (err) res.status(500).send(err);
    else res.send(model);
  });
};

exports.CREATE = function(req, res) {
  const _new = new model(req.body);
  // Validaciones
  let errFields = {};
  if (!validate(_new, errFields))
    res.status(400).send({
      error: true,
      message: errFields
    });
  else
    model.create(_new, function(err, model) {
      if (err) res.status(500).send(err);
      else res.send({ status: "OK", id: model.id });
    });
};

exports.CHECK_USERNAME = function(req, res) {
  model.checkUsername(req.params.username, function(err, isUnique) {
    if (err) res.status(500).send(err);
    else {
    //   console.log("express isUnique: ", isUnique);
    //   let results = JSON.parse(JSON.stringify(isUnique));
    //   console.log("express isUnique2: ", results);
      if (isUnique == 0) res.send({ isUnique: true });
      else res.send({ isUnique: false });
      //res.send(isUnique);
    }
  });
};

exports.UPDATE = function(req, res) {
  const _obj = new model(req.body);
  // validaciones
  let errFields = {};
  if (!validate(_obj, errFields))
    res.status(400).send({
      error: true,
      message: errFields
    });
  else
    model.update(req.params.id, _obj, function(err, model) {
      if (err) res.status(500).send(err);
      else res.send({ status: "OK", id: model.id });
    });
};

exports.DELETE = function(req, res) {
  model.delete(req.params.id, function(err, modelId) {
    if (err) res.status(500).send(err);
    else res.send({ status: "OK", id: modelId });
  });
};

function validate(_obj, errFields) {
  let invalid = false;
  let key = "Error fields";
  errFields[key] = [];
  if (!_obj.usuario) {
    invalid = true;
    let field = { usuario: "requerido" };
    errFields[key].push(field);
  }
  if (!_obj.passwd) {
    invalid = true;
    let field = {
      passwd: "requerido"
    };
    errFields[key].push(field);
  }
  if (invalid) return false;
  return true;
}
