var xl = require('excel4node');
data = {}
/**
 * 任务有没有挂载
 */
var isTasked = function (task) { 
  return data[task]
}

/**
 * 挂任务
 */
async function setTask(task, obj) {
  // if (isTasked(task) === undefined) {
  //   data[task] = []
  // }
  data[task] = makeArray(obj);

}

/**
 * 制表
 */
var toExcel = function (task) {
  var taskObj = data[task]
  var array = makeArray(taskObj[0])
  for (var j = 0; j < taskObj.length; j++) {

  }

  var myWb = new xl.Workbook();
  var myWs = myWb.addWorksheet('Sheet 1');
  for (var i = 0; i < 10; i++) {
    myWs.cell(i + 1, 1).string("sfajg");
  }
  myWb.write('../output/' + task + '.xlsx');
}

/**
 * 获取对象长度
 */
var getObjLength = function (obj) {
  var count = 0;
  for (var key in obj) {
    count++;
  }
  return count;
};

/**
 * 计算数组在对象里的不匹配率
 */
var getRate = function (obj, task) {
  var numOfNum = 0;
  var array = data[task];
  for (var i = 0; i < array.length; i++) {
    if (obj[array[i]] === undefined) {
      numOfNum++;
    }
  }
  if(numOfNum / getObjLength(obj)<=0.5){
    return true
  }else{
    return false
  }
};

/**
 * 将对象制作成数组
 */
var makeArray = function (obj) {
  var array = []
  for (var key in obj) {
    array.push(key)
  }

  return array;
}

module.exports = {
  setTask,
  toExcel,
  isTasked,
  getRate
};