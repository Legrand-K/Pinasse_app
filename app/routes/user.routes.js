const CUser = require("../controllers/user.controller.js");
const {RequestMiddleware} = require('../services/upload');

const router = require("express").Router();
router.use(new RequestMiddleware().init);

module.exports = (app, route) => {
  const userController = new CUser();
  router.get("/", userController.findAll);
  router.get("/:ref", userController.findByRef);
  router.get("/findAllEmployeOfEntreprise/:ref", userController.findAllEmployeOfEntreprise);
  router.delete("/:ref", userController.delete);
  router.post("/", userController.create);
  router.put("/:ref", userController.update);
  router.post("/login", userController.login);
  app.use(route, router);
};

