//app.js
var config = require('./config')

App({
    onLaunch: function () {
        
    },
    globalData: {
      userInfo: ['Levin', '364875', '7836194'],
      names: ['stu_name', 'stu_ID', 'Class'],
      tags: ['姓名', '学号', '班级']
    }
  ,
  onHide: function(){
    wx.removeStorage({
      key: 'Baseline',
      success: function(res) {
      },
    })
  }
})