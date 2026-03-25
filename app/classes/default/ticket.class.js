let { Op, dbmodel, dbutils } = require('../dbutils.class');
const Entreprise = require("./entreprise.class");

class Ticket {
    ticketService;
    #req;
    constructor() {
        this.ticketService = new dbutils(dbmodel.ticket);
    }
    withRequest(req){
        this.#req = req;
        return this;
    }
    async create(obj = this.#req.body) {
        var obj = this.ticketService.model.build(obj);
        let result = {};
        let [data, created] = await this.ticketService.findOrCreate(obj.dataValues,{ TIC_CODE: obj.TIC_CODE });
        if ('TIC_CODE' in data) {
            result = await this.findByRef(data.TIC_CODE);
        }
        return result;
    }
    async update(ref, obj = this.#req.body) {
        let result = {};
        let state = await this.ticketService.update(obj, { TIC_CODE: ref });
        if (state === 1) {
            result = await this.findByRef(ref);
        }
        return result;
    }
    async delete(key) {
        let state = await this.ticketService.delete({ TIC_CODE: key });
        return state;
    }
    async findByRef(key) {
        return await this.ticketService.findOne({
             include: [
                [this.ticketService.model.sequelize.literal("(SELECT ENT_LIBELLE FROM `entreprise` WHERE entreprise.ENT_CODE = ticket.ENT_CODE)"), 'ENTREPRISE'],
                [this.ticketService.model.sequelize.literal("(SELECT ENT_CONTACT1 FROM `entreprise` WHERE entreprise.ENT_CODE = ticket.ENT_CODE)"), 'CONTACT1'],
                [this.ticketService.model.sequelize.literal("(SELECT ENT_CONTACT2 FROM `entreprise` WHERE entreprise.ENT_CODE = ticket.ENT_CODE)"), 'CONTACT2'],
                [this.ticketService.model.sequelize.literal("(SELECT TRA_LIBELLE FROM `trajet` WHERE trajet.TRA_CODE = ticket.TRA_CODE)"), 'TRAJET'],
            ],
            order: [['id', 'DESC']]
        }, { TIC_CODE: key });
    }
    async findAll() {
        return await this.ticketService.findAll({
            attributes: {
                include: [
    
                  [ this.ticketService.model.sequelize.fn("date_format", this.ticketService.model.sequelize.col("createdAt"), "%d-%m-%Y %H:%i:%s"), 'DATE' ],
                    
                ],
              },
            order: [['createdAt', 'DESC']]
        }, {})
    }
    async getTotalNbTicketsAndRecetteJournaliereForUser(useCod,key){
        const req = `SELECT SUM(TIC_MONTANT) AS "RECETTE", SUM(TIC_NBR_TICKET) AS "NBR TICKET" FROM ticket where (DATE(createdAt) = CURDATE()) AND USE_CODE = "${useCod}" AND ENT_CODE = "${key}"`;
        let res = await this.ticketService.query(req);

        return JSON.stringify({ 
                'NBR TICKET': res[0]['NBR TICKET'] != null ? res[0]['NBR TICKET'] : 0,
                'RECETTE': res[0]['RECETTE'] != null ? res[0]['RECETTE'] : 0,
            });
    }
    async getTotalNbTicketsAndRecetteJournaliereForSuperAdmin(key){
        const req = `SELECT SUM(TIC_MONTANT) AS "RECETTE", SUM(TIC_NBR_TICKET) AS "NBR TICKET" FROM ticket where (DATE(createdAt) = CURDATE()) AND ENT_CODE = "${key}"`;
        let res = await this.ticketService.query(req);

        return JSON.stringify({ 
                'NBR TICKET': res[0]['NBR TICKET'] != null ? res[0]['NBR TICKET'] : 0,
                'RECETTE': res[0]['RECETTE'] != null ? res[0]['RECETTE'] : 0,
            });
    }
    async getPointByEmploye(useCod, entCod, date1, date2){
        const req = `SELECT SUM(TIC_MONTANT) AS "RECETTE", SUM(TIC_NBR_TICKET) AS "NBR TICKET" FROM ticket where (DATE(createdAt) BETWEEN "${date1}" AND "${date2}") AND USE_CODE = "${useCod}" AND ENT_CODE = "${entCod}"`;
        let res = await this.ticketService.query(req);

        return JSON.stringify({ 
                'NBR TICKET': res[0]['NBR TICKET'] != null ? res[0]['NBR TICKET'] : 0,
                'RECETTE': res[0]['RECETTE'] != null ? res[0]['RECETTE'] : 0,
            });
    }
    async getPointByTrajet(traCod, entCod, date1, date2){
        const req = `SELECT SUM(TIC_MONTANT) AS "RECETTE", SUM(TIC_NBR_TICKET) AS "NBR TICKET" FROM ticket where (DATE(createdAt) BETWEEN "${date1}" AND "${date2}") AND TRA_CODE = "${traCod}" AND ENT_CODE = "${entCod}"`;
        let res = await this.ticketService.query(req);

        return JSON.stringify({ 
                'NBR TICKET': res[0]['NBR TICKET'] != null ? res[0]['NBR TICKET'] : 0,
                'RECETTE': res[0]['RECETTE'] != null ? res[0]['RECETTE'] : 0,
            });
    }
    async getPointByQuai(gareCod, entCod, date1, date2){
        const req = `SELECT SUM(TIC_MONTANT) AS "RECETTE", SUM(TIC_NBR_TICKET) AS "NBR TICKET" FROM ticket where (DATE(createdAt) BETWEEN "${date1}" AND "${date2}") AND GAR_CODE = "${gareCod}" AND ENT_CODE = "${entCod}"`;
        
        return await this.ticketService.query(req);
    }
    async getPointOfAllQuai(entCod, date1, date2){
        const entreprise = new Entreprise();
        let dataEntreprise = await entreprise.findByRef(entCod);
        const req = `SELECT SUM(TIC_MONTANT) AS "RECETTE", SUM(TIC_NBR_TICKET) AS "NBR TICKET" FROM ticket where (DATE(createdAt) BETWEEN "${date1}" AND "${date2}") AND ENT_CODE = "${entCod}"`;
        let res = await this.ticketService.query(req);
        let recett = res[0]['RECETTE'] != null ? res[0]['RECETTE'] : 0;
        let redevance = Math.round((recett * dataEntreprise['ENT_POURCENTAGE']) / 100);
        let pourcentage = dataEntreprise['ENT_POURCENTAGE'];

        return JSON.stringify({ 
                'NBR TICKET': res[0]['NBR TICKET'] != null ? res[0]['NBR TICKET'] : 0,
                'RECETTE': recett,
                'REDEVANCE': redevance,
                'POURCENTAGE': pourcentage,
            });
    }
}

module.exports = Ticket;