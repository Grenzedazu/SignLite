const Router = require('koa-router');
const controllers=require('../controllers/message.js');
const router = new Router();
router.get('/hello',controllers.hello);
// 提交考勤信息
router.post('/insert',controllers.insert);
module.exports=router;