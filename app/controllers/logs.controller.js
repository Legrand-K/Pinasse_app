const Logs = require("../classes/default/logs.class");

class CLogs {
    constructor() {
    }
    async create(req, res) {
        try {
            const logs = new Logs().withRequest(req);
            const data = await logs.create();
            res.send(data);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }
    async findAll(req, res) {
        const logs = new Logs();
        try {
            const data = await logs.findAll();
            res.send(data);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }
}
module.exports = CLogs;
