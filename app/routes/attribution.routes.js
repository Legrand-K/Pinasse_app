const CAttribution = require("../controllers/attribution.controller.js");
const {RequestMiddleware} = require('../services/upload');

const router = require("express").Router();
router.use(new RequestMiddleware().init);

module.exports = (app, route) => {
  const attributionController = new CAttribution();
  router.get("/", attributionController.findAll);
  router.get("/:ref", attributionController.findByRef);
  router.delete("/:ref", attributionController.delete);
  router.post("/", attributionController.create);
  router.put("/:ref", attributionController.update);
  app.use(route, router);
};

