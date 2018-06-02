const config=require('../config');
module.exports=async (ctx, next) => {
    // 连接数据库
    const knex = require('knex')(config.db);
    // 定义和创建数据表
    await knex.schema.createTableIfNotExists(config.recordName, function (table) {
        table.string('task');
        table.string('issue');
        table.string('sign');
        table.string('wifi');
        table.string('date');
        table.string('time');
    })
        .then(function(res) {
            console.log("build database success");
        })
        .catch(function(e) {
        console.error(e);
        });
    return knex;
};