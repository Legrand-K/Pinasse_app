
module.exports = (sequelize, Sequelize) => {
    const entreprise = sequelize.define("entreprise", {
      ENT_CODE: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true
      },
      ENT_LIBELLE: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ENT_EMAIL: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      ENT_ADRESSE: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      ENT_CONTACT1: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ENT_CONTACT2: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      ENT_POURCENTAGE: {
        type: Sequelize.STRING,
        allowNull: false
      },
    }, {
      freezeTableName: true
    });
  
    return entreprise;
  };
  