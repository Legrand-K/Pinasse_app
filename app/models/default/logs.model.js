
module.exports = (sequelize, Sequelize) => {
    const logs = sequelize.define("logs", {
      LOG_CODE: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true
      },
      LOG_TACHE: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ENT_CODE: {
        type: Sequelize.UUID,
        references: {
          model: 'entreprise',
          key: 'ENT_CODE'
        }
      },
      GAR_CODE: {
        type: Sequelize.UUID,
        references: {
          model: 'gare',
          key: 'GAR_CODE'
        }
      },
      USE_CODE: {
        type: Sequelize.UUID,
        references: {
          model: 'user',
          key: 'USE_CODE'
        }
      },
    }, {
      freezeTableName: true
    });
  
    return logs;
  };
  