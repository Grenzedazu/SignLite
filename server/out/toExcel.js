var xl = require('excel4node');

// var dataObj = [
//     {task: '3456', issue: 'sdgh', sign: 'sjfk', success: true, date: 'sfgksu', time: 'sjfkgs'},
//     {task: '3456', issue: 'sdgh', sign: 'sjfk', success: true, date: 'sfgksu', time: 'sjfkgs'},
//     {task: '3456', issue: 'sdgh', sign: 'sjfk', success: true, date: 'sfgksu', time: 'sjfkgs'}
// ];

// var tags = ['issue', 'sign', 'success', 'date', 'time'];
var toExcel = function(dataObj){
  var names = ['学号', '名称', '签到状态', '日期', '时间'];
  console.log(dataObj)
  if (dataObj[0] === undefined) {
    console.log("The Obj is undefined");
  } else {

    /**
     * 建立excel的文件对象和工作表对象
     */
    var workBootObj = new xl.Workbook();
    var workSheetObj = workBootObj.addWorksheet('Sheet 1');

    /**
     * 制作excel内容
     */


    for (var i = 0; i < 5; i++) {
      workSheetObj.cell(1, i + 1).string(names[i]);
    }

    for (var c = 0; c < dataObj.length; c++) {
      workSheetObj.cell(c + 2, 1).string(dataObj[c].issue);
      workSheetObj.cell(c + 2, 2).string(dataObj[c].sign);
      if (dataObj[c].success) {
        workSheetObj.cell(c + 2, 3).string("成功");
      } else {
        workSheetObj.cell(c + 2, 3).string("失败");
      }
      workSheetObj.cell(c + 2, 4).string(dataObj[c].date);
      workSheetObj.cell(c + 2, 5).string(dataObj[c].time);
    }

    /**
     * 输出Excel文件
     */
    workBootObj.write(dataObj[0].task + '.xlsx');

    console.log("build");
  }

}

module.exports = {
  toExcel
}