//app.js
App({
  data: {
    baseUrl: "http://kf.hongbao19.net",
    authcode: "",
    rd_session: "",

  },
  onLaunch: function (e) {
    console.log(111)
    console.log(e)
    console.log(e.query)
    console.log(e.query.f)
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.log("");
              var userInfo = res.userInfo
              var nickName = userInfo.nickName
              var avatarUrl = userInfo.avatarUrl
              var gender = userInfo.gender //性别 0：未知、1：男、2：女
              var province = userInfo.province
              var city = userInfo.city
              var country = userInfo.country
              var address = userInfo.address;

              console.log("获取的用户匿名" + nickName);
              console.log("获取的用户省份是" + province);
              console.log("获取的用户城市是" + city);
              console.log("获取的用户地址是" + address);
            }
          })


        }
      }
    })
    //展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    

  },
  globalData: {
    userInfo: null,
    localRanking: null,
    userRole: 1
  },

})