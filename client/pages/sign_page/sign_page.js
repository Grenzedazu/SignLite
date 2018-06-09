
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    auto_hide: true
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

      var obj = {}
      var temp = [];
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
          task: getApp().globalData.task,
          issue: that.data.user_Info[1],
          sign: that.data.user_Info[0],
          wifi: wx.getStorageSync('baseline')
        },
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res.data)
          wx.navigateTo({
            url: '../success_page/success_page',
          })
        },
        fail: function (res) {
          console.log(res.data)
          wx.navigateTo({
            url: '../failed_page/failed_page',
          })
        },
        complete: function (res) { },
      })
    })

  },
  getTask: function(e){
    console.log(e)
    if(e.detail.value === ""){
      wx.showToast({
        title: '请输入发布人提供的口令',
        icon: "none"
      })
      this.setData({
        auto_hide: true
      })
    }else{
      this.setData({
        auto_hide: false
      })
      getApp().globalData.task = e.detail.value;
    }
  },
  onReady: function () {

  },

  onShow: function () {
    var globalData = getApp().globalData;
    this.setData({
      user_Info: globalData.userInfo,
      tags: globalData.tags
    })
  
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