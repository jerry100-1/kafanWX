// pages/discountcoupon/discountcoupon.js
const app = getApp()
const api = app.data.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xz1:true,
    xz2:false,
    xz3:false,

    storeid:'',
  },

  xz1(){
    this.setData({
      xz1:true,
      xz2:false,
      xz3:false
    })
  },
  xz2() {
    this.setData({
      xz1: false,
      xz2: true,
      xz3: false
    })
  },
  xz3() {
    this.setData({
      xz1: false,
      xz2: false,
      xz3: true
    })
  },
  getlist(){
    wx.request({
      url: `${api}/mini/member/submembercoupon`,
      data:{
        storeid: this.data.storeid,
        rd_session: this.rd_session,
        mid:this.mid
      },
      success:res=>{
        console.log(res)
        this.setData({
          count:res.data.result.count,
          notuselist: res.data.result.notuselist,
          usedlist: res.data.result.usedlist,
          timeoutlist: res.data.result.timeoutlist
        })
      }
    })
  },
  lower(){
    console.log(11)
  },
  tofwqhx(e){
    console.log(e.target.dataset.cid)
    wx.navigateTo({
      url: `/pages/discountcoupon/fwqhx/fwqhx?cid=${e.target.dataset.cid}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.rd_session = wx.getStorageSync('rd_session')
    this.data.storeid = wx.getStorageSync('storeid')
    this.mid = options.mid
    // this.mid = 10009
    this.getlist()
    this.setData({
      nickname: options.nickname,
      nickimg: options.img,
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