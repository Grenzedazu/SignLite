var config = require('../../config')
var util = require('../../utils/util.js')
Page({

  data: {
    auto_hide: true
  },


  onLoad: function (options) {
    var globalData = getApp().globalData;
    console.log(getApp().globalData)
    this.setData({
      Datas: getApp().globalData,
      user_Info: globalData.userInfo,
      tags: globalData.tags
    })
  },
  formSubmit: function (e) {
    getApp().globalData.task=e.detail.value
    console.log(getApp().globalData)
  },
  search: function () {
    var that = this
    wx.startWifi()
    wx.getWifiList()
    wx.onGetWifiList(function (res) {
      console.log(res.wifiList)

      var wifi_List = new Array();

      for (var i = 0; i < res.wifiList.length; i++) {
        wifi_List.push(
          res.wifiList[i].SSID + " " + res.wifiList[i].BSSID// + //":" + " " +
          //res.wifiList[i].signalStrength
        )
      }
      console.log(wifi_List)

      var obj = {}, temp = [];
      for (var j = 0; j < wifi_List.length; j++) {
        if (!obj[wifi_List[j]]) {
          obj[wifi_List[j]] = that.data.user_Info[0];
          temp.push(wifi_List[j])
        }
      }
      console.log('objdebug')
      console.log(obj)
      try {
  
        wx.setStorageSync('baseline', obj)
      } catch (e) {
        console.log(e)
      }
      wx.request({
            url: config.service.POSTUrl,
            data: {
              task: getApp().globalData.task.task,
              issue: "",
              sign:getApp().globalData.userInfo[0],
              wifi:wx.getStorageSync('baseline')
            },
            method: 'POST',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) { 
              console.log(res.data)
              wx.showToast({
                title: '发布成功',
              })
            },
            fail: function (res) {
              console.log(res.data)
              wx.showToast({
                title: '签到失败，请检查网络连接',
                icon:"none"
              })
             },
            complete: function (res) { },
          })
        })
    },
  getTask: function (e) {
    console.log(e)
    if (e.detail.value === "") {
      wx.showToast({
        title: '请输入发布人提供的口令',
        icon: "none"
      })
      this.setData({
        auto_hide: true
      })
    } else {
      this.setData({
        auto_hide: false
      })
      getApp().globalData.task = e.detail.value;
    }
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
  
  }
})