var config = require('../../config')
var util = require('../../utils/util.js')
Page({

  data: {
  
  },


  onLoad: function (options) {
    console.log(getApp().globalData)
    this.setData({
      Datas: getApp().globalData
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
          wifi_List[j] = getApp().globalData.userInfo[0]
          temp.push(wifi_List[j])
        }
      }

      try {
        wx.setStorageSync('Baseline', obj)
      } catch (e) {
        console.log(e)
      }
      wx.getStorageSync('Baseline')
      var temp = wx.getStorageSync('userData')
      
      wx.request({
            url: config.service.POSTUrl,
            data: {
              task: getApp().globalData.task.task,
              issue: "",
              classnumber:'',
              sign:temp[0],
              wifi: wx.getStorageSync('Baseline')
            },
            method: 'POST',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res.data)
            },
            fail: function (res) {
              console.log(res.data)
             },
            complete: function (res) { },
          })
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
  
  }
})