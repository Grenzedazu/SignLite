
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
  },

  onLoad: function (options) {
    var globalData = getApp().globalData;
    this.setData({
      user_Info: globalData.userInfo,
      tags: globalData.tags
    })
  },
  spring_to_user_info: function () {
    wx.navigateTo({
      url: '../user_info/user_info',
    })
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
          temp.push(wifi_List[j])
        }
      }

      try {
        wx.setStorageSync('baseline', obj)
      } catch (e) {
        console.log(e)
      }
      wx.getStorageSync('baseline')
     var temp = wx.getStorage('userData')
      wx.request({
        url: config.service.POSTUrl,
        data: {
          issue: temp[1],
          classnumber: temp[2],
          sign: temp[0],
          wifi: wx.getStorageSync('')
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
  
  },

  
})  