const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: dbConfig.operatorsAliases,
  logging:dbConfig.logging,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const dbmodel = {};

dbmodel.Sequelize = Sequelize;
dbmodel.sequelize = sequelize;


dbmodel.user = require("./default/user.model")(sequelize, Sequelize);
dbmodel.entreprise = require("./default/entreprise.model")(sequelize, Sequelize);
dbmodel.gare = require("./default/gare.model")(sequelize, Sequelize);
dbmodel.trajet = require("./default/trajet.model")(sequelize, Sequelize);
dbmodel.tarif = require("./default/tarif.model")(sequelize, Sequelize);
dbmodel.ticket = require("./default/ticket.model")(sequelize, Sequelize);
dbmodel.attribution = require("./default/attribution.model")(sequelize, Sequelize);
dbmodel.logs = require("./default/logs.model")(sequelize, Sequelize);




module.exports = dbmodel;