// pages/Storesdetails/Storesdetails.js
const app = getApp()
const api = app.data.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    lng:'',
    lat:'',
    title:'',
    address:'',
    tel:'',
  },
  calltel(){
    wx.makePhoneCall({
      phoneNumber: this.data.tel //仅为示例，并非真实的电话号码
    })
  },
  getlist(e){
    wx.request({
      url:`${api}/mini/storeinfo`,
      data:{
        storeid:e,
        rd_session: this.rd_session
      },
      success:res=>{
        this.setData({
          data1:res.data.message
        })
        this.lng = res.data.message.lng
        this.lat = res.data.message.lat
        this.title = res.data.message.title
        this.address = res.data.message.address
        this.data.tel = res.data.message.tel
        console.log(res.data.message)
      },
      fail(err){
        console.log(err)
      }
    })
  },
  tomap(){
    wx.navigateTo({
      url: `/pages/Storesdetails/map/map?lat=${this.lat}&lng=${this.lng}&title=${this.title}&address=${this.address}`,
    })
    console.log(this.id)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.rd_session = wx.getStorageSync('rd_session')
    this.id = wx.getStorageSync('storeid')
    console.log(app)
    console.log(api)
    this.getlist(this.id)
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