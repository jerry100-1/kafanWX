// pages/firstpage/myAllAddress/myAllAddress.js
var theUrl = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: 0,
    checked: "",
    latitude: "",
    longitude: "",
    address: "",
    name: "",
    theType:"success", 
    number: "",
    getmyreceiverid: "",
    radioChecked: false,
    allReceiveAddressList: []
  },
  toggleChecked: function (e) {
    var that=this;
    // wx.clearStorage("myreceiver");
    // wx.clearStorage("myphone");
    // wx.clearStorage("myprovince");
    // wx.clearStorage("mycity");
    // wx.clearStorage("myarea");
    // wx.clearStorage("myaddress");
    // wx.clearStorage("myreceiverid");

    // wx.setStorageSync("myreceiver", myreceiver);
    // wx.setStorageSync("myphone", myphone);
    // wx.setStorageSync("myprovince", myprovince);
    // wx.setStorageSync("mycity", mycity);
    // wx.setStorageSync("myarea", myarea);
    // wx.setStorageSync("myaddress", myaddress);
    // wx.setStorageSync("myreceiverid", myreceiverid);
    console.log("当前的i是" + e.currentTarget.dataset.i);
    var index = e.currentTarget.dataset.i;
    console.log("当前的收货人是" + e.currentTarget.dataset.receiver);
    var radioChecked = that.data.radioChecked
       // e.currentTarget.dataset[index].checked=true
    that.setData({
      number: e.currentTarget.dataset.i
    });
  var item= this.data.allReceiveAddressList[e.currentTarget.dataset.index];
  console.log("当前获取到的选中的icon是"+icon);
      item.type="success";

    console.log("当前的number是" + this.data.number);
    wx.navigateTo({
      url: '../deliveryWay/deliveryWay?receiver=' + e.currentTarget.dataset.receiver + "&phone=" + e.currentTarget.dataset.phone + '&province=' + e.currentTarget.dataset.province + '&city=' + e.currentTarget.dataset.city + "&area=" + e.currentTarget.dataset.area + "&address=" + e.currentTarget.dataset.address + "&isdefault=" + e.currentTarget.dataset.isdefault + "&receiverid=" + e.currentTarget.dataset.receiverid + "&theOrderId=" + wx.getStorageSync("theOrderId"),
    })



  },
  goToEditMyAddress: function (e) {
    var nativeReceiver = e.currentTarget.dataset.receiver;
    var nativePhone = e.currentTarget.dataset.phone;
    var nativeProvince = e.currentTarget.dataset.province;
    var nativeCity = e.currentTarget.dataset.city;
    var nativeArea = e.currentTarget.dataset.area;
    var nativeAddress = e.currentTarget.dataset.address;
    var nativeIsdefault = e.currentTarget.dataset.isdefault;
    var nativeAddressId = e.currentTarget.dataset.addressid;

    console.log("原来的nativeReceiver是" + nativeReceiver);
    console.log("原来的nativePhone是" + nativePhone);
    console.log("原来的nativeProvince是" + nativeProvince);
    console.log("原来的nativeCity是" + nativeCity);
    console.log("原来的nativeArea是" + nativeArea);
    console.log("原来的nativeAddress是" + nativeAddress);
    console.log("原来的nativeIsdefault是" + nativeIsdefault);
    console.log("原来的nativeAddressId是" + nativeAddressId);

    wx.navigateTo({
      url: '../editProductAddress/editProductAddress?nativeReceiver=' + nativeReceiver + '&nativePhone=' + nativePhone + '&nativeProvince=' + nativeProvince + '&nativeCity=' + nativeCity + '&nativeArea=' + nativeArea + '&nativeAddress=' + nativeAddress + '&nativeIsdefault=' + nativeIsdefault + '&nativeAddressId=' + nativeAddressId,
    })
  },
  goToAddMyAddress: function () {
    wx.navigateTo({
      url: '../addMyAddress/addMyAddress',
    })
  },
  toggleCheckType:function(e)
  {

    let state = e.currentTarget.dataset.state;
    console.log("你好,我得到的state是" + state);
    let that = this;
    that.setData({
      state: state
    });
    console.log("获取的receiver是" + e.currentTarget.dataset.receiver);
    console.log("phone" + e.currentTarget.dataset.phone);
    console.log("province" + e.currentTarget.dataset.province);
    console.log("获取的city是" + e.currentTarget.dataset.city);
    console.log("获取的area是" + e.currentTarget.dataset.area);
    console.log("获取的address是" + e.currentTarget.dataset.address);
    console.log("获取的isdefault是" + e.currentTarget.dataset.isdefault);
    console.log("获取的receiverid是" + e.currentTarget.dataset.receiverid);
    // console.log("获取的receiver是" + e.currentTarget.dataset.receiver);

    // console.log("获取的索引是" + e.currentTarget.dataset.index);
    // console.log("获取的选中的checkbox的值是" + this.data.allReceiveAddressList[e.currentTarget.dataset.index]);
    
   // console.log("获取的当前的type是" + e.currentTarget.dataset.type);
   //  var theItem = this.data.allReceiveAddressList[e.currentTarget.dataset.index]
    // theItem.checked = !theItem.checked;
       //theItem.type="circle";
      // this.setData({
      //   ['theItem.checked']: true
      // });   
      wx.navigateTo({
        url: '../deliveryWay/deliveryWay?receiver=' + e.currentTarget.dataset.receiver + "&phone=" + e.currentTarget.dataset.phone + '&province=' + e.currentTarget.dataset.province + '&city=' + e.currentTarget.dataset.city + "&area=" + e.currentTarget.dataset.area + "&address=" + e.currentTarget.dataset.address + "&isdefault=" + e.currentTarget.dataset.isdefault + "&receiverid=" + e.currentTarget.dataset.receiverid + "&theOrderId=" + wx.getStorageSync("theOrderId"),
      });

        // this.setData({
        //   allReceiveAddressList: this.data.allReceiveAddressList
        // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log("这是在所有地址列表页面从storage里面获取的theOrderId" + wx.getStorageSync("theOrderId"));

    var that = this;
    // var getmyreceiverid = "";
    // that.setData({
    //   getmyreceiverid: options.myreceiverid
    // })
    console.log("这是我从物流 配送页面获取的myreceiverid" + options.myreceiverid);
    this.getMyAllAddressList();

  },
  //获取所有的收货地址 
  getMyAllAddressList: function () {
    var that = this;
    wx.request({
      url: theUrl.data.baseUrl + '/mini/address', // 
      data: {
        storeid: wx.getStorageSync("storeid"),
        rd_session: wx.getStorageSync("rd_session"),
      },
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {

        console.log("这是---------------------------");
        console.log("这是收货地址列表接口返回给我的信息" + res);

        console.log(res.data)
        if (res.data.status == 1) {
          //that.getAllProductList();
          that.setData({
            allReceiveAddressList: res.data.result.list
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
  radiochange: function () {

    var flag = 0;
    if (flag == 0) {
      this.setData({
        checked: true
      })
      flag = 1;
    } else if (flag == 1) {
      this.setData({
        checked: false
      })
      flag = 0;
    }
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
  openMapAdd: function () {
    var that = this;
    wx.getLocation({
      type: 'wgs84', // 返回可以用于wx.openLocation的经纬度
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        const address = res.address
        const name = res.name

        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })

        wx.openLocation({
          latitude,
          longitude,
          address,
          name,
          scale: 5
        })
      }
    })

    wx.chooseLocation({
      success: function (res) {
        console.log("选择地址api的返回结果" + res);
        that.setData({
          address: res.address
        })
      },
      fail: function () {

      },
      complete: function () {

      }

    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})