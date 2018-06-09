const config=require('../config');
async function createTable(Name){
  const knex = require('knex')(config.db);
    // 定义和创建数据表
    await knex.schema.createTableIfNotExists(Name, function (table) {
        table.string('task');
        table.string('issue');
        table.string('sign');
        table.boolean('success');
        table.string('date');
        table.string('time');
    })
        .then(function(res) {
            console.log("build table success");
        })
        .catch(function(e) {
        console.error(e);
        });
    return knex;
}
module.exports= {
    createTable
};