const pool = require('../db');


//! feteching data form the DataBase
async function getData(table){
    const tableData = await pool.query(`SELECT * FROM ${table}`);
    return tableData;
}
module.exports = getData