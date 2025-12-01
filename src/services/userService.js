import User from '../models/User.js';
import bcrypt from 'bcrypt'; // Asegúrate de haber instalado 'bcrypt'

const SALT_ROUNDS = 10; // Nivel de seguridad para el hashing

export const userService = {

    // ===========================================
    // FUNCIONES DE BÚSQUEDA
    // ===========================================

    // Necesario para el Login seguro
    async getUserByEmail(email) {
        return User.findOne({ where: { correo: email } });
    },

    // Necesario para la Gestión de Usuarios (CRUD)
    async getAllUsers() {
        return User.findAll();
    },

    async getUserByRun(run) {
        return User.findByPk(run);
    },

    // ===========================================
    // FUNCIONES CRUD CON LÓGICA DE NEGOCIO Y SEGURIDAD
    // ===========================================

    async createUser(userData) {
        // 1. Verificar si el RUN ya existe (Lógica de Negocio)
        const existingUser = await User.findByPk(userData.run);
        if (existingUser) {
            throw new Error("El RUN ya está registrado.");
        }
        
        // 2. 🔑 Hashing de la contraseña (Seguridad - IE3.3.1)
        if (!userData.password) {
             throw new Error("La contraseña es requerida.");
        }
        const passwordHash = await bcrypt.hash(userData.password, SALT_ROUNDS);

        // 3. Crear el usuario en la DB
        const newUser = {
            run: userData.run,
            nombre: userData.nombre,
            apellidos: userData.apellidos,
            correo: userData.correo,
            tipo: userData.tipo,
            direccion: userData.direccion,
            passwordHash: passwordHash // Guardamos el hash, NO la contraseña original
        };

        return User.create(newUser);
    },

    async updateUser(run, updates) {
        // 1. Si se intenta actualizar la contraseña, la hasheamos primero
        if (updates.password) {
            updates.passwordHash = await bcrypt.hash(updates.password, SALT_ROUNDS);
            delete updates.password; // Eliminamos el campo original
        }

        // 2. Actualizar el registro en la DB
        const [updatedRowsCount] = await User.update(updates, {
            where: { run }
        });

        if (updatedRowsCount === 0) {
            return null; // Usuario no encontrado
        }
        
        // 3. Devolver el usuario actualizado
        return this.getUserByRun(run); 
    },

    async deleteUser(run) {
        const deletedRows = await User.destroy({
            where: { run }
        });
        return deletedRows > 0;
    }
};