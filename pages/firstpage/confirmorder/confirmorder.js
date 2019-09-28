// pages/firstpage/confirmorder/confirmorder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeFlag:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  chooseway1:function()
  {
    console.log("此方法执行了!");
    var that=this;
    //this.data.activeFlag=1;
    that.setData({
       activeFlag: 1
     })
  },
  chooseway2: function () {
    console.log("此方法执行了!");
    //this.data.activeFlag = 2;
    var that = this;
    that.setData({
      activeFlag: 2
    })
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