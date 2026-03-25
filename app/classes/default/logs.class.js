let { Op, dbmodel, dbutils } = require('../dbutils.class');

class Logs {
    clientService;
    #req;
    constructor() {
        this.logsService = new dbutils(dbmodel.logs);
    }
    withRequest(req){
        this.#req = req;
        return this;
    }
    async create(obj = this.#req.body) {
        var obj = this.logsService.model.build(obj);
        let result = {};
        let [data, created] = await this.logsService.findOrCreate(obj.dataValues,{ LOG_CODE: obj.LOG_CODE });
        if ('LOG_CODE' in data) {
            result = await this.findByRef(data.LOG_CODE);
        }
        return result;
    }
    async findAll() {
        const req = `SELECT logs.LOG_TACHE, logs.createdAt, user.USE_NOM, entreprise.ENT_LIBELLE FROM logs INNER JOIN user ON logs.USE_CODE = user.USE_CODE JOIN entreprise ON logs.ENT_CODE = entreprise.ENT_CODE where DATE(logs.createdAt) = CURDATE() ORDER BY createdAt DESC limit 500`;
        //console.log(req);
        return await this.logsService.query(req);
    }
    async findAllbYdATES(key,date1,date2) {
        return await this.logsService.findAll({
            include: [
                [this.logsService.model.sequelize.literal(`(SELECT CLI_IDENTIFIANT FROM client WHERE client.CLI_CODE = logs.CLI_CODE)`), 'client'],
                [this.logsService.model.sequelize.literal(`(SELECT ATE_LIBELLE FROM atelier WHERE atelier.ATE_CODE = logs.ATE_CODE)`), 'ATE_LIBELLE']
            ],
            order: [['createdAt', 'DESC']]
        }, {})
    }
    async findByRef(key) {
        return await this.logsService.findOne({
            order: [['id', 'DESC']]
        }, { LOG_CODE: key });
    }
}

module.exports = Logs;