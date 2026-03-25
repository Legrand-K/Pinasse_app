let { Op, dbmodel, dbutils } = require('../dbutils.class');

class User {
    userService;
    #req;
    constructor() {
        this.userService = new dbutils(dbmodel.user);
    }
    withRequest(req) {
        this.#req = req;
        return this;
    }
    async create(obj = this.#req.body) {
        var obj = this.userService.model.build(obj);
        let result = {};
        let [data, created] = await this.userService.findOrCreate(obj.dataValues, { USE_CODE: obj.USE_CODE });
        if ('USE_CODE' in data) {
            result = await this.findByRef(data.USE_CODE);
        }
        return result;
    }
    async update(ref, obj = this.#req.body) {
        let result = {};
        let state = await this.userService.update(obj, { USE_CODE: ref });
        if (state === 1) {
            result = await this.findByRef(ref);
        }
        return result;
    }
    async delete(key) {
        let state = await this.userService.delete({ USE_CODE: key });
        return state;
    }
    async findByRef(key) {
        return await this.userService.findOne({
            exclude: ['USE_PASSWORD'],
            include: [
                //[this.userService.model.sequelize.literal("(SELECT LAV_LIBELLE FROM `lavage` WHERE lavage.LAV_CODE = user.LAV_CODE)"), 'LAV_LIBELLE'],
                [this.userService.model.sequelize.literal("(SELECT CASE USE_TYPE WHEN '0' THEN 'GERANT' ELSE 'PROPRIETAIRE' END AS USE_TYPE)"), 'TYPE']
            ],
            order: [['createdAt', 'DESC']]
        }, { USE_CODE: key });
    }
    async findAll() {
        return await this.userService.findAll({
            exclude: ['USE_PASSWORD'],
            include: [
                //[this.userService.model.sequelize.literal("(SELECT LAV_LIBELLE FROM `lavage` WHERE lavage.LAV_CODE = user.LAV_CODE)"), 'LAV_LIBELLE'],
                [this.userService.model.sequelize.literal("(SELECT CASE USE_TYPE WHEN '0' THEN 'GERANT' WHEN '1' THEN 'PROPRIETAIRE' WHEN '2' THEN 'SUPER ADMIN' ELSE 'SERVICE CLIENT' END AS USE_TYPE )"), 'TYPE']
            ],
            order: [['createdAt', 'DESC']]
        }, {})
    }
    async findByNum(Num) {
        return await this.userService.findOne({
            //exclude: ['USE_PASSWORD'],
            include: [
                [this.userService.model.sequelize.literal("(SELECT ENT_LIBELLE FROM `entreprise` WHERE entreprise.ENT_CODE = user.ENT_CODE)"), 'nomEntreprise'],
                [this.userService.model.sequelize.literal("(SELECT ENT_CODE FROM `entreprise` WHERE entreprise.ENT_CODE = user.ENT_CODE)"), 'codeEntreprise'],
                [this.userService.model.sequelize.literal("(SELECT CASE USE_TYPE WHEN '0' THEN 'EMPLOYE' ELSE 'GERANT' END AS USE_TYPE )"), 'TYPE']
            ],
            order: [['id', 'DESC']]
        }, { USE_CONTACT: Num });
    }
    async findAllEmployeOfEntreprise(key) {
        return await this.userService.findAll({
            //exclude: ['USE_PASSWORD'],
            include: [
                //[this.userService.model.sequelize.literal("(SELECT ENT_LIBELLE FROM `entreprise` WHERE entreprise.ENT_CODE = user.ENT_CODE)"), 'nomEntreprise'],
                //[this.userService.model.sequelize.literal("(SELECT ENT_CODE FROM `entreprise` WHERE entreprise.ENT_CODE = user.ENT_CODE)"), 'codeEntreprise'],
                [this.userService.model.sequelize.literal("(SELECT CASE USE_TYPE WHEN '0' THEN 'EMPLOYE' ELSE 'GERANT' END AS USE_TYPE )"), 'TYPE']
            ],
            order: [['id', 'DESC']]
        }, { ENT_CODE: key, USE_TYPE: '0'  });
    }
}

module.exports = User;