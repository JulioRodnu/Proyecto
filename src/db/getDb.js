//import dependencias
const mysql = require('mysql2/promise');

//var almacenaje grupo conexiones
let pool;

//funcion que retoma la libre conexion con la base de datos
const getDb = async () => {
    try {
        //si la variable pool es undefined..
        if (!pool) {
            //creamos conexion con al sql server
            const connection = await mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'qwerty123',
                timezone: 'Z'
            })

            //creamos base de datos si no existe
            await connection.query('CREATE DATABASE IF NOT EXIST tertulia');

            //creamos grupo de conexion
            pool = mysql.createPool({
                connectionLimit: 10,
                host: 'localhost',
                user: 'root',
                password: 'qwerty123',
                database: 'tertulia',
                timezone: 'Z'
            })
        }

        //retornamos conexion libre con base de datos 
        return await pool.getconnection();
    } catch (err) {
        console.error(err);
    }
}

//exportar la funcion anterior 
module.exports = getDb;