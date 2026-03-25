let { Op, dbmodel, dbutils } = require('../dbutils.class');

module.exports = class Log {
    logService;
    constructor(req) {
        this.logService = new dbutils(dbmodel.ws_log);
    }
    #build(obj) {
        if ('LOG_CODE' in obj) delete obj.LOG_CODE;
        return obj;
    }
    async create(obj) {
        let result = {};
        this.#build(obj);
        let data = await this.logService.create(obj);
        if ('id' in data) {
            result = await this.findByRef(data.LOG_CODE);
        }
        return result;
    }
    async update(obj) {
        let result = {};
        this.#build(obj);
        let state = await this.logService.update(obj, { LOG_CODE: obj.LOG_CODE });
        if (state === 1) {
            result = await this.findByRef(obj.LOG_CODE);
        }
        return result;
    }
    async delete(key) {
        let state = await this.logService.delete({ LOG_CODE: key });
        return state;
    }
    async findLast() {
        return await this.logService.findOne({
            order: [['id', 'DESC']]
        }, {});
    }
    async findLastByAccount(key) {
        return await this.logService.findOne({
            order: [['id', 'DESC']]
        }, { ACC_CODE: key });
    }
    async findByRef(key) {
        return await this.logService.findOne({
            exclude: ['LOG_GEODATA'],
            order: [['id', 'DESC']]
        }, { LOG_CODE: key });
    }
    async findAllByAccount(key) {
        return await this.logService.findAll({
            order: [['createdAt', 'DESC']]
        }, { ACC_CODE: key })
    }
}