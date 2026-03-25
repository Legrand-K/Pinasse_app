const Gare = require("../classes/default/gare.class");

class CGare {
    constructor() {
    }
    async create(req, res) {
        try {
            const gare = new Gare().withRequest(req);
            const data = await gare.create();
            res.send(data);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }
    async update(req, res) {
        const ref = req.params.ref;
        const gare = new Gare().withRequest(req);
        try {
            const data = await gare.update(ref);
            res.send(data);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }

    async findAll(req, res) {
        const gare = new Gare();
        try {
            const data = await gare.findAll();
            res.send(data);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }
    async findByRef(req, res) {
        const gare = new Gare();
        try {
            const ref = req.params.ref;
            const data = await gare.findByRef(ref);
            res.send(data);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }
    async delete(req, res) {
        const gare = new Gare();
        try {
            const ref = req.params.ref;
            const state = await gare.delete(ref);
            res.send(state);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }
    async findAllGares(req, res) {
        const gare = new Gare();
        try {
            const ref = req.params.ref;
            const data = await gare.findAllGares(ref);
            res.send(data);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }
}
module.exports = CGare;
