const User = require("../classes/default/user.class");


class CUser {
    constructor() {
    }
    async create(req, res) {
        try {
            const user = new User().withRequest(req);
            console.log(req.body);
            const data = await user.create();
            res.send(data);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }

    async login(req, res) {
        //const user = new User();
        const user = new User();
        const { numero, password } = req.body;
        try {
            
            if (!(numero && password)) {
                res.status(400).send("Tous les champs sont requis");
              }

              const data = await user.findByNum(numero);
              //res.send(data);
              if (data && (password == data.USE_PASSWORD)) {
                return res.status(200).json(data);
              }

              return res.status(400).send("Identifiant ou mot de passe incorrect");
            //res.send(data);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }
    async update(req, res) {
        const ref = req.params.ref;
        const user = new User().withRequest(req);
        try {
            const data = await user.update(ref);
            res.send(data);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }

    async findAll(req, res) {
        const user = new User();
        try {
            const data = await user.findAll();
            res.send(data);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }
    async findByRef(req, res) {
        const user = new User();
        try {
            const ref = req.params.ref;
            const data = await user.findByRef(ref);
            res.send(data);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }
    async delete(req, res) {
        const user = new User();
        try {
            const ref = req.params.ref;
            const state = await user.delete(ref);
            res.send(state);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }
    async findAllEmployeOfEntreprise(req, res) {
        const user = new User();
        try {
            const ref = req.params.ref;
            const data = await user.findAllEmployeOfEntreprise(ref);
            res.send(data);
        } catch (error) {
            res.status(500).send({
                error: error.message || "Erreur survenue lors de l'opération."
            });
        }
    }
}
module.exports = CUser;
