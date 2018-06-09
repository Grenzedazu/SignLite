var config = require('../../config.js')

Page({
  data: {
  },

  formSubmit: function (e) {
    var globalData = getApp().globalData
    var InfoReturn = e.detail.value
    console.log(e)
    if (InfoReturn.stu_name !== "") {
      console.log(globalData)
      for (var i = 0; i < 3; i++) {
        globalData.userInfo[i] = InfoReturn[this.data.names[i]]
      }

      wx.setStorage({
        key: 'userData',
        data: globalData.userInfo,
      })
      console.log(e.detail.value)
      wx.navigateBack({
        delta:1
      })
    }
    else {
      wx.showModal({
        title: '输入项不可为全部为空哦',
      })
    }


  },

  click: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  onLoad: function (options) {
    var globalData = getApp().globalData
    this.setData({
      user_Info: globalData.userInfo,
      names: globalData.names,
      tags: globalData.tags
    })
  },

  onReady: function () {

  },

  onShow: function () {
  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  },



})