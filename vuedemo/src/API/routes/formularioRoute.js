module.exports = function(app) {
  const controller = require("../controllers/formularioController");
  // routes
  app
    .route("/formularios")
    .get(controller.READ_ALL)
    .post(controller.CREATE);
  app
    .route("/formularios/readById")
    .post(controller.READ_BY_ID)
    .put(controller.UPDATE);
};
