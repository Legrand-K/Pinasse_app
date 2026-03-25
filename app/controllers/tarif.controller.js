const Tarif = require("../classes/default/tarif.class");

class CTarif {
    constructor() {
    }
    async create(req, res) {
        try {
            const tarif = new Tarif().withRequest(req);
            const data = await tarif.create();
            res.send(data);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }
    async update(req, res) {
        const ref = req.params.ref;
        const tarif = new Tarif().withRequest(req);
        try {
            const data = await tarif.update(ref);
            res.send(data);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }

    async findAll(req, res) {
        const tarif = new Tarif();
        try {
            const data = await tarif.findAll();
            res.send(data);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }
    async findByRef(req, res) {
        const tarif = new Tarif();
        try {
            const ref = req.params.ref;
            const data = await tarif.findByRef(ref);
            res.send(data);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }
    async delete(req, res) {
        const tarif = new Tarif();
        try {
            const ref = req.params.ref;
            const state = await tarif.delete(ref);
            res.send(state);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }
    async findAllTarifs(req, res) {
        const tarif = new Tarif();
        try {
            const ref = req.params.ref;
            const data = await tarif.findAllTarifs(ref);
            res.send(data);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }
}
module.exports = CTarif;
