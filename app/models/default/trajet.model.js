
module.exports = (sequelize, Sequelize) => {
    const trajet = sequelize.define("trajet", {
      TRA_CODE: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true
      },
      TRA_DEPART: {
        type: Sequelize.STRING,
        allowNull: false
      },
      TRA_ARRIVEE: {
        type: Sequelize.STRING,
        allowNull: false
      },
      TRA_LIBELLE: {
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
      TAR_CODE: {
        type: Sequelize.UUID,
        references: {
          model: 'tarif',
          key: 'TAR_CODE'
        }
      },
      GAR_CODE: {
        type: Sequelize.UUID,
        references: {
          model: 'gare',
          key: 'GAR_CODE'
        }
      },
    }, {
      freezeTableName: true
    });
  
    return trajet;
  };
  