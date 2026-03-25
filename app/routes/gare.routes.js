
const CGare = require("../controllers/gare.controller.js");
const {RequestMiddleware} = require('../services/upload');

const router = require("express").Router();
router.use(new RequestMiddleware().init);

module.exports = (app, route) => {
  const gareController = new CGare();
  router.get("/", gareController.findAll);
  router.get("/:ref", gareController.findByRef);
  router.get("/getAllGaresOfEntreprise/:ref", gareController.findAllGares);
  router.delete("/:ref", gareController.delete);
  router.post("/", gareController.create);
  router.put("/:ref", gareController.update);
  app.use(route, router);
};

