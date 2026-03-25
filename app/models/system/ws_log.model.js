
module.exports = (sequelize, Sequelize) => {
  const ws_log = sequelize.define("ws_log", {
    LOG_CODE: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true
    },
    LOG_IP: {
      type: Sequelize.STRING
    }
  }, {
    freezeTableName: true
  });

  return ws_log;
};