
module.exports = (sequelize, Sequelize) => {
    const ticket = sequelize.define("ticket", {
      TIC_CODE: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true
      },
      TIC_MONTANT: {
        type: Sequelize.STRING,
        allowNull: false
      },
      TIC_NBR_TICKET: {
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
      TRA_CODE: {
        type: Sequelize.UUID,
        references: {
          model: 'trajet',
          key: 'TRA_CODE'
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
  
    return ticket;
  };
  