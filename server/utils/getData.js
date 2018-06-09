const config = require('../config');

function getData(TableName){
    
    const knex = require('knex')(config.db);
    knex.select(
        'task',
        'issue',
        'sign',
        'success',
        'date',
        'time'
    )
    .from(TableName).
    then(function(data){
      const Excel = require('../out/toExcel.js')
      Excel.toExcel(data)
    })
}
module.exports={
    getData
}
