const config=require('../config');
async function createTable(Name){
  const knex = require('knex')(config.db);
    // 定义和创建数据表
    await knex.schema.createTableIfNotExists(Name, function (table) {
        table.string('口令');
        table.string('学号');
        table.string('班级');
        table.string('姓名');
        table.boolean('是否成功');
        table.string('日期');
        table.string('时间');
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