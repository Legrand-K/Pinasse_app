let { Op, dbmodel, dbutils } = require('../dbutils.class');

class Trajet {
    trajetService;
    #req;
    constructor() {
        this.trajetService = new dbutils(dbmodel.trajet);
    }
    withRequest(req){
        this.#req = req;
        return this;
    }
    async create(obj = this.#req.body) {
        var obj = this.trajetService.model.build(obj);
        let result = {};
        let [data, created] = await this.trajetService.findOrCreate(obj.dataValues,{ TRA_CODE: obj.TRA_CODE });
        if ('TRA_CODE' in data) {
            result = await this.findByRef(data.TRA_CODE);
        }
        return result;
    }
    async update(ref, obj = this.#req.body) {
        let result = {};
        let state = await this.trajetService.update(obj, { TRA_CODE: ref });
        if (state === 1) {
            result = await this.findByRef(ref);
        }
        return result;
    }
    async delete(key) {
        let state = await this.trajetService.delete({ TRA_CODE: key });
        return state;
    }
    async findByRef(key) {
        return await this.trajetService.findOne({
            order: [['id', 'DESC']]
        }, { TRA_CODE: key });
    }
    async findAll() {
        return await this.trajetService.findAll({
            attributes: {
                include: [
    
                  [ this.trajetService.model.sequelize.fn("date_format", this.trajetService.model.sequelize.col("createdAt"), "%d-%m-%Y %H:%i:%s"), 'DATE' ],
                    
                ],
              },
            order: [['createdAt', 'DESC']]
        }, {})
    }
    async findAllTrajets(key) {
        return await this.trajetService.findAll({
            
                include: [
                  [this.trajetService.model.sequelize.literal("(SELECT TAR_MONTANT FROM `tarif` WHERE tarif.TAR_CODE = trajet.TAR_CODE)"), 'montant'],
                  //[ this.trajetService.model.sequelize.fn("date_format", this.trajetService.model.sequelize.col("createdAt"), "%d-%m-%Y %H:%i:%s"), 'DATE' ],
                    
                ],
          
            order: [['createdAt', 'DESC']]
        }, { ENT_CODE: key,})
    }
}

module.exports = Trajet;