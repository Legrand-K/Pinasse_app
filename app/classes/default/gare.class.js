let { Op, dbmodel, dbutils } = require('../dbutils.class');

class Gare {
    gareService;
    #req;
    constructor() {
        this.gareService = new dbutils(dbmodel.gare);
    }
    withRequest(req){
        this.#req = req;
        return this;
    }
    async create(obj = this.#req.body) {
        var obj = this.gareService.model.build(obj);
        let result = {};
        let [data, created] = await this.gareService.findOrCreate(obj.dataValues,{ GAR_CODE: obj.GAR_CODE });
        if ('ENT_CODE' in data) {
            result = await this.findByRef(data.GAR_CODE);
        }
        return result;
    }
    async update(ref, obj = this.#req.body) {
        let result = {};
        let state = await this.gareService.update(obj, { GAR_CODE: ref });
        if (state === 1) {
            result = await this.findByRef(ref);
        }
        return result;
    }
    async delete(key) {
        let state = await this.gareService.delete({ GAR_CODE: key });
        return state;
    }
    async findByRef(key) {
        return await this.gareService.findOne({
            order: [['id', 'DESC']]
        }, { GAR_CODE: key });
    }
    async findAll() {
        return await this.gareService.findAll({
            attributes: {
                include: [
    
                  [ this.gareService.model.sequelize.fn("date_format", this.gareService.model.sequelize.col("createdAt"), "%d-%m-%Y %H:%i:%s"), 'DATE' ],
                    
                ],
              },
            order: [['createdAt', 'DESC']]
        }, {})
    }
    async findAllGares(key) {
        return await this.gareService.findAll({
            attributes: {
                include: [
    
                  [ this.gareService.model.sequelize.fn("date_format", this.gareService.model.sequelize.col("createdAt"), "%d-%m-%Y %H:%i:%s"), 'DATE' ],
                    
                ],
              },
            order: [['createdAt', 'DESC']]
        }, { ENT_CODE: key,})
    }
}

module.exports = Gare;