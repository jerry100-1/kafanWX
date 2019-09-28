// pages/testauth/auth.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("12321423546465465426765754756");
          wx.getSetting({
            success: function (res) {
              var statu = res.authSetting;
              if (!statu['scope.userLocation']) {
                wx.showModal({
                  title: '是否授权当前位置',
                  content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
                  success: function (tip) {
                    if (tip.confirm) {
                      wx.openSetting({
                        success: function (data) {
                          if (data.authSetting["scope.userLocation"] === true) {
                            console.log("111111111111111111111111111")

                            wx.showToast({
                              title: '授权成功',
                              icon: 'success',
                              duration: 1000
                            })
                            //授权成功之后，再调用chooseLocation选择地方
                            wx.chooseLocation({
                              success: function (res) {
                                obj.setData({
                                  addr: res.address
                                });
                                console.log("你好,你获取的地址是" + res.address);
                              },
                            })
                          } else {
                            wx.showToast({
                              title: '授权失败',
                              icon: 'success',
                              duration: 1000
                            })
                          }
                        }
                      })
                    }
                  }
                })
              }
            },
            fail: function (res) {
              wx.showToast({
                title: '调用授权窗口失败',
                icon: 'success',
                duration: 1000
              })
            }
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

  }
})