
module.exports = (sequelize, Sequelize) => {
    const tarif = sequelize.define("tarif", {
      TAR_CODE: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true
      },
      TAR_MONTANT: {
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
    }, {
      freezeTableName: true
    });
  
    return tarif;
  };
  