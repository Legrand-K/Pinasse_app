let { Op, dbmodel, dbutils } = require('../dbutils.class');

class Entreprise {
    entrepriseService;
    #req;
    constructor() {
        this.entrepriseService = new dbutils(dbmodel.entreprise);
    }
    withRequest(req){
        this.#req = req;
        return this;
    }
    async create(obj = this.#req.body) {
        var obj = this.entrepriseService.model.build(obj);
        let result = {};
        let [data, created] = await this.entrepriseService.findOrCreate(obj.dataValues,{ ENT_CODE: obj.ENT_CODE });
        if ('ENT_CODE' in data) {
            result = await this.findByRef(data.ENT_CODE);
        }
        return result;
    }
    async update(ref, obj = this.#req.body) {
        let result = {};
        let state = await this.entrepriseService.update(obj, { ENT_CODE: ref });
        if (state === 1) {
            result = await this.findByRef(ref);
        }
        return result;
    }
    async delete(key) {
        let state = await this.entrepriseService.delete({ ENT_CODE: key });
        return state;
    }
    async findByRef(key) {
        return await this.entrepriseService.findOne({
            order: [['id', 'DESC']]
        }, { ENT_CODE: key });
    }
    async findAll() {
        return await this.entrepriseService.findAll({
            attributes: {
                include: [
    
                  [ this.entrepriseService.model.sequelize.fn("date_format", this.entrepriseService.model.sequelize.col("createdAt"), "%d-%m-%Y %H:%i:%s"), 'DATE' ],
                    
                ],
              },
            order: [['createdAt', 'DESC']]
        }, {})
    }
}

module.exports = Entreprise;