'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice_Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Invoice_Item.belongsTo(models.Invoice, { foreignKey: 'id_invoice' });
    }
  }
  Invoice_Item.init({
    id_invoice: DataTypes.INTEGER,
    nama_barang: DataTypes.STRING,
    jumlah: DataTypes.INTEGER,
    harga_satuan: DataTypes.DECIMAL,
    total_harga_item: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Item',
    tableName: 'invoices_items', 
  });
  return Invoice_Item;
};