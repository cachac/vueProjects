module.exports = function(app) {
  const controller = require("../controllers/userController");
  // routes
  app.route("/users").get(controller.GET_ALL);
};
