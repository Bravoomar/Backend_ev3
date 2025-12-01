import { Sequelize } from 'sequelize';

// 1. Define la conexión a SQLite. El archivo 'db.sqlite' se creará automáticamente.
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite', // Nombre del archivo de la DB
    logging: false // Deshabilita la salida de logs de SQL en la consola
});

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a la base de datos SQLite establecida correctamente.');

        // 2. Sincroniza los modelos (crea las tablas si no existen)
        await sequelize.sync({ alter: true }); // 'alter: true' ajusta las tablas sin borrarlas si ya existen
        console.log('✅ Modelos sincronizados con la base de datos.');

    } catch (error) {
        console.error('❌ Error al conectar o sincronizar la base de datos:', error);
    }
}

export { sequelize, connectDB };