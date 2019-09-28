// pages/firstpage/getProductAddress/getProductAddress.js
var theUrl=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    myDetailAddress:"",
    myReciver:"",
    receiver:"",
    reciverPhone:"",
    reciverProvince:"",
    reciverCity:"",
    reciverTown:"",
    isDefaulOrNotStatus:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  switch1Change(e) {
     var that=this;
    console.log('switch1 发生 change 事件，携带值为', e.detail.value);

    that.setData({
      isDefaulOrNotStatus: e.detail.value==false?'0':'1'
    });
    console.log("当前的switch的值是" + that.data.isDefaulOrNotStatus);

  },
  bindRegionChange(e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      region: e.detail.value
    })
    that.setData({
      reciverProvince:that.data.region[0],
      reciverCity:that.data.region[1],
      reciverTown:that.data.region[2],
    })
    console.log("你好,你选择的省份是" + that.data.reciverProvince);
    console.log("你好,你选择的城市是" + that.data.reciverCity);
    console.log("你好,你选择的县城是" + that.data.reciverTown);
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
  getReceiverInput:function(event)
  { 
    var that=this;
    console.log("我所输入的收货人是" + event.detail.value);
    that.setData({
      myReciver: event.detail.value //获取收货人
    })
  },
  getReciverPhone:function(ev)
  {
    var that = this;
    console.log("我所输入的手机是" + ev.detail.value);
    that.setData({
      reciverPhone: ev.detail.value //获取手机号码
    })
  },
  getMyDetailAddress:function(e)
  {
    var that=this;
    console.log("我所输入的详细地址是"+e.detail.value);//获取详细地址
     that.setData({
       myDetailAddress:e.detail.value
     })
  },
  getIsDefaultOrNot:function()
  {
    
  },
  submitToAddressInterface:function()
  {
    var that=this;
      wx.request({
        url: theUrl.data.baseUrl + '/mini/address', // 仅为示例，并非真实的接口地址
        data: {
          storeid:wx.getStorageSync("storeid"),
          rd_session: wx.getStorageSync("rd_session"),
          realname: that.data.myReciver,//收货人姓名
          phone: that.data.reciverPhone,//收货人手机号
          province: that.data.reciverProvince,//省
          city: that.data.reciverCity,//市
          area: that.data.reciverTown,//县
          address: that.data.myDetailAddress, //详细地址
          isdefault:that.data.isDefaulOrNotStatus//是否为默认地址
        },
        method: "POST",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {

          console.log("这是---------------------------");
          console.log("这是添加收货地址返回信息" + res);
          console.log(res.data)
          if (res.data.status == 1) {
            //that.getAllProductList();
            wx.showToast({
              title:res.data.message,
              duration:1000
            });
            wx.navigateTo({
              url: '../myAllAddress/myAllAddress',
            })       
          }else{
            wx.showToast({
              title: res.data.message,
              duration: 1000
            });    
          }
        }
      });
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