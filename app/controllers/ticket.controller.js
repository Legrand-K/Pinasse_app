const Ticket = require("../classes/default/ticket.class");

class CTicket {
    constructor() {
    }
    async create(req, res) {
        try {
            const ticket = new Ticket().withRequest(req);
            const data = await ticket.create();
            res.send(data);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }
    async update(req, res) {
        const ref = req.params.ref;
        const ticket = new Ticket().withRequest(req);
        try {
            const data = await ticket.update(ref);
            res.send(data);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }

    async findAll(req, res) {
        const ticket = new Ticket();
        try {
            const data = await ticket.findAll();
            res.send(data);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }
    async findByRef(req, res) {
        const ticket = new Ticket();
        try {
            const ref = req.params.ref;
            const data = await ticket.findByRef(ref);
            res.send(data);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }
    async delete(req, res) {
        const ticket = new Ticket();
        try {
            const ref = req.params.ref;
            const state = await ticket.delete(ref);
            res.send(state);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }
    async getTotalNbTicketsAndRecetteJournaliereForUser(req, res) {
         const ticket = new Ticket();
        try {
            const ref = req.params.ref;
            const ref2 = req.params.ref2;
            const data = await ticket.getTotalNbTicketsAndRecetteJournaliereForUser(ref,ref2);
            res.send(data);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }
    async getTotalNbTicketsAndRecetteJournaliereForSuperAdmin(req, res) {
         const ticket = new Ticket();
        try {
            const ref = req.params.ref;
            const data = await ticket.getTotalNbTicketsAndRecetteJournaliereForSuperAdmin(ref);
            res.send(data);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }
    async getPointByEmploye(req, res) {
        const ticket = new Ticket();
        try {
            const ref = req.params.ref;
            const ref2 = req.params.ref2;
            const date1 = req.params.date1;
            const date2 = req.params.date2;
            const data = await ticket.getPointByEmploye(ref, ref2, date1, date2 );
            res.send(data);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }
    async getPointByTrajet(req, res) {
        const ticket = new Ticket();
        try {
            const ref = req.params.ref;
            const ref2 = req.params.ref2;
            const date1 = req.params.date1;
            const date2 = req.params.date2;
            const data = await ticket.getPointByTrajet(ref, ref2, date1, date2 );
            res.send(data);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }
    async getPointByQuai(req, res) {
        const ticket = new Ticket();
        try {
            const ref = req.params.ref;
            const ref2 = req.params.ref2;
            const date1 = req.params.date1;
            const date2 = req.params.date2;
            const data = await ticket.getPointByQuai(ref, ref2, date1, date2 );
            res.send(data);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }
    async getPointOfAllQuai(req, res) {
        const ticket = new Ticket();
        try {
            const ref = req.params.ref;
            const date1 = req.params.date1;
            const date2 = req.params.date2;
            const data = await ticket.getPointOfAllQuai(ref,date1, date2 );
            res.send(data);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }
}
module.exports = CTicket