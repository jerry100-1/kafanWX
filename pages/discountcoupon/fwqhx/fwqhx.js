// pages/discountcoupon/fwqhx/fwqhx.js
const app = getApp()
const api = app.data.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeid:'',
  },
  getlist(){
    wx.request({
      url: `${api}/mini/coupon/showcode`,
      data:{
        storeid: this.data.storeid,
        rd_session: this.rd_session,
        cid: this.cid
      },
      success:res=>{
        this.setData({
          data:res.data.result
        })
        console.log(res.data.result)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.rd_session = wx.getStorageSync('rd_session')
    this.data.storeid = wx.getStorageSync('storeid')
    this.cid = options.cid
    // this.cid = 212
    // console.log(options.cid)
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