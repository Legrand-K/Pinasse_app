let { Op, dbmodel, dbutils } = require('../dbutils.class');

class Tarif {
    tarifService;
    #req;
    constructor() {
        this.tarifService = new dbutils(dbmodel.tarif);
    }
    withRequest(req){
        this.#req = req;
        return this;
    }
    async create(obj = this.#req.body) {
        var obj = this.tarifService.model.build(obj);
        let result = {};
        let [data, created] = await this.tarifService.findOrCreate(obj.dataValues,{ TAR_CODE: obj.TAR_CODE });
        if ('TAR_CODE' in data) {
            result = await this.findByRef(data.TAR_CODE);
        }
        return result;
    }
    async update(ref, obj = this.#req.body) {
        let result = {};
        let state = await this.tarifService.update(obj, { TAR_CODE: ref });
        if (state === 1) {
            result = await this.findByRef(ref);
        }
        return result;
    }
    async delete(key) {
        let state = await this.tarifService.delete({ TAR_CODE: key });
        return state;
    }
    async findByRef(key) {
        return await this.tarifService.findOne({
            order: [['id', 'DESC']]
        }, { TAR_CODE: key });
    }
    async findAll() {
        return await this.tarifService.findAll({
            attributes: {
                include: [
    
                  [ this.tarifService.model.sequelize.fn("date_format", this.tarifService.model.sequelize.col("createdAt"), "%d-%m-%Y %H:%i:%s"), 'DATE' ],
                    
                ],
              },
            order: [['createdAt', 'DESC']]
        }, {})
    }
    async findAllTarifs(key) {
        return await this.tarifService.findAll({
            attributes: {
                include: [
                  //[this.trajetService.model.sequelize.literal("(SELECT TAR_MONTANT FROM `tarif` WHERE tarif.TAR_CODE = trajet.TAR_CODE)"), 'montant'],
                  [ this.tarifService.model.sequelize.fn("date_format", this.tarifService.model.sequelize.col("createdAt"), "%d-%m-%Y %H:%i:%s"), 'DATE' ],
                    
                ],
              },
            order: [['createdAt', 'DESC']]
        }, { ENT_CODE: key,})
    }
}

module.exports = Tarif;