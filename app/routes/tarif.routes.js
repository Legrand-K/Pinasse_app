const CTarif = require("../controllers/tarif.controller.js");
const {RequestMiddleware} = require('../services/upload');

const router = require("express").Router();
router.use(new RequestMiddleware().init);

module.exports = (app, route) => {
  const tarifController = new CTarif();
  router.get("/", tarifController.findAll);
  router.get("/:ref", tarifController.findByRef);
  router.get("/getAllTarifsOfEntreprise/:ref", tarifController.findAllTarifs);
  router.delete("/:ref", tarifController.delete);
  router.post("/", tarifController.create);
  router.put("/:ref", tarifController.update);
  app.use(route, router);
};

