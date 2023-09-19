//import dependencias
const mysql = require('mysql2/promise');

//var de entorno mediante destructuring
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB} = process.env;

//var almacenaje grupo conexiones
let pool;

//funcion que retoma la libre conexion con la base de datos
const getDb = async () => {
    try {
        //si la variable pool es undefined..
        if (!pool) {
            //creamos conexion con al sql server
            const connection = await mysql.createConnection({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                timezone: 'Z'
            })

            //creamos base de datos si no existe
            await connection.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DB}`);

            //creamos grupo de conexion
            pool = mysql.createPool({
                connectionLimit: 10,
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                database: MYSQL_DB,
                timezone: 'Z'
            })
        }
    

        //retornamos conexion libre con base de datos 
        return await pool.getConnection();
    } catch (err) {
        console.error(err);
    }
}

//exportar la funcion anterior 
module.exports = getDb;