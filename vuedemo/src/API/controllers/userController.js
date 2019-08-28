const model = require("../model/userModel");

exports.GET_ALL = function(req, res) {
  model.getAll(function(err, user) {
    if (err) res.send("err");
    //console.log("res", user);
    res.send(user);
  });
};
