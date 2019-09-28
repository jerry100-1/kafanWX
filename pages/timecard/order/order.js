// pages/timecard/order/order.js
const app = getApp()
const api = app.data.baseUrl;
var timer; // 计时器
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '1', value: '余额', img:'../../../images/cneoid21.png' },
      { name: '21', value: '微信支付', img: '../../../images/cneoid20.png'},
    ],
    storeid:'',
    id:'',
    paytype:'',
    price:'',
    cardcodeid:'',

  },
  radioChange: function (e) {
    this.data.paytype = e.detail.value
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  tjdd(){
    wx.request({
      url: `${api}/mini/card/pay`,
      method:'post',
      data:{
        storeid: this.data.storeid,
        rd_session: this.rd_session,
        id: this.data.id,
        paytype: this.data.paytype,
        price: this.data.price
      },
      success:res=>{
        if(res.data.status == 1){
          this.data.cardcodeid = res.data.result.cardcodeid
          // 余额支付
          if(this.data.paytype == 1){
            // wx.navigateTo({
            //   url: `/pages/timecard/paymon/paymon?cardcodeid=${res.data.result.cardcodeid}`,
            // })
            wx.showToast({
              title: res.data.message,
              icon: 'success',
              duration: 2000
            })
            this.lx()
          }else{
            // 微信支付
            wx.requestPayment({
              timeStamp: res.data.result.timeStamp,
              nonceStr: res.data.result.nonceStr,
              package: res.data.result.package,
              signType: res.data.result.signType,
              paySign: res.data.result.paySign,
              success:res=>{
                // console.log(1222)
                // console.log(res)
                this.lx()
              },
              fail(res) {
                // wx.navigateTo({
                //   url: '/pages/timecard/timecard',
                // })
                wx.showToast({
                  title: '支付失败',
                  icon: 'loading',
                  duration: 2000
                })
               }
            })
          }
        }else{
          // wx.navigateTo({
          //   url: '/pages/timecard/timecard',
          // })
          wx.showToast({
            title: res.data.message,
            icon: 'loading',
            duration: 2000
          })
        }
      }
    })
  },
  lx(){
    wx.request({
      url: `${api}/mini/card/query`,
      data:{
        rd_session: this.rd_session,
        id: this.data.cardcodeid,
        storeid: this.data.storeid
      },  
      success:res=>{
        if(res.data.status == 0){
          wx.showToast({
            title: res.data.message,
            icon: 'loading',
            duration: 2000
          })
          this.pauseBtn()
        }else if(res.data.status == 1){
          wx.navigateTo({
            url: `/pages/timecard/paymon/paymon?cardcodeid=${this.data.cardcodeid}`,
          })
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 2000
          })
          this.pauseBtn()
        }else if(res.data.status == 2){
          wx.showToast({
            title: res.data.message,
            icon: 'loading',
            duration: 2000
          })
          this.startbtn()
        }
      }
    })
  },
  startbtn(){
    timer = setInterval(function () {
      this.lx()
    }, 3000)
  },
  pauseBtn: function () {
    console.log("暂停按钮");
    clearTimeout(timer);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.rd_session = wx.getStorageSync('rd_session')
    this.data.storeid = wx.getStorageSync('storeid')
    this.data.price = options.verifprice
    this.data.id = options.id
    this.setData({
      price: options.verifprice
    })
    console.log(options)
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