// pages/timecard/timecard.js
const app = getApp()
const api = app.data.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xz1: true,
    xz2: false,
    xz3: false,
    tcbol:false,
    
    zstcbol: false,

    storeid:'',
    type:'1',
  },
  xxz1(){
    this.setData({
      xz1:true,
      xz2:false,
      xz3:false
    })
    this.data.type = '1'
    this.getlist1()
  },
  xxz2() {
    this.setData({
      xz1: false,
      xz2: true,
      xz3: false
    })
    this.data.type = '2'
    this.getlist1()
  },
  xxz3() {
    this.setData({
      xz1: false,
      xz2: false,
      xz3: true
    })
    this.data.type = '3'
    this.getlist1()
  },
  getlist1(){
    wx.request({
      url: `${api}/mini/card`,
      data:{
        storeid: this.data.storeid,
        rd_session: this.rd_session,
        type: this.data.type
      },
      success:res=>{
        if(res.data.status == 1){
          if (res.data.result.mycard) {
            console.log(res)
            this.setData({
              mycard: res.data.result.mycard,
            })
          } else if (res.data.result.usablecardcode) {
            console.log(res)
            this.setData({
              usablecardcode: res.data.result.usablecardcode
            })
          }
          if (res.data.result.giftinfo != ''){
            console.log(1)
            this.data.zstcbol = true
          }else{
            console.log(2)
            this.data.zstcbol = false
          }
          this.setData({
            zstcbol:this.data.zstcbol,
            giftinfo: res.data.result.giftinfo
          })
          console.log(this.data.zstcbol)
        }
        
        console.log(res)
      }
    })
  },
  zffwf(e){
    wx.navigateTo({
      url: `/pages/timecard/order/order?id=${e.target.dataset.id}&verifprice=${e.target.dataset.verifprice}`,
    })
    console.log(e.target.dataset)
  },

  // 核销
  hx(e){
    console.log(e.target.dataset)
    wx.request({
      url: `${api}/mini/card/showcode`,
      data:{
        storeid: this.data.storeid,
        rd_session: this.rd_session,
        id: e.target.dataset.id
      },
      success:res=>{
        console.log(res.data)
        this.setData({
          imghx: res.data.result.qrcode,
          tcbol: true
        })
      }
    })
  },
  qx(){
    this.setData({
      tcbol: false
    })
  },

  // 礼品领取
  shlq(){
    this.setData({
      zstcbol:false
    })
  },
  ljlq(){
    wx.request({
      url: `${api}/mini/card/receivegift`,
      data:{
        storeid: this.data.storeid,
        rd_session: this.rd_session
      },
      success:res=>{
        if(res.data.status == 1){
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 2000
          })
          this.setData({
            zstcbol: false
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
    this.getlist1()
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