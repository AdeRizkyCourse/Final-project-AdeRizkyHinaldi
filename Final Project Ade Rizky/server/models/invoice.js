'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Invoice.belongsTo(models.Client, { foreignKey: 'id_client' });
      Invoice.belongsTo(models.User, { foreignKey: 'id_user' });
      Invoice.hasMany(models.Item, { foreignKey: 'id_invoice' });

      

    }
  }
  Invoice.init({
    no_invoice: DataTypes.STRING,
    id_client: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    total_harga: DataTypes.DECIMAL,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Invoice',
    tableName: 'invoices', 
  });
  return Invoice;
};