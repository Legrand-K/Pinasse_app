const Entreprise = require("../classes/default/entreprise.class");

class CEntreprise {
    constructor() {
    }
    async create(req, res) {
        try {
            const entreprise = new Entreprise().withRequest(req);
            const data = await entreprise.create();
            res.send(data);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }
    async update(req, res) {
        const ref = req.params.ref;
        const entreprise = new Entreprise().withRequest(req);
        try {
            const data = await entreprise.update(ref);
            res.send(data);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }

    async findAll(req, res) {
        const entreprise = new Entreprise();
        try {
            const data = await entreprise.findAll();
            res.send(data);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }
    async findByRef(req, res) {
        const entreprise = new Entreprise();
        try {
            const ref = req.params.ref;
            const data = await entreprise.findByRef(ref);
            res.send(data);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }
    async delete(req, res) {
        const entreprise = new Entreprise();
        try {
            const ref = req.params.ref;
            const state = await entreprise.delete(ref);
            res.send(state);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }
}
module.exports = CEntreprise;
