import User from '../models/User.js';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const userService = {

    async getAllUsers() {
        return User.findAll();
    },

    async getUserById(id) {
        return User.findByPk(id);
    },

    async getUserByEmail(email) {
        return User.findOne({ where: { correo: email } });
    },

    async createUser(userData) {
        if (!userData.password) throw new Error("La contraseña es requerida.");
        const passwordHash = await bcrypt.hash(userData.password, SALT_ROUNDS);

        const newUser = {
            nombre: userData.nombre,
            correo: userData.correo,
            tipo: userData.tipo || "Cliente",
            passwordHash
        };

        return User.create(newUser);
    },

    async updateUser(id, updates) {
        if (updates.password) {
            updates.passwordHash = await bcrypt.hash(updates.password, SALT_ROUNDS);
            delete updates.password;
        }

        const [updatedRowsCount] = await User.update(updates, { where: { id } });
        if (updatedRowsCount === 0) return null;

        return this.getUserById(id);
    },

    async deleteUser(id) {
        const deletedRows = await User.destroy({ where: { id } });
        return deletedRows > 0;
    }
};
