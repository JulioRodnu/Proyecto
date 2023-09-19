//import var de entorno en fichero .env
require('dotenv').config();

//import la funcion que obtiene conexion libre a la base
const getDb = require('./getDb');

//funcion que borrara tablas de base de datos 
const main = async () => {
    //variable que almacenara conexion libre
    let connection;

    try {
        connection = await getDb();

        console.log('borrando tablas...');
        await connection.query('DROP TABLE IF EXISTS likes');
        await connection.query('DROP TABLE IF EXISTS reseñas');
        await connection.query('DROP TABLE IF EXISTS users');

        console.log('creando tablas...');

        await connection.query(`
    CREATE TABLE IF NOT EXISTS users (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(100) UNIQUE NOT NULL,
        username VARCHAR(30) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        avatar VARCHAR(100),
        role ENUM('admin', 'normal') DEFAULT 'normal',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

await connection.query(`
    CREATE TABLE IF NOT EXISTS reseñas (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        userId INT UNSIGNED NOT NULL,
        text VARCHAR(1000) NOT NULL,
        image VARCHAR(100),
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(userId) REFERENCES users(id)
    )
`);

await connection.query(`
    CREATE TABLE IF NOT EXISTS likes (
        id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        userId INT UNSIGNED NOT NULL,
        reseñaId INT UNSIGNED NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(userId) REFERENCES users(id),
        FOREIGN KEY(reseñaId) REFERENCES reseñas(id) 
    )
`);

    } finally {
        //si existe conexion se libera 
        if (connection) connection.release();

        //finalizamos el proceso
        process.exit();
    }
}

//llamamos funcion anterior
main();