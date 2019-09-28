// pages/firstpage/myallCouponCardList/myallCouponCardList.js
var theUrl=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: true,
    selected2: false,
    selected3: false,
    hidden:false,
    hidden1:false,
    hidden2: false,
    count1: 0,
    count2:0,
    hidden2:true,
    myallCouponNotUseList:[],//未使用的优惠券
    myallCouponHavaUseList:[],//已使用的优惠券
    myallCouponExpiredList: [],//已过期的优惠券
    shareCountNumber:0,
    shareCountNumber2:10
  },
 
  plusShareCountNumber:function()
  {
    this.setData({
      shareCountNumber: this.data.shareCountNumber+1
    });
    
  },
  minusShareCountNumber: function () {
      this.setData({
        shareCountNumber: this.data.shareCountNumber - 1
      });
      if (this.data.shareCountNumber < 0) {
        this.setData({
          shareCountNumber: 0
        });
      }
    
  },
  computedNumPlus:function()
  {
    this.setData({
      shareCountNumber2: this.data.shareCountNumber2 + 1
    });
  },
  computedNumMinus: function () {
    this.setData({
      shareCountNumber2: this.data.shareCountNumber2 - 1
    });
    if (this.data.shareCountNumber2 < 0) {
      this.setData({
        shareCountNumber2: 0
      });
    }

  },
  selected: function (e) {
    this.setData({
      selected: true,
      selected2: false,
      selected3: false,

    })
  },
  selected2: function (e) {
    this.setData({
      selected: false,
      selected2: true,
      selected3: false,
    })
  },
  selected3: function (e) {
    this.setData({
      selected: false,
      selected2: false,
      selected3: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllTypeCouponList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getAllTypeCouponList:function()
  {
    var that=this;
    wx.request({
      url: theUrl.data.baseUrl +'/mini/coupon',
      method:"GET",
      data:{
        storeid: wx.getStorageSync("storeid"),
        rd_session:wx.getStorageSync("rd_session")      
      },
      header: {
        'content-type':'application/json' // 默认值
      },
      success:function(res)
      {
        if(res.data.status==1)
        {
          console.log("这是获取所有的优惠券列表接口返回给我的数据");
          that.setData({
             myallCouponNotUseList: res.data.result.notuselist
           });
           that.setData({
             myallCouponHavaUseList:res.data.result.usedlist
           });
           that.setData({
             myallCouponExpiredList: res.data.result.timeoutlist
           })
          console.log("你好,这是已使用的优惠券的总的个数" + that.data.myallCouponHavaUseList.length);
        }
      },
      fail:function(res)
      {
       
      }

    })
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
  shareFun: function () {
    var that=this;
    console.log("此方法已执行88888888888888888!");
    that.setData({
      hidden:true,
      hidden2:false,
      hidden1:true
    });
    // that.onShareAppMessage();
  },

  shareFun2:function()
  {
    var that = this;
    console.log("此方法已执行9999999999999999!");
    that.setData({
      hidden: true,
      hidden1: false,
      hidden2: true
    });
  },
  closeTheModal:function()
  {
    var that = this;
    console.log("此方法已执行!");
    that.setData({
      hidden: false,
      hidden1:false,
    })
  },
  closeTheModal2:function()
  {
    var that = this;
    console.log("此方法已执行!");
    that.setData({
      hidden: false,
      hidden2: false,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
   // var shareId=res.id;
    return{
      title:"",
      path: "pages/firstpage/productdetail/productdetail"
    }

  }
})