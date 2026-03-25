
const CEntreprise = require("../controllers/entreprise.controller.js");
const {RequestMiddleware} = require('../services/upload');

const router = require("express").Router();
router.use(new RequestMiddleware().init);

module.exports = (app, route) => {
  const entrepriseController = new CEntreprise();
  router.get("/", entrepriseController.findAll);
  router.get("/:ref", entrepriseController.findByRef);
  router.delete("/:ref", entrepriseController.delete);
  router.post("/", entrepriseController.create);
  router.put("/:ref", entrepriseController.update);
  app.use(route, router);
};

