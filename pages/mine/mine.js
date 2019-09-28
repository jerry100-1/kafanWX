// pages/minepersonhomepage/minepersonhomepage.js
// pages/firstpage/shoppingcart/shoppingcart.js
var theUrl=getApp();

const app = getApp();
var template = require('../template/template.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      nickName:"",
      userAvatar:"",
      mycredit2:"",//账户余额
      mycommission:"",//累计收益
      mysubmember:"",//我的会员
      showText:'返券',
      mycouponprice:"",//未使用优惠券
      showText2:"",
      waitpayorderNum:"",
      goNeedToPayOrder:1,
      goNeedToShipped:2,
      goMyConfirmOrder:3,
      hotSellerGoodsList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    template.tabbar("tabBar", 3, this)//0表示第一个tabbar
    var that=this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userLocation']) {
          wx.getUserInfo({
            success: function (res) {
              console.log("");
              var userInfo = res.userInfo
              var userAvatar = res.userInfo.avatarUrl;
              var nickName = userInfo.nickName
              var avatarUrl = userInfo.avatarUrl
              var gender = userInfo.gender //性别 0：未知、1：男、2：女
              var province = userInfo.province
              var city = userInfo.city;
              var country = userInfo.country
              console.log("获取的用户图像是----" + userAvatar);
              console.log("获取的用户匿名----" + nickName);
              console.log("获取的用户省份是-----" + province);
              console.log("获取的用户城市是-----" + city);
              that.setData({
                nickName: nickName,
                userAvatar: avatarUrl
              })
            }
          })


        }
      }
    });
    this.getHotSellerGoods();
  },
  goToProductDetail:function(e)
  {
    console.log("当前的商品的id---------是:"+e.currentTarget.dataset.productid);
    wx.navigateTo({
      url: '../productdetail/productdetail?productId=' + e.currentTarget.dataset.productid,
    })
   // productId
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },
  goMyAllOrder:function()
  {
   wx.navigateTo({
     url: '../firstpage/myallorder/myallorder?goNeedToPayOrder=' + this.data.goNeedToPayOrder,
   })
  },
  goMyShipOrder:function()
  {
    
    wx.navigateTo({
      url: '../firstpage/myallorder/myallorder?goNeedToShipped=' + this.data.goNeedToShipped,
    })
  },
  goMyConfirmOrder:function()
  {
      wx.navigateTo({
        url: '../firstpage/myallorder/myallorder?goMyConfirmOrder=' + this.data.goMyConfirmOrder,
      })
  },
  getHotSellerGoods:function()
  {
    var that=this;
   wx.request({
     url: theUrl.data.baseUrl +'/mini/center',
     method: "GET",
     data: {
       storeid: wx.getStorageSync("storeid"),
       rd_session: wx.getStorageSync("rd_session"),
     },
     header: {
       'content-type': 'application/json' // 默认值
     },
     success:function(res)
     {
       console.log("获取的热卖的所有数据是" + res.data);
       that.setData({
          hotSellerGoodsList: res.data.result.hotgoods
        });
        that.setData({
          waitpayorderNum: res.data.result.waitpayorder
        });
        that.setData({
          mycredit2: (res.data.result.credit2) //账户余额
        });
        that.setData({
          mycommission: res.data.result.commission //累计收益
        });
        that.setData({
          mysubmember: res.data.result.submember //我的会员 
        });
        that.setData({
          mycouponprice: res.data.result.couponprice //优惠券的价值
        })

     },
     fail:function()
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})