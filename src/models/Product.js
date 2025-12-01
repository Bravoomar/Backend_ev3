import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js"; // apunta a tu db.js

const Product = sequelize.define("Product", {
  codigo: { type: DataTypes.STRING, primaryKey: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.STRING, defaultValue: "" },
  precio: { type: DataTypes.FLOAT, allowNull: false },
  stock: { type: DataTypes.INTEGER, allowNull: false },
  categoria: { type: DataTypes.STRING, allowNull: false },
  imagen: { type: DataTypes.STRING, defaultValue: "" }
});

export default Product;
