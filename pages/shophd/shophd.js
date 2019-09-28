// pages/shophd/shophd.js
const app = getApp()
const api = app.data.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeid:'',
    hdid:'',
  },
  getlist(){
    wx.request({
      url: `${api}/mini/activity`,
      data:{
        storeid: this.data.storeid,
        rd_session: this.rd_session
      },
      success:res=>{
        this.setData({
          data:res.data.result
        })
        if (res.data.result.verifystatus == 1){
          this.data.hdid = res.data.result.id
          this.setData({
            tc:true,
            datatab1: res.data.result.coupons
          })
        }else{
          this.setData({
            tc:false
          })
        }
        console.log(res.data.result)
      }
    })
  },
  qx(){
    this.setData({
      tc: false
    })
  },
  lq(){
    wx.request({
      url: `${api}/mini/getactivitygift`,
      data:{
        storeid: this.data.storeid,
        rd_session: this.rd_session,
        id:this.data.hdid
      },
      success:res=>{
        if(res.data.status == 1){
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 2000
          })
          this.setData({
            tc:false
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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