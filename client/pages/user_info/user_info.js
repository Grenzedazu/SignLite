var config = require('../../config.js')
// pages/user_info/user_info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  formSubmit: function (e) {
    var globalData = getApp().globalData
    var InfoReturn = e.detail.value
    for(var i=0; i<3; i++){
      globalData.userInfo[i] = InfoReturn[this.data.names[i]]
    }

    console.log(e.detail.value)
    
    wx.redirectTo({
      url: '../qiandao/qiandao',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var globalData = getApp().globalData
    this.setData({
      user_Info: globalData.userInfo,
      names: globalData.names,
      tags: globalData.tags
    })
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
  sign: function(){
    wx.request({
      url: config.service.POSTUrl,
      data: {
        'data': "Hello, I'm in data"
      },
      header: {
        'extra': 'success'
      },
      success: function(res){
        console.log(JSON.stringify(res.data))
      }
    })
  }
})