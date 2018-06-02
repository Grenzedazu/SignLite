var config = require('../../config')
var util = require('../../utils/util.js')

// pages/qiandao/qiandao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    task: null,
    issue: null,
    sign: null,
    wifi: null
  },

  /**
   * 生命周期函数--监听页面加载
   */

  spring_to_user_info:function(){
    wx.redirectTo({
      url: '../user_info/user_info',
    })
  },
  onLoad: function (options) {
    //拉数据
    var globalData = getApp().globalData;
    this.setData({
      user_Info: globalData.userInfo,
      tags: globalData.tags
    })
    function searchWifi(){
  
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /**
   * 签到发出请求
   */
  searchWifi: function () {
    //在app.js 加入onHide: function(){try { 
    //wx.removeStorageSync('Baseline')
    //}catch(e) {
    //console.log(e)
    //} },
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
      console.log(obj)
      console.log(temp)
      try {
        wx.setStorageSync('Baseline', obj)
      } catch (e) {
        console.log(e)
      }
      wx.getStorageSync('Baseline')
      console.log(wx.getStorageSync('Baseline'))
      //
      wx.request({
            url: config.service.POSTUrl,
            data: {
              task: "xxxxxx",
              issue: "xxxxxxxx",
              sign:"Kevin",
              wifi: wx.getStorageSync('Baseline'),

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
    } 
})  