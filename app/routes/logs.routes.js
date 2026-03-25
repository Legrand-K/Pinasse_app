const CLogs = require("../controllers/logs.controller.js");
const {RequestMiddleware} = require('../services/upload');

const router = require("express").Router();
router.use(new RequestMiddleware().init);

module.exports = (app, route) => {
  const logsController = new CLogs();
  router.get("/", logsController.findAll);
  //router.get("/:ref", agentController.findByRef);
  router.post("/", logsController.create);
  app.use(route, router);
};

