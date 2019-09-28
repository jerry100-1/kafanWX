// pages/timecard/paymon/paymon.js
const app = getApp()
const api = app.data.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeid:'',
    id:"",
  },
  ck(){
    wx.navigateTo({
      url: `/pages/timecard/timecard`,
    })
  },
  gw(){
    wx.navigateTo({
      url: `/pages/firstpage/firstpage`,
    })
  },
  getlist(){
    wx.request({
      url: `${api}/mini/card/paysuccess`,
      data:{
        storeid: this.data.storeid,
        id:this.data.id,
        rd_session: this.rd_session
      },
      success:res=>{
        this.setData({
          data1:res.data.result
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.cardcodeid
    // this.data.id = 79
    this.rd_session = wx.getStorageSync('rd_session')
    this.data.storeid = wx.getStorageSync('storeid')
    this.getlist()
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