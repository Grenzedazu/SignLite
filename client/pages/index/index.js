
const app = getApp()

Page({
  data: {
    user: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  
  onLoad: function () {
    console.log(app.globalData)
    if (app.globalData.user) {
      this.setData({
        user: app.globalData.user,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          user: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.user = res.userInfo
          this.setData({
            user: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.setData({
      obj: getApp().globalData
    })
  },
  
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.user = e.detail.userInfo
    this.setData({
      user: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  goto_sign:function(){
    if (getApp().globalData.userInfo[0]!==undefined)
    {
      console.log(getApp().globalData.userInfo)
      wx.navigateTo({
        url: '../sign_page/sign_page'　　// 签到页面
      })
    }
    else{
      wx.showModal({
        title: '请先完善用户信息',
        success:function(res)
        {
          if(res.confirm)
          {
            wx.navigateTo({
              url: '../user_info/user_info'　　// 信息填写
            })
          }
        }
      })
    }
    
  },
  spring_to_user_info: function () {
    wx.navigateTo({
      url: '../user_info/user_info',
    })
  },
  goto_issue: function () {
    wx.navigateTo({
      url: '../issue_page/issue_page'　　// 签到页面
    })
  }
})
