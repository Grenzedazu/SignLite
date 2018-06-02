const config = require('../config');
const processor = require('./processor.js');
// 连接数据库
const knex = require('knex')(config.db);
module.exports = {
    hello: async (ctx, next) => {
        return ctx.response.body = 'Hello world';
    },
    insert: async (ctx, next) => {
        console.log(ctx.request.body);
        let mydate = new Date();
        let information = {
            task: ctx.request.body.task,
            issue: ctx.request.body.issue,
            sign: ctx.request.body.sign,
            wifi: ctx.request.body.wifi,
            date: mydate.toLocaleDateString(),
            time: mydate.toLocaleTimeString(),
        };
        await knex(config.recordName).insert(information)
            .catch(function (e) {
                console.error(e);
            })
            .then(
                console.log("sign columns insert success")
            );
        console.log(information);
        return ctx.response.body = ctx.request.body;
    }
}