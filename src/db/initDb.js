//import var de entorno en fichero .env
require('dotenv').config();

//import la funcion que obtiene conexion libre a la base
const getDb = require('./getDb');

//funcion que borrara tablas de base de datos 
const main = async () => {
    //variable que almacenara conexion libre
    let connection;

    try {
        let connection = await getDb();

        console.log('creando tablas...');

        await connection.query()
    } catch (err) {
        console.error(err);
    } finally {
        //si existe conexion se libera 
        if (connection) connection.release();

        //finalizamos el proceso
        process.exit();
    }
}

//llamamos funcion anterior
main();