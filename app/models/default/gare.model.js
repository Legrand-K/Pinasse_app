
module.exports = (sequelize, Sequelize) => {
    const gare = sequelize.define("gare", {
      GAR_CODE: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true
      },
      GAR_LIBELLE: {
        type: Sequelize.STRING,
        allowNull: false
      },
      GAR_ADRESSE: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      GAR_CONTACT: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      ENT_CODE: {
        type: Sequelize.UUID,
        references: {
          model: 'entreprise',
          key: 'ENT_CODE'
        }
      },
    }, {
      freezeTableName: true
    });
  
    return gare;
  };
  