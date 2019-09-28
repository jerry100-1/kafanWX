// pages/firstpage/paySuccess/paySuccess.js
var theUrl=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:false,
    hidden2:false,
    theOrderId:"",
    yourallpaymoney:"",
    yourallcouponnum:"",
    yourcouponsprice:"",
    allSeriesTypeCard:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("这是从支付页面传递过来的orderId---" + options.theOrderId);
    this.setData({
      theOrderId: options.theOrderId
    });
    this.getAllCouponSeriesList();
  },
  closeTheModal:function()
  {
    var that=this;
    that.setData({
      hidden:false,
      hidden2:false
    })
  },
  closeTheModal2:function()
  {
    var that = this;
    that.setData({
      hidden2: false
    })
    
  },
  gotoMyAllOrder:function()
  {
    wx:wx.navigateTo({
      url: '../../firstpage/myallorder/myallorder',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    });
  },
  gotoMyAllCoupon:function()
  {
    wx.navigateTo({
      url: '../../firstpage/myallCouponCardList/myallCouponCardList',
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
  getAllCouponSeriesList:function()
  {
    var that=this;
   wx.request({
     url: theUrl.data.baseUrl +'/mini/order/paysuccess',
     method:"get",
     data:{
       storeid: wx.getStorageSync("storeid"),
       rd_session:wx.getStorageSync("rd_session"),
       orderid: that.data.theOrderId
     },
     header:{
       'content-type': 'application/json' // 默认值
     },
     success:function(res)
     {
       if(res.data.status==1)
       {
         console.log("这是支付成功接口返回给我的信息" + res.data);
          that.setData({
            allSeriesTypeCard: res.data.result.coupons
          });              
          that.setData({
             yourallpaymoney:res.data.result.paymoney
          });
          that.setData({
             yourallcouponnum:res.data.result.couponstotal
          });
          that.setData({
             yourcouponsprice: res.data.result.couponsprice
          });
       }else
       {

       }         
     },
     fail:function(res)
     {

     }

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