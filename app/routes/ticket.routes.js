const CTicket = require("../controllers/ticket.controller.js");
const {RequestMiddleware} = require('../services/upload');

const router = require("express").Router();
router.use(new RequestMiddleware().init);

module.exports = (app, route) => {
  const ticketController = new CTicket();
  router.get("/", ticketController.findAll);
  router.get("/:ref", ticketController.findByRef);
  router.get("/getTotalNbTicketsAndRecetteJournaliereForUser/:ref/:ref2", ticketController.getTotalNbTicketsAndRecetteJournaliereForUser);
  router.get("/getTotalNbTicketsAndRecetteJournaliereForSuperAdmin/:ref", ticketController.getTotalNbTicketsAndRecetteJournaliereForSuperAdmin);
  router.get("/getPointByEmploye/:ref/:ref2/:date1/:date2", ticketController.getPointByEmploye);
  router.get("/getPointByTrajet/:ref/:ref2/:date1/:date2", ticketController.getPointByTrajet);
  router.get("/getPointByQuai/:ref/:ref2/:date1/:date2", ticketController.getPointByQuai);
  router.get("/getPointOfAllQuai/:ref/:date1/:date2", ticketController.getPointOfAllQuai);
  router.delete("/:ref", ticketController.delete);
  router.post("/", ticketController.create);
  router.put("/:ref", ticketController.update);
  app.use(route, router);
};

