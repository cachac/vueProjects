module.exports = function(app) {
  const controller = require("../controllers/userController");
  // routes
  app
    .route("/users")
    .get(controller.READ_ALL)
    .post(controller.CREATE);
  app
    .route("/users/:id")
    .get(controller.READ_BY_ID)
    .put(controller.UPDATE)
    .delete(controller.DELETE);
};
