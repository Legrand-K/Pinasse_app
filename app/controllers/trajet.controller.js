const Trajet = require("../classes/default/trajet.class");

class CTrajet {
    constructor() {
    }
    async create(req, res) {
        try {
            const trajet = new Trajet().withRequest(req);
            const data = await trajet.create();
            res.send(data);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }
    async update(req, res) {
        const ref = req.params.ref;
        const trajet = new Trajet().withRequest(req);
        try {
            const data = await trajet.update(ref);
            res.send(data);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }

    async findAll(req, res) {
        const trajet = new Trajet();
        try {
            const data = await trajet.findAll();
            res.send(data);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }
    async findByRef(req, res) {
        const trajet = new Trajet();
        try {
            const ref = req.params.ref;
            const data = await trajet.findByRef(ref);
            res.send(data);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }
    async delete(req, res) {
        const trajet = new Trajet();
        try {
            const ref = req.params.ref;
            const state = await trajet.delete(ref);
            res.send(state);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }
    async findAllTrajets(req, res) {
        const trajet = new Trajet();
        try {
            const ref = req.params.ref;
            const data = await trajet.findAllTrajets(ref);
            res.send(data);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }
}
module.exports = CTrajet;
