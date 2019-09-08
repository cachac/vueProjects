module.exports = function(app) {
  const controller = require("../controllers/bitacoraController");
  // routes
  app
    .route("/bitacora")
    .get(controller.READ_ALL)
    .post(controller.CREATE);
  app.route("/bitacora/readById").post(controller.READ_BY_ID);
};
