module.exports = function(app) {
  const controller = require("../controllers/userController");
  // routes
  app
    .route("/users")
    .get(controller.READ_ALL)
    .post(controller.CREATE);
  app.route("/users/readById").post(controller.READ_BY_ID);
  //   app
  //     .route("/users/:id")
  //     .get(controller.READ_BY_ID)
  //     .put(controller.UPDATE)
  //     .delete(controller.DELETE);
  app.route("/users/check/:username").get(controller.CHECK_USERNAME);
};
