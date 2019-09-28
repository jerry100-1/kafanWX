var theUrl=getApp(); 
// pages/firstpage/getProductAddress/getProductAddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    editNativeReceiver:"",
    editNativePhone: "",
    editNativeProvince: "",
    editNativeCity: "",
    editNativeArea: "",
    editNativeAddress: "",
    editNativeIsdefault: "",
    editNativeAddressId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
        console.log("接收的nativeReceiver是" +options.nativeReceiver);
        console.log("接收的nativePhone是" + options.nativePhone);
        console.log("接收的nativeProvince是" + options.nativeProvince);
        console.log("接收的nativeCity是" + options.nativeCity);
        console.log("接收的nativeArea是" + options.nativeArea);
        console.log("接收的nativeAddress是" + options.nativeAddress);
        console.log("接收的nativeIsdefault是" + options.nativeIsdefault);
        console.log("接收的nativeAddressId是" + options.nativeAddressId);
       that.setData({
         editNativeReceiver: options.nativeReceiver,
         editNativePhone: options.nativePhone,
         editNativeProvince: options.nativeProvince,
         editNativeCity: options.nativeCity,
         editNativeArea: options.nativeArea,
         editNativeAddress: options.nativeAddress,
         editNativeIsdefault: options.nativeIsdefault,
         editNativeAddressId: options.nativeAddressId,
       })
  },

  editNewReceiver:function(event)
  {
    var that=this;
    console.log("这是编辑之后的收货人的姓名" + event.detail.value);
     that.setData({
       editNativeReceiver: event.detail.value
     })
  },
  editNewReceiverPhone:function(ev)
  {
    var that = this;
    console.log("这是编辑之后的收货人的姓名" + ev.detail.value);
    that.setData({
      editNativePhone: ev.detail.value
    })
  },
  editNewReceiverAddress:function(eve)
  {
    var that = this;
    console.log("这是编辑之后的收货人的姓名" + eve.detail.value);
    that.setData({
      editNativeAddress: eve.detail.value
    })
  },


  switch1Change(e) {
    var that=this;
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    that.setData({
      editNativeIsdefault: e.detail.value==false?'0':"1"
    })
  },
  bindRegionChange(e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      region: e.detail.value
    })
    that.setData({
      editNativeProvince: that.data.region[0],
      editNativeCity: that.data.region[1],
      editNativeArea: that.data.region[2]
    })
  },
  submitToUpdateAddress:function()
  {
    var that=this;
    console.log("提交之前收货人姓名是" + that.data.editNativeReceiver);
    console.log("提交之前手机号码是" + that.data.editNativePhone);
    console.log("提交之前收货人省份是" + that.data.editNativeProvince);
    console.log("提交之前收货人城市是" + that.data.editNativeCity);
    console.log("提交之前收货人区域是" + that.data.editNativeArea);
    console.log("提交之前收货人详细地址是" + that.data.editNativeAddress);
    console.log("提交之前收货人时候是否是默认地址是" + that.data.editNativeIsdefault);
    console.log("提交之前旧的收货地址的id是" + that.data.editNativeAddressId);
            wx.request({
              url: theUrl.data.baseUrl + '/mini/address/'.concat(that.data.editNativeAddressId), // 仅为示例，并非真实的接口地址
              data: {
                  storeid: wx.getStorageSync("storeid"),
                  rd_session: wx.getStorageSync("rd_session"),
                  realname:that.data.editNativeReceiver,//新的收货人姓名
                  phone: that.data.editNativePhone,//新的收货人的电话
                  province:that.data.editNativeProvince,//新的收货人的省份
                  city: that.data.editNativeCity,//新的收货人的城市
                  area: that.data.editNativeArea,//新的收货人的区域
                  address: that.data.editNativeAddress,//新的收货人的详细地址
                  isdefault: that.data.editNativeIsdefault//是否设置为默认地址
              },
              method: "PUT",
              header: {
                'content-type': 'application/json' // 默认值
              },
              success(res) {

                console.log("这是---------------------------");
                console.log("这是保存更新指定的收货地址信息返回给我的信息" + res);
                console.log(res.data)
                if (res.data.status == 1) {
                  //that.getAllProductList();
                  wx.showToast({
                    title:"编辑成功",
                    duration:2000
                  })
                 wx.navigateTo({
                   url: '../myAllAddress/myAllAddress',
                 })
                }else
                {
                  wx.showToast({
                    title:res.data.message,
                    duration: 2000
                  })
                }
              }
            });



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