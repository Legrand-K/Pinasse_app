let dbmodel = require('../models/index');
const { Op } = require("sequelize");

class dbutils {
    model;
    constructor(_model) {
        this.model = _model;
    }
    async create(obj) {
        try {
            const data = await this.model.create(obj);
            return data || {};
        } catch (error) {
            throw error;
        }
    }
    async findOrCreate(_obj, _condition) {
        try {
            const [data, created] = await this.model.findOrCreate({
                where: _condition,
                defaults: _obj
            });
            return [data || {}, created];
        } catch (error) {
            throw error;
        }
    }
    async findOne(_attributes = {}, _condition = {}) {
        try {
            let _param = {};
            _param.order =  (_attributes.order) ? _attributes.order : [['createdAt', 'DESC']];
            delete _attributes.order;
            _param.attributes = _attributes;
            _param.where = _condition;
            const data = await this.model.findOne(_param);
            return data || {};
        } catch (error) {
            console.log({ attributes: _attributes, where: _condition })
            throw error;
        }
    }
    async findLast() {
        try {
            const data = await this.findOne();
            return data || {};
        } catch (error) {
            throw error;
        }
    }
    async findAll(_attributes = {}, _condition = {}) {
        try {
            let _param = {};
            _param.order =  (_attributes.order) ? _attributes.order : [['createdAt', 'DESC']];
            delete _attributes.order;
            _param.attributes = _attributes;
            _param.where = _condition;
            const data = await this.model.findAll(_param);
            return data || [];
        } catch (error) {
            throw error;
        }
    }

    async update(_attributes, _condition) {
        try {
            const [data] = await this.model.update(_attributes, { where: _condition });
            return data;
        } catch (error) {
            throw error;
        }
    }

    async delete(_condition) {
        try {
            const data = await this.model.destroy({ where: _condition });
            return (data == 0) ? {} : _condition;
        } catch (error) {
            throw error;
        }
    }

    async query(_sql) {
        try {
            const data = await this.model.sequelize.query(_sql, { raw: true, nest: true });
            return data;
        } catch (error) {
            throw error;
        }
    }
}
module.exports = { Op, dbmodel, dbutils };

