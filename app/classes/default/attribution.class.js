let { Op, dbmodel, dbutils } = require('../dbutils.class');

class Attribution {
    attributionService;
    #req;
    constructor() {
        this.attributionService = new dbutils(dbmodel.attribution);
    }
    withRequest(req){
        this.#req = req;
        return this;
    }
    async create(obj = this.#req.body) {
        var obj = this.attributionService.model.build(obj);
        let result = {};
        let [data, created] = await this.attributionService.findOrCreate(obj.dataValues,{ ATR_CODE: obj.ATR_CODE });
        if ('ATR_CODE' in data) {
            result = await this.findByRef(data.ATR_CODE);
        }
        return result;
    }
    async update(ref, obj = this.#req.body) {
        let result = {};
        let state = await this.attributionService.update(obj, { ATR_CODE: ref });
        if (state === 1) {
            result = await this.findByRef(ref);
        }
        return result;
    }
    async delete(key) {
        let state = await this.attributionService.delete({ ATR_CODE: key });
        return state;
    }
    async findByRef(key) {
        return await this.attributionService.findOne({
            order: [['id', 'DESC']]
        }, { ATR_CODE: key });
    }
    async findAll() {
        return await this.attributionService.findAll({
            attributes: {
                include: [
    
                  [ this.attributionService.model.sequelize.fn("date_format", this.attributionService.model.sequelize.col("createdAt"), "%d-%m-%Y %H:%i:%s"), 'DATE' ],
                    
                ],
              },
            order: [['createdAt', 'DESC']]
        }, {})
    }
}

module.exports = Attribution;