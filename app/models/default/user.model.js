
module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define("user", {
      USE_CODE: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true
      },
      USE_NOM: {
        type: Sequelize.STRING,
        //allowNull: false
      },
      USE_CONTACT: {
        type: Sequelize.STRING,
        unique: true
      },
      USE_PASSWORD: {
        type: Sequelize.STRING,
        //allowNull: false
      },
      USE_TYPE: {
        type: Sequelize.STRING,
        //allowNull: false
      },
      ENT_CODE: {
        type: Sequelize.UUID,
        references: {
          model: 'entreprise',
          key: 'ENT_CODE'
        }
      },
      USE_REMEMBER_TOKEN: {
        type: Sequelize.STRING
      },
    }, {
      freezeTableName: true
    });
  
    return user;
  };