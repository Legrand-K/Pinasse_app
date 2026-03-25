
const CTrajet = require("../controllers/trajet.controller.js");
const {RequestMiddleware} = require('../services/upload');

const router = require("express").Router();
router.use(new RequestMiddleware().init);

module.exports = (app, route) => {
  const trajetController = new CTrajet();
  router.get("/", trajetController.findAll);
  router.get("/:ref", trajetController.findByRef);
  router.get("/getAllTrajetOfEntreprise/:ref", trajetController.findAllTrajets);
  router.delete("/:ref", trajetController.delete);
  router.post("/", trajetController.create);
  router.put("/:ref", trajetController.update);
  app.use(route, router);
};

