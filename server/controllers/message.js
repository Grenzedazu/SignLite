const config = require('../config');
const processor = require('./processor.js');
const cTB = require('../utils/createTable.js');

// 连接数据库
const knex = require('knex')(config.db);
module.exports = {
    hello: async (ctx, next) => {
        return ctx.response.body = 'Hello world';
    },
    message: async (ctx, next) => {
      console.log(ctx.request.body)
      let mydate = new Date();
      let information = {
        task: ctx.request.body.task,
        issue: ctx.request.body.issue,
        classnumber: ctx.request.body.classnumber,
        sign: ctx.request.body.sign,
        success: false,
        date: mydate.toLocaleDateString(),
        time: mydate.toLocaleTimeString(),
      }
      if (processor.isTasked(information.task) === undefined) {
        processor.setTask(information.task, ctx.request.body.wifi)
        cTB.createTable(ctx.request.body.task)
      } else {
        information.success = processor.getRate(ctx.request.body.wifi, ctx.request.body.task)
        await knex(ctx.request.body.task).insert(information)
          .catch(function (e) {
            console.error(e);
          })
          .then(
          console.log("sign columns insert success")
          );
        console.log(information);
      }
      return ctx.response.body = ctx.request.body;
    }
}