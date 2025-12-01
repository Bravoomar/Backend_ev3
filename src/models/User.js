import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: DataTypes.STRING,
  correo: DataTypes.STRING,
  tipo: DataTypes.STRING,
  passwordHash: DataTypes.STRING
});

export default User;
